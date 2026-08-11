# LeadGen Demos

Single shared Railway service for all generated business demos.

## Deploy
1. Push this repository to GitHub as `leadgen-demos`.
2. Railway → New Project → Deploy from GitHub Repo.
3. Select `leadgen-demos`.
4. Railway automatically detects `package.json` and `railway.json`.
5. Generate a public Railway domain.
6. Verify `https://YOUR-DOMAIN/health`.

All demos share one service:
`/demos/<demo-slug>/`

## Health
- `/health` service health
- `/api/health` API health
- `/demos/<slug>/health` individual demo availability

Railway's native healthcheck is configured in `railway.json`.
A GitHub Actions workflow can additionally ping `/health` every 10 minutes.

## Local
`npm install`
`npm start`
