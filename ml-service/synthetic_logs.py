from __future__ import annotations

import json
import random
from datetime import datetime, timedelta, timezone
from pathlib import Path

TOTAL_LOGS = 10_000
OUTPUT_FILE = Path(__file__).resolve().parent / "synthetic_logs.json"

SERVICES = [
    "voter-auth-api",
    "aadhaar-verify-service",
    "municipal-portal",
    "rti-portal",
    "election-commission-api",
]

NORMAL_ENDPOINTS = {
    "voter-auth-api": ["/voter/login", "/voter/profile", "/voter/otp/verify"],
    "aadhaar-verify-service": ["/aadhaar/verify", "/aadhaar/token", "/aadhaar/status"],
    "municipal-portal": ["/municipal/dashboard", "/municipal/property/search", "/municipal/tax/pay"],
    "rti-portal": ["/rti/login", "/rti/filing", "/rti/status"],
    "election-commission-api": ["/eci/results/state", "/eci/booth/info", "/eci/candidate/list"],
}

USER_AGENTS = [
    "GovPortalClient/1.0",
    "CitizenServiceApp/2.3",
    "Mozilla/5.0",
    "GovOpsMonitor/4.2",
]


def random_ip(prefix: str = "10.10") -> str:
    return f"{prefix}.{random.randint(0, 255)}.{random.randint(1, 254)}"


def build_normal_log(ts: datetime) -> dict:
    service = random.choice(SERVICES)
    endpoint = random.choice(NORMAL_ENDPOINTS[service])
    status = 200 if random.random() > 0.07 else random.choice([400, 401, 403, 404])
    method = "POST" if "login" in endpoint or "verify" in endpoint else "GET"

    return {
        "timestamp": ts.isoformat(),
        "source_ip": random_ip(),
        "endpoint": endpoint,
        "status_code": status,
        "method": method,
        "user_agent": random.choice(USER_AGENTS),
        "response_time": round(random.uniform(45, 280), 2),
        "bytes_sent": random.randint(512, 120_000),
        "source": service,
        "service": service,
    }


def build_bruteforce_logs(start: datetime) -> list[dict]:
    logs = []
    offender_ip = "185.199.110.21"
    for i in range(150):
        logs.append(
            {
                "timestamp": (start + timedelta(seconds=i * 2)).isoformat(),
                "source_ip": offender_ip,
                "endpoint": "/voter/login",
                "status_code": 401,
                "method": "POST",
                "user_agent": "BruteBot/7.0",
                "response_time": round(random.uniform(80, 220), 2),
                "bytes_sent": random.randint(600, 1600),
                "source": "voter-auth-api",
                "service": "voter-auth-api",
            }
        )
    return logs


def build_ddos_logs(start: datetime) -> list[dict]:
    logs = []
    for i in range(700):
        logs.append(
            {
                "timestamp": (start + timedelta(milliseconds=i * 60)).isoformat(),
                "source_ip": f"203.0.113.{(i % 180) + 1}",
                "endpoint": "/aadhaar/verify",
                "status_code": random.choice([429, 503, 503, 429]),
                "method": "POST",
                "user_agent": "FloodRunner/3.2",
                "response_time": round(random.uniform(550, 2200), 2),
                "bytes_sent": random.randint(500, 3000),
                "source": "aadhaar-verify-service",
                "service": "aadhaar-verify-service",
            }
        )
    return logs


def build_sqli_logs(start: datetime) -> list[dict]:
    payloads = [
        "' OR 1=1 --",
        "' UNION SELECT password FROM users --",
        "' OR 'x'='x",
    ]
    logs = []
    for i in range(220):
        logs.append(
            {
                "timestamp": (start + timedelta(seconds=i)).isoformat(),
                "source_ip": "198.51.100.34",
                "endpoint": f"/eci/candidate/search?name={random.choice(payloads)}",
                "status_code": random.choice([403, 500]),
                "method": "GET",
                "user_agent": "SQLProbe/1.1",
                "response_time": round(random.uniform(320, 820), 2),
                "bytes_sent": random.randint(900, 7000),
                "source": "election-commission-api",
                "service": "election-commission-api",
            }
        )
    return logs


def build_exfiltration_logs(start: datetime) -> list[dict]:
    logs = []
    for i in range(320):
        logs.append(
            {
                "timestamp": (start + timedelta(seconds=i * 4)).isoformat(),
                "source_ip": "172.16.77.9",
                "endpoint": f"/municipal/reports/download?file={8300 + i}",
                "status_code": 200,
                "method": "GET",
                "user_agent": "DataSyncClient/9.4",
                "response_time": round(random.uniform(200, 450), 2),
                "bytes_sent": random.randint(3_500_000, 11_000_000),
                "source": "municipal-portal",
                "service": "municipal-portal",
            }
        )
    return logs


def generate_logs() -> list[dict]:
    now = datetime.now(timezone.utc)

    attack_logs = []
    attack_logs.extend(build_bruteforce_logs(now - timedelta(hours=6)))
    attack_logs.extend(build_ddos_logs(now - timedelta(hours=5)))
    attack_logs.extend(build_sqli_logs(now - timedelta(hours=4)))
    attack_logs.extend(build_exfiltration_logs(now - timedelta(hours=3)))

    normal_count = TOTAL_LOGS - len(attack_logs)
    normal_logs = [build_normal_log(now - timedelta(seconds=random.randint(0, 86_400))) for _ in range(normal_count)]

    all_logs = normal_logs + attack_logs
    random.shuffle(all_logs)
    return all_logs


def main() -> None:
    logs = generate_logs()
    OUTPUT_FILE.write_text(json.dumps(logs, indent=2))

    print(f"Generated {len(logs)} log entries")
    print(f"Output file: {OUTPUT_FILE}")
    print("Attack patterns included: brute force, DDoS, SQL injection, data exfiltration")


if __name__ == "__main__":
    main()
