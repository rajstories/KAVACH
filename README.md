<div align="center">

<img src="https://capsule-render.vercel.app/api?type=venom&height=300&color=gradient&customColorList=0,2,4,12,30&text=KAVACH&fontSize=120&fontColor=ffffff&animation=fadeIn&fontAlignY=55&desc=कवच%20|%20Autonomous%20Cyber%20Defense%20for%20Bharat&descAlignY=75&descSize=18&stroke=ffffff&strokeWidth=1" width="100%"/>

<br/>

<p>
  <img src="https://img.shields.io/badge/STATUS-ACTIVE%20DEFENSE-00ff41?style=for-the-badge&logo=shield&logoColor=black&labelColor=0d0d0d"/>
  <img src="https://img.shields.io/badge/CLEARANCE-GOVERNMENT%20GRADE-ff0000?style=for-the-badge&logo=gov.uk&logoColor=white&labelColor=0d0d0d"/>
  <img src="https://img.shields.io/badge/DEPLOYED-MEGHRAJ%20READY-0066ff?style=for-the-badge&logo=cloud&logoColor=white&labelColor=0d0d0d"/>
</p>

<p>
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Python-3.11-3776AB?style=flat-square&logo=python&logoColor=white"/>
  <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white"/>
  <img src="https://img.shields.io/badge/Claude%20API-Anthropic-orange?style=flat-square&logo=anthropic&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white"/>
</p>

<p>
  <img src="https://img.shields.io/badge/India%20Innovates-2026%20-FF9933?style=for-the-badge&labelColor=138808"/>
  <img src="https://img.shields.io/badge/Domain-Cyber%20Security-cc0000?style=for-the-badge&labelColor=000080"/>
  <img src="https://img.shields.io/badge/Venue-Bharat%20Mandapam-FF9933?style=for-the-badge&labelColor=138808"/>
</p>

<br/>

> ### *"In 2023, AIIMS Delhi was shut down for 15 days by ransomware.*
> ### *The attack was detectable 4 hours before escalation.*
> ### *KAVACH would have caught it in 8 minutes."*

<br/>

