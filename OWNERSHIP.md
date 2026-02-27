# KAVACH — Team File Ownership

> Read this before touching ANY file.
> If a file isn't in your zone — don't touch it.
> If you need to change a shared file — announce in group chat first.

---

## 🤖 Raj — AI Agents & Intelligence Layer
**Branch:** `raj/agents`

### ✅ YOUR FILES — Touch freely:
```
backend/src/agents/commanderAgent.ts
backend/src/agents/immediatorAgent.ts  
backend/src/agents/dispatcher.ts
backend/src/agents/remediationAgents/authAgent.ts
backend/src/agents/remediationAgents/networkAgent.ts
backend/src/agents/remediationAgents/infraAgent.ts
backend/src/routes/copilot.ts
backend/src/config/anthropic.ts
```

### ❌ NEVER TOUCH:
```
frontend/**
ml-service/**
backend/src/routes/incidents.ts
backend/src/routes/logs.ts
backend/prisma/**
```

### 📋 Your March 18-28 Tasks:
- [ ] Commander Agent with Claude API + retry logic
- [ ] Immediator Agent with civic_impact_multiplier scoring
- [ ] Dispatcher routing incidents to domain agents
- [ ] All 3 remediation agents with simulate* functions
- [ ] CISO Co-Pilot in Hindi + English
- [ ] Daily briefing generator

---

## 🧠 ML Member
**Branch:** `ml/pipeline`

### ✅ YOUR FILES — Touch freely:
```
ml-service/main.py
ml-service/synthetic_logs.py
ml-service/requirements.txt
backend/src/ml/anomalyDetector.ts
```

### ❌ NEVER TOUCH:
```
frontend/**
backend/src/agents/**
backend/src/routes/**
backend/prisma/**
```

### 📋 Your March 18-28 Tasks:
- [ ] Isolation Forest working on security log features
- [ ] Feature engineering (request_rate, error_rate, endpoint_diversity)
- [ ] /detect endpoint returning anomaly_score per log
- [ ] synthetic_logs.py generating 10K realistic logs
- [ ] 5 attack patterns in synthetic data (brute force, DDoS, SQLi, exfil, scan)
- [ ] /stats endpoint for dashboard metrics

---

## 🎨 Frontend Member
**Branch:** `frontend/dashboard`

### ✅ YOUR FILES — Touch freely:
```
frontend/**
```

### ❌ NEVER TOUCH:
```
backend/**
ml-service/**
```

### 📋 Your March 18-28 Tasks:
- [ ] Dashboard with stats cards, incident feed, charts
- [ ] Incidents page with filters
- [ ] Incident detail page
- [ ] SimulatorPage (most important — demo page)
- [ ] CopilotPage with chat interface in Hindi/English
- [ ] PhishingModule with department scores
- [ ] Dark theme, professional design
- [ ] Auto-refresh every 30 seconds

---

## ⚙️ Fullstack Member
**Branch:** `fullstack/infra`

### ✅ YOUR FILES — Touch freely:
```
backend/src/routes/incidents.ts
backend/src/routes/logs.ts
backend/src/alerts/telegramAlert.ts
backend/src/alerts/emailAlert.ts
backend/src/middleware/**
backend/src/db/**
backend/prisma/**
backend/src/index.ts
docker-compose.yml
.env.example
```

### ❌ NEVER TOUCH:
```
frontend/**
ml-service/**
backend/src/agents/**
```

### 📋 Your March 18-28 Tasks:
- [ ] All REST API routes working with correct responses
- [ ] Prisma schema pushed to Neon PostgreSQL
- [ ] Seed data (15 realistic incidents) loading correctly
- [ ] Telegram bot sending formatted alerts
- [ ] Email alerts in CERT-In format
- [ ] Docker-compose running all 4 services
- [ ] Deployment on Railway/Render
- [ ] Demo scenario script for March 28

---

## 🤝 Shared Files (Coordinate Before Editing)

| File | Who Can Edit | How To Edit |
|------|-------------|-------------|
| `backend/src/types/index.ts` | Anyone | Announce in group first |
| `README.md` | Anyone | Just push, no need to ask |
| `.github/**` | Raj only | Workflow files |
| `OWNERSHIP.md` | Raj only | This file |

---

## 🚨 Git Rules — Non Negotiable

```bash
# Before starting work every day
git checkout your-branch
git pull origin dev

# After finishing work every day  
git add .
git commit -m "clear description of what you did"
git push origin your-branch
# Then open PR on GitHub → base: dev
```

**NEVER:**
- Push directly to `main`
- Push directly to `dev`  
- Commit `.env` files
- Commit `node_modules`

---

## 📅 Key Dates

| Date | Milestone |
|------|-----------|
| Feb 25 | Repo setup complete |
| Mar 18 | Mid-sems end — full sprint begins |
| Mar 23 | Integration day — everything connects |
| Mar 25 | Buffer day — fix broken things |
| Mar 26-27 | Demo rehearsal |
| Mar 28 | FINALE — Bharat Mandapam 🏆 |
