# Vercel proxy

Deploy this folder to Vercel as a separate project.

Required:
- vercel.json (version 2)
- package.json with { "type": "module" }
- Env var: OPENAI_API_KEY

Notes:
- If runtime error persists, set runtime explicitly in the Vercel UI to "Node.js 20" and redeploy.
- For monorepos, ensure Root Directory is api-proxy/ when importing on Vercel.
