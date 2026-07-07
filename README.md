# Protocolo Cloud 1.0

Aplicación base profesional para automatización documental notarial.

## Qué incluye

- Interfaz elegante y corporativa en React + Vite.
- Panel principal.
- Módulo de procesamiento documental.
- Módulo de notarios de planta y suplentes.
- Textos automáticos por notario.
- Configuración para publicar en Cloudflare Pages.
- Función API de salud: `/api/health`.
- Carpeta reservada para app Windows instalada.

## Publicar en Cloudflare Pages

Configuración recomendada:

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Root directory: `/`

## Comandos locales

```bash
npm install
npm run dev
npm run build
```

## Importante

La parte web vive en Cloudflare.  
La conexión directa con Microsoft Word requiere una app instalada en Windows, que se construirá en la siguiente etapa.
