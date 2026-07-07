# Configuración correcta en Cloudflare Pages

Este proyecto NO se debe publicar como Worker directo.
Debe publicarse como Cloudflare Pages.

Configuración:

- Framework preset: Vite
- Build command: npm run build
- Build output directory: dist
- Root directory: /

No usar `npx wrangler deploy` como comando principal para esta etapa.
