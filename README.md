# KAVACH

KAVACH is an autonomous cyber defense system for India's government civic infrastructure. It combines ML anomaly screening, LLM-driven incident analysis, prioritization, automated remediation, and multi-channel alerting with a SOC dashboard and multilingual CISO co-pilot.

## Stack

- Backend: Node.js, Express, TypeScript, Prisma, PostgreSQL
- Frontend: React 18, Vite, Tailwind, TanStack Query, Recharts
- ML Service: FastAPI, scikit-learn Isolation Forest
- AI + Alerts: Anthropic Claude, Telegram, SMTP Email

## Quick Start

1. Copy backend env template:
   ```bash
   cp backend/.env.example backend/.env
   ```
2. Set required keys in `backend/.env` (`ANTHROPIC_API_KEY`, alert credentials, JWT secret).
3. Start all services:
   ```bash
   docker compose up --build
   ```
4. Access:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - ML Service: http://localhost:8000

## Local Development (without Docker)

1. Start PostgreSQL locally.
2. Backend:
   ```bash
   cd backend
   npm install
   npx prisma generate
   npm run db:push
   npm run db:seed
   npm run dev
   ```
3. ML service:
   ```bash
   cd ml-service
   pip install -r requirements.txt
   uvicorn main:app --reload --port 8000
   ```
4. Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Architecture

```text
                +-----------------------------+
                |   Government Log Sources    |
                | voter/aadhaar/municipal/rti|
                +-------------+---------------+
                              |
                              v
                 +-----------------------------+
                 |  ML Anomaly Detector (API)  |
                 |   FastAPI + IsolationForest |
                 +-------------+---------------+
                               |
                               v
  +----------------+   +---------------------+   +----------------------+
  | Commander Agent|-->| Immediator Agent    |-->| Dispatcher           |
  | Claude analysis|   | dedupe + prioritize |   | domain remediation   |
  +----------------+   +---------------------+   +----------+-----------+
                                                                |
                         +-------------------------------+------+----------------+
                         |                               |                       |
                         v                               v                       v
                 +---------------+                +------------+         +--------------+
                 | Auth Agent    |                |Net Agent   |         |Infra Agent   |
                 +-------+-------+                +------+-----+         +------+-------+
                         |                               |                       |
                         +---------------+---------------+-----------------------+
                                         |
                                         v
                                +----------------+
                                | Alert Pipeline |
                                | Telegram/Email |
                                +-------+--------+
                                        |
                                        v
                             +----------------------+
                             | React SOC Dashboard  |
                             | + CISO Co-Pilot Chat |
                             +----------------------+
```

## Demo Flow (March 28)

1. Open `Simulator` page.
2. Launch one of four scenarios:
   - Voter Portal Brute Force
   - Aadhaar API DDoS
   - Municipal Data Exfiltration
   - Election SQL Injection
3. Observe pipeline stages:
   - Logs Ingested -> ML Screening -> AI Analysis -> Remediation -> Alerts
4. Open `Incidents` and `Incident Detail` to show evidence, remediation timeline, and alert records.
5. Open `Co-Pilot` and ask bilingual questions for executive briefing.

## Team

- Product Owner: _TBD_
- Security Lead: _TBD_
- Platform Lead: _TBD_
- Demo Operator: _TBD_