[🔴 Live Demo](https://kavach-2.vercel.app/) · [📹 Watch Demo](#) · [📊 Dashboard](https://kavach-2.vercel.app/dashboard) 

</div>

---

<br/>
<div align="center">

<img width="1278" height="709" alt="image" src="https://github.com/user-attachments/assets/730b6837-529b-4107-a767-49051b053452" />

---
</div>

## 🇮🇳 The Problem India Faces Right Now

<table>
<tr>
<td width="50%">

### 🏥 AIIMS Delhi — 2023
Ransomware attack shut down **patient care for 15 days.**
5 servers encrypted. 1.3 crore patient records compromised.
**Detectable 4 hours before escalation.**
Nobody was watching.

</td>
<td width="50%">

### 🗳️ Election Systems — Every Cycle  
Voter authentication portals face **credential stuffing attacks** during registration periods. Aadhaar endpoints see **enumeration attempts** before every major election.
Manual SOC teams can't keep up.

</td>
</tr>
<tr>
<td>

### 🏛️ Municipal Portals — Daily
RTI portals, grievance systems, citizen dashboards — running on **decades-old security practices** with zero automated threat response.
A ₹2 crore annual SOC team still takes **8 hours to respond.**

</td>
<td>

### 💸 The Real Cost
```
Traditional SOC:  ₹2.12 Cr/dept/year
KAVACH:          ₹15.12 L/dept/year
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Savings:         ₹1.97 Cr/dept/year
Across 50 depts: ₹984 Cr saved/year
Response time:   8hrs → 8 minutes
```

</td>
</tr>
</table>

---

## ⚡ What KAVACH Does

```
                    ┌─────────────────────────────────────────────────┐
                    │              KAVACH PIPELINE                     │
                    │                                                   │
  Government    ──► │  📊 Logs    🤖 ML Filter   🧠 Commander   ⚡ Fix │ ──► 🛡️ Protected
  Portal Logs       │  Ingested → Anomaly Scan → AI Analysis → Action  │
                    │                                                   │
                    │  ⏱️  T+0s     T+30s          T+60s       T+2min  │
                    └─────────────────────────────────────────────────┘
                                          │
                    ┌─────────────────────▼──────────────────────────┐
                    │           AUTOMATED OUTPUTS                      │
                    │  📱 Telegram Alert  📧 CERT-In Report           │
                    │  📊 Dashboard Update  💬 Hindi CISO Briefing    │
                    └────────────────────────────────────────────────┘
```

KAVACH transforms India's government cybersecurity from **reactive crisis management** to **autonomous proactive defense.** It's not just faster — it never sleeps, never misses a pattern, and speaks to your CISO in Hindi.

---

## 🏗️ Architecture

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                          KAVACH SYSTEM ARCHITECTURE                         ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║   GOVERNMENT PORTALS           KAVACH INTELLIGENCE LAYER                    ║
║   ┌─────────────────┐          ┌────────────────────────────────────────┐   ║
║   │ voter-auth-api  │──logs──► │                                        │   ║
║   │ aadhaar-verify  │          │  Layer 1: Rule Filter (FREE)           │   ║
║   │ municipal-dash  │          │  ↓ removes 70% safe logs               │   ║
║   │ rti-portal      │          │                                        │   ║
║   │ election-api    │          │  Layer 2: ML Anomaly Detector (CHEAP)  │   ║
║   └─────────────────┘          │  Isolation Forest | FastAPI/Python     │   ║
║                                │  ↓ flags suspicious 20%               │   ║
║                                │                                        │   ║
║                                │  Layer 3: Commander Agent (SMART)     │   ║
║                                │  Claude API | Civic context prompt     │   ║
║                                │  ↓ structured findings JSON           │   ║
║                                │                                        │   ║
║                                │  Immediator Agent                     │   ║
║                                │  Civic impact scoring | Prioritize    │   ║
║                                │  election=2.0x | aadhaar=1.8x        │   ║
║                                │  ↓ ranked incident queue              │   ║
║                                │                                        │   ║
║                                │  Dispatcher                           │   ║
║                                │  ┌──────────┬──────────┬──────────┐  │   ║
║                                │  │  Auth &  │ Network  │  Infra   │  │   ║
║                                │  │ Identity │  & HTTP  │  Agent   │  │   ║
║                                │  │  Agent   │  Agent   │          │  │   ║
║                                │  └──────────┴──────────┴──────────┘  │   ║
║                                └────────────────────────────────────────┘   ║
║                                              │                               ║
║   OUTPUT LAYER                               ▼                               ║
║   ┌──────────────────────────────────────────────────────────────────────┐  ║
║   │  📊 React Dashboard  │  📱 Telegram  │  📧 Email  │  🎫 CERT-In    │  ║
║   │  Real-time incidents │  Hindi alerts │  Reports   │  Compliance    │  ║
║   └──────────────────────────────────────────────────────────────────────┘  ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

## 🧠 The Agent System

<table>
<tr>
<td align="center" width="25%">

### 🎯 Commander
**The Brain**

Analyzes security logs using Claude AI with deep civic infrastructure context. Returns structured threat findings in under 60 seconds.

`claude-opus-4-6`
`civic-context-prompt`
`retry + fallback`

</td>
<td align="center" width="25%">

### ⚖️ Immediator  
**The Prioritizer**

Scores every incident using civic impact multipliers. Election portal attacks = 2x. Aadhaar = 1.8x. Deduplicates and ranks.

`impact-scoring`
`deduplication`
`priority-queue`

</td>
<td align="center" width="25%">

### 🔀 Dispatcher
**The Router**

Routes incidents to the right specialist agent in parallel. Auth threats, network attacks, and infrastructure issues handled simultaneously.

`parallel-execution`
`domain-routing`
`result-aggregation`

</td>
<td align="center" width="25%">

### 🗣️ CISO Co-Pilot
**The Communicator**

Multilingual AI assistant for government security officers. Explains incidents in plain Hindi or English. Auto-generates CERT-In reports.

`hindi + english`
`plain-language`
`cert-in-format`

</td>
</tr>
</table>

---

## 🔧 Domain Remediation Agents

| Agent | Handles | Actions |
|-------|---------|---------|
| 🔐 **Auth & Identity** | `brute_force` `credential_stuffing` `unauthorized_access` | Block IP · Lock Account · Revoke Token · Enable Lockout |
| 🌐 **Network & HTTP** | `ddos` `api_abuse` `sql_injection` `port_scan` | Rate Limit · WAF Rules · IP Block · Traffic Scrubbing |
| 🖥️ **Infrastructure** | `data_exfiltration` `privilege_escalation` `phishing` | Isolate Service · Force MFA · Trigger Backup · Escalate |

---

## 📊 Impact Numbers

<div align="center">

| Metric | Traditional SOC | KAVACH |
|--------|----------------|--------|
| ⚡ **Response Time** | 8 hours | **8 minutes** |
| 💰 **Annual Cost/Dept** | ₹2.12 Crore | **₹15.12 Lakh** |
| 👥 **Team Required** | 6 analysts | **1 engineer** |
| 🌙 **24/7 Coverage** | Shift allowance extra | **Autonomous** |
| 🔍 **Logs Analyzed/Day** | Manual sampling | **100% automated** |
| 🇮🇳 **Data Sovereignty** | Depends on vendor | **NIC MeghRaj only** |
| 📋 **CERT-In Compliance** | Manual 6hr report | **Auto-generated** |
| 🗣️ **Language** | English only | **Hindi + English** |

</div>

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js 18+    npm 9+    Python 3.11+    Docker    PostgreSQL
```

### One Command Setup

```bash
# Clone repository
git clone https://github.com/rajstories/KAVACH.git
cd KAVACH

# Copy environment files
cp backend/.env.example backend/.env
# Fill in your API keys (see Environment Setup below)

# Launch everything with Docker
docker-compose up --build

# OR run services individually:
cd backend && npm install && npm run dev        # Port 3001
cd frontend && npm install && npm run dev       # Port 5173
cd ml-service && pip install -r requirements.txt && uvicorn main:app --reload --port 8000
```

### Environment Setup

```env
# backend/.env

# Database (get free PostgreSQL at neon.tech)
DATABASE_URL="postgresql://user:pass@host/kavach?sslmode=require"

# AI Brain (get at console.anthropic.com)
ANTHROPIC_API_KEY="sk-ant-..."

# Alerts (create bot via @BotFather on Telegram)
TELEGRAM_BOT_TOKEN="your_bot_token"
TELEGRAM_CHAT_ID="-1001234567890"

# Email (Gmail SMTP or any SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your@email.com"
SMTP_PASS="your_app_password"

# ML Service
ML_SERVICE_URL="http://localhost:8000"
JWT_SECRET="change_this_in_production"
PORT=3001
```

### Seed The Database

```bash
cd backend
npx prisma generate
npx prisma db push
npx prisma db seed
# Loads 15 realistic government portal incidents
```

### Verify Everything Works

```bash
# Backend API
curl http://localhost:3001/api/incidents
# Should return 15 seeded incidents

# ML Service  
curl http://localhost:8000/health
# Should return: {"status": "ok"}

# Frontend
open http://localhost:5173
# Should show KAVACH dashboard with incidents
```

---

## 🎬 Running The Live Demo

KAVACH includes a **Demo Simulator** — the most important feature for live presentations.

```bash
# Trigger a simulated brute force attack on voter portal
curl -X POST http://localhost:3001/api/logs/simulate \
  -H "Content-Type: application/json" \
  -d '{"scenario": "brute_force"}'

# Watch in real time:
# 1. ML Anomaly Detector flags suspicious IPs
# 2. Commander Agent identifies brute_force attack
# 3. Auth Agent automatically blocks IP + locks account
# 4. Telegram alert fires to CISO group
# 5. Dashboard updates with new incident
# Total time: ~2 minutes
```

### Available Demo Scenarios

| Scenario | Description | Portal Targeted |
|----------|-------------|-----------------|
| `brute_force` | 50+ failed logins from single IP | voter-auth-api |
| `ddos` | Traffic spike from 200+ IPs | municipal-portal |
| `sql_injection` | SQLi attempts in URL params | rti-portal |
| `data_exfiltration` | Large unusual data downloads | election-api |
| `credential_stuffing` | Distributed account takeover | aadhaar-verify |

---

## 🌐 Deployment — NIC MeghRaj (Government Standard)

KAVACH is designed for **India's government cloud infrastructure** first.

```
Deployment Tiers:

TIER 1: Department Level
├── 1 MeghRaj VM (4 core, 8GB)
├── Monitors: 10-50 government portals
├── Cost: ~₹4,200/month
└── Best for: Single ministry deployment

TIER 2: State Level  
├── 3 MeghRaj VMs + Load Balancer
├── Kubernetes auto-scaling
├── Monitors: 500+ portals statewide
├── Cost: ~₹18,000/month
└── Best for: Complete state government

TIER 3: National Level
├── NIC Kubernetes Cluster
├── Distributed ML pipeline
├── Monitors: All central govt portals
├── Cost: ~₹1.2L/month
└── Best for: Central government deployment
```

### Data Sovereignty Options

```
Option A — Full MeghRaj     Option B — Hybrid          Option C — Air-Gapped
────────────────────────    ─────────────────────────   ──────────────────────
Everything on NIC cloud     Logs: MeghRaj only          Full on-premise
Local LLM via Ollama        LLM: Anonymized JSON only   Ollama local LLM
Zero data outside India     No PII sent externally      No internet needed
Best: Classified infra      Best: Standard portals      Best: Defense/Intel
```

---

## 🛡️ CERT-In Compliance

KAVACH addresses India's mandatory cybersecurity reporting requirements:

- ✅ **6-hour incident reporting** — Auto-generated CERT-In format reports
- ✅ **Audit trail** — Complete incident timeline stored in PostgreSQL  
- ✅ **Log retention** — 30-day retention with structured metadata
- ✅ **IT Act 2000 Section 70** — Designed for Critical Information Infrastructure
- ✅ **Data localization** — All data on Indian government servers (MeghRaj)

---

## 🗂️ Project Structure

```
KAVACH/
│
├── 🤖 backend/                     # Node.js + TypeScript
│   ├── src/
│   │   ├── agents/                 # The AI brain
│   │   │   ├── commanderAgent.ts   # Claude API + civic prompt
│   │   │   ├── immediatorAgent.ts  # Priority scoring
│   │   │   ├── dispatcher.ts       # Domain routing
│   │   │   └── remediationAgents/  # Auth / Network / Infra
│   │   ├── routes/                 # REST API endpoints
│   │   │   ├── incidents.ts        # Incident CRUD + stats
│   │   │   ├── logs.ts             # Log ingestion + simulator
│   │   │   └── copilot.ts          # Hindi/English AI chat
│   │   ├── alerts/                 # Multi-channel notifications
│   │   │   ├── telegramAlert.ts    # Telegram with Hindi labels
│   │   │   └── emailAlert.ts       # CERT-In format email
│   │   ├── ml/
│   │   │   └── anomalyDetector.ts  # Bridge to Python ML
│   │   └── config/
│   │       └── anthropic.ts        # Claude client setup
│   └── prisma/
│       ├── schema.prisma           # Full database schema
│       └── seed.ts                 # 15 realistic incidents
│
├── 🎨 frontend/                    # React + TypeScript + Vite
│   └── src/
│       ├── pages/
│       │   ├── Dashboard.tsx       # Main SOC dashboard
│       │   ├── IncidentsPage.tsx   # Filterable incident table
│       │   ├── IncidentDetail.tsx  # Full incident view
│       │   ├── SimulatorPage.tsx   # 🎯 DEMO PAGE
│       │   ├── CopilotPage.tsx     # Hindi/English AI chat
│       │   └── PhishingModule.tsx  # Dept awareness scores
│       └── components/
│           ├── ThreatHeatmap.tsx   # India state-wise heatmap
│           ├── IncidentFeed.tsx    # Real-time incident list
│           └── SeverityBadge.tsx   # Color-coded severity
│
├── 🧠 ml-service/                  # Python + FastAPI
│   ├── main.py                     # Isolation Forest API
│   └── synthetic_logs.py           # Demo data generator
│
└── 🐳 docker-compose.yml           # One-command deployment
```

---

## 🧪 Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **🤖 AI Engine** | Anthropic Claude API | Commander Agent threat analysis |
| **🧠 ML Detection** | Python + scikit-learn | Isolation Forest anomaly detection |
| **⚙️ Backend** | Node.js + Express + TypeScript | Agent orchestration + REST API |
| **🗄️ Database** | PostgreSQL + Prisma ORM | Incident storage + audit trail |
| **🎨 Frontend** | React 18 + Vite + Tailwind | SOC dashboard + simulator |
| **📱 Alerts** | Telegram Bot API | Real-time CISO notifications |
| **📧 Reports** | Nodemailer | CERT-In format email reports |
| **🐳 DevOps** | Docker + Docker Compose | One-command deployment |
| **☁️ Cloud** | NIC MeghRaj / Railway | Government-grade hosting |
| **📊 Logging** | Winston | Structured audit logging |

</div>

---

## 🏆 Hackathon

<div align="center">

**Built for India Innovates 2026**
**Domain: Cyber Security**
**Venue: Bharat Mandapam, New Delhi**
**Date: 28 March 2026**

Previously: SIH 2025 Runner-Up (SAKSHAM — Disaster Management)

</div>

---

## 🗺️ Roadmap

```
Phase 1 — Hackathon (March 2026)    Phase 2 — Pilot (Q2 2026)
─────────────────────────────────   ────────────────────────────
✅ Autonomous agent pipeline         🔄 NIC MeghRaj deployment
✅ 3 domain remediation agents       🔄 Integration with CERT-In portal
✅ Hindi + English CISO Co-Pilot     🔄 Real government log ingestion
✅ Multi-channel alerts              🔄 SIEM integration (Splunk/QRadar)
✅ Demo attack simulator             🔄 IoT sensor network hooks
✅ Phishing awareness module         🔄 Regional language support (8 more)
✅ CERT-In compliance format         🔄 Mobile app for field officers

Phase 3 — National Scale (Q4 2026)
────────────────────────────────────
🎯 All 50 central government departments
🎯 Ministry of Electronics & IT integration  
🎯 National Cyber Coordination Centre (NCCC) dashboard
🎯 AI threat intelligence sharing between departments
🎯 ₹984 Crore annual savings at scale
```

---

## 📄 License

```
MIT License — Open source for India's digital security.
Use it, improve it, deploy it.
Just don't let the bad guys have it first.
```

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,4,12,30&height=120&section=footer&text=Securing%20Bharat's%20Digital%20Future&fontSize=20&fontColor=ffffff&animation=fadeIn" width="100%"/>

**KAVACH — कवच**

*Alert → Analyze → Remediate → Report → Repeat*

*Built with 🇮🇳 for India's 1.4 billion citizens*

**⭐ Star this repo if KAVACH can protect India's digital infrastructure**

</div>
