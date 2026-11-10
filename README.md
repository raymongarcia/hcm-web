# People Cloud HCM

A standalone human capital management workspace built with the Next.js App Router. The project uses Next.js 16, React 19, TypeScript, and responsive CSS; the dashboard, module records, and role permissions use local demo data.

## Run locally

```powershell
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

- `/` — HCM dashboard
- `/people` — employee directory
- `/attendance`, `/time-off`, `/payroll`, `/hiring`, `/performance`, `/learning`, `/reports` — module workspaces
- `/settings` — configure module access for each workspace role

Module routes currently share an interactive demo directory. Role permission changes are held in browser memory and are not persisted; authentication, API integrations, and payroll calculations are not yet connected.
