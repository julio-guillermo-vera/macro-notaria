# App Windows - Protocolo Cloud

Esta carpeta queda reservada para la aplicación instalada en Windows.

La app local deberá:

1. Detectar Microsoft Word abierto.
2. Leer la posición del cursor.
3. Enviar solo el texto desde el cursor hacia adelante al motor cloud.
4. Recibir el texto procesado.
5. Reemplazar el contenido en Word sin tocar lo anterior.
6. Asociar archivos propios `.protocolo` si se requiere.

Tecnología recomendada para la etapa siguiente:

- Tauri + React para instalador liviano.
- Complemento Office JS o automatización COM para Word en Windows.
