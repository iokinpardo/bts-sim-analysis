<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1jQ9Nkz8zf1YOdWjgOqtW1DwGm6YqKNRs

## Features

- **Render host allowlist** — Vite server and preview now allow requests from `bts-sim-analysis.onrender.com`, preventing blocked-host errors on production deployments.
  - **Usage example:** If you deploy under another Render domain, add it to `server.allowedHosts` and `preview.allowedHosts` in `vite.config.ts` so the app accepts the hostname.
- **Vite entry script wiring** — `index.html` now loads `index.tsx`, ensuring the React dashboard mounts correctly in production/preview builds instead of rendering a blank page.
  - **Usage example:** After `npm run build`, serve the `dist` folder (e.g., `npm start` on Render) and the dashboard renders without extra configuration because the entry module is included.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy en Render.com

1. **Preparar el repositorio**
   - Asegúrate de que el código está en GitHub y en la rama que quieras publicar.
   - Comprueba que la app construye correctamente de forma local con `npm run build`.

2. **Crear el servicio en Render**
   - En Render, pulsa **New > Static Site** y conecta el repositorio de GitHub.
   - Selecciona la rama a desplegar y confirma los ajustes iniciales.

3. **Configurar build y publicación**
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `dist`
   - **Node version (opcional):** establece el campo **Environment > Runtime** en 20.x o la versión que uses localmente.
   - Si creas un **Web Service** en lugar de un sitio estático, usa **Start command:** `npm start` (sirve la build con `vite preview` y respeta la variable `PORT` que asigna Render).

4. **Variables de entorno**
   - En **Environment > Add Environment Variable**, crea `GEMINI_API_KEY` con el mismo valor que usas localmente.
   - Guarda los cambios para que Render regenere el deploy con la clave incluida.

5. **Desplegar y verificar**
   - Pulsa **Create Static Site**. Render instalará dependencias, construirá el proyecto y publicará `dist`.
   - Cuando el deploy termine, abre la URL proporcionada para validar que la app carga y responde.

6. **Autodeploy**
   - Activa **Auto-Deploy** para que cada push a la rama seleccionada genere un nuevo deployment automáticamente.

> Si necesitas usar un servicio web en lugar de un sitio estático (por ejemplo, para SSR o APIs), crea un **Web Service** con los mismos comandos de build y especifica un comando de arranque que sirva los archivos de `dist`.
