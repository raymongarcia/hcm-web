# Kodanda HCM — Next.js rebuild

A standalone Next.js App Router rebuild of the legacy Kodanda HCM frontend. The project uses Next.js 16, React 19, TypeScript, and responsive CSS; the current dashboard and module records use local demo data.

## Run locally

```powershell
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

- `/` — HCM dashboard
- `/people` — employee directory
- `/attendance`, `/time-off`, `/payroll`, `/hiring`, `/performance`, `/learning`, `/reports`, `/settings` — module workspaces

Module routes currently share an interactive demo directory. Legacy authentication, API integrations, payroll calculations, and persisted records are not yet connected.
