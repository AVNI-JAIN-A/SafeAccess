# SafeAccess

**SafeAccess** is a secure ATM card access system that uses fingerprint verification and real-time owner permission to prevent unauthorized transactions.

Built for scenarios where your card is used without you — the system verifies the fingerprint at the ATM and notifies the card owner instantly if something doesn’t match. Access is granted only if the owner approves it via a web dashboard.

---

## What It Does

- Detects invalid fingerprint access attempts
- Sends live permission requests to the card owner
- Lets owner allow/deny access in real time
- Shows card status, access logs, and registered users
- Simulates alerts for testing and demo purposes

---

## Why This Matters

Most banking systems rely only on PIN-based authentication, which can be easily misused if someone else gets access to your card. SafeAccess adds a biometric + remote approval layer to prevent that.

---

## Built With

- React
- Tailwind CSS
- shadcn/ui
- lucide-react (icons)
- Vite

---

## How to Run

```bash
git clone https://github.com/AVNI-JAIN-A/SafeAccess.git
cd SafeAccess
npm install
npm run dev
