# KAVACH — New Member Setup Guide

Follow this EXACTLY when you first clone the repo.
Takes about 20 minutes.

---

## Step 1: Clone and checkout YOUR branch

```bash
git clone https://github.com/YOUR_REPO_URL/KAVACH.git
cd KAVACH

# Checkout YOUR specific branch (not main, not dev)
# Raj:       git checkout raj/agents
# ML:        git checkout ml/pipeline
# Frontend:  git checkout frontend/dashboard
# Fullstack: git checkout fullstack/infra
git checkout YOUR-BRANCH-NAME
```

## Step 2: Setup Backend (Everyone does this)

```bash
cd backend
npm install
cp .env.example .env
# Ask Raj for the actual .env values on WhatsApp
```

## Step 3: Setup YOUR specific area

**If you are ML Member:**
```bash
cd ml-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
# Should see: Uvicorn running on http://0.0.0.0:8000
```

**If you are Frontend Member:**
```bash
cd frontend
npm install
echo "VITE_API_URL=http://localhost:3001" > .env.local
npm run dev
# Should see: Local: http://localhost:5173
```

**If you are Fullstack Member:**
```bash
cd backend
npx prisma generate
npx prisma db push
npx prisma db seed
npm run dev
# Should see: KAVACH Backend running on port 3001
```

## Step 4: Verify everything works

Open these URLs and confirm no errors:
- Backend: http://localhost:3001/api/incidents
- Frontend: http://localhost:5173
- ML Service: http://localhost:8000/health

## Step 5: Read OWNERSHIP.md

Before writing a single line of code — read OWNERSHIP.md
Know your files. Stay in your lane.

## Step 6: Your daily workflow

```bash
# Morning
git checkout YOUR-BRANCH
git pull origin dev

# Evening after work
git add .
git commit -m "what you did today"
git push origin YOUR-BRANCH
# Open PR on GitHub → base: dev
```

---

## Common Issues

**npm install fails:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Prisma error:**
```bash
npx prisma generate
npx prisma db push --force-reset
npx prisma db seed
```

**TypeScript errors:**
Share the exact error in the team WhatsApp group.
Don't try to fix other people's code.

---

## Emergency Contacts

Git broken? → Message Raj immediately
Build failing? → Screenshot the error → WhatsApp group
Don't know what to work on? → Read your tasks in OWNERSHIP.md
