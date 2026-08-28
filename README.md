# Acortador de enlaces con página de espera publicitaria

Sitio 100% estático (HTML/CSS/JS puro), pensado para GitHub Pages.

## Cómo funciona

- No hay servidor ni base de datos. `index.html` codifica la URL destino en
  base64 y arma el enlace: `wait.html?u=<codigo>`.
- `wait.html` decodifica el destino, muestra los anuncios y, tras 5
  segundos, activa el botón **IR AL LINK**.
- El `<div id="ad-slots">` en `wait.html` es donde pegas el código de tu
  red de anuncios.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (público).
2. Sube estos archivos a la raíz del repositorio:
   `index.html`, `wait.html`, `style.css`, `script.js`, `wait.js`,
   `supabase-config.js`.
3. Entra a **Settings → Pages**.
4. En "Source" elige la rama `main` y la carpeta `/ (root)`. Guarda.
5. Espera 1–2 minutos. Tu sitio quedará en:
   `https://tu-usuario.github.io/tu-repositorio/`

## Dónde poner tus anuncios

En `wait.html` hay un `<div id="ad-slots">` marcado con comentarios, justo
arriba del contador. Pega ahí el código que te dé tu red de anuncios
(script + div, iframe, lo que sea). El contador y el botón **IR AL LINK**
no dependen de eso, así que seguirán funcionando sin importar qué anuncio
pongas.

Si el código de tu anuncio usa `document.write` (algunas redes lo hacen),
y lo insertas dinámicamente con JavaScript después de que la página ya
cargó, puede borrar toda la página — es un bug conocido de esos tags. Si
te pasa eso, dime qué red es y te ayudo a envolverlo en un `<iframe>`
para que no truene.

## Configurar Supabase (códigos cortos reales)

1. Crea un proyecto gratis en [supabase.com](https://supabase.com).
2. Abre **SQL Editor** y ejecuta el contenido de `supabase-setup.sql`
   (crea la tabla `links` y sus políticas de seguridad).
3. Ve a **Settings → API** y copia el "Project URL" y la clave "anon public".
4. Pégalos en `supabase-config.js`, en `SUPABASE_URL` y `SUPABASE_ANON_KEY`.
5. Sube todo a GitHub. Los enlaces generados ahora serán
   `wait.html?c=ab12cd` con el destino guardado en tu base de datos.

La anon key es segura de exponer en el navegador: las políticas RLS
(`supabase-setup.sql`) limitan lo que puede hacer con ella — solo
insertar y leer enlaces, nunca modificarlos ni borrarlos.


