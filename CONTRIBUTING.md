# Contribuyendo a MatriFer Moldes

## Proyecto

Sitio estático con Astro 7 + Tailwind CSS v4.

## Comandos

- `npm run dev` — dev server con recarga
- `astro dev --background` — dev en segundo plano
- `npm run build` — build estático a `dist/`
- `npm run preview` — previsualizar build
- `npm run astro` — CLI de Astro

## Estructura

- `src/pages/` — rutas (`index.astro`, rutas dinámicas `[slug].astro`)
- `src/layouts/` — layouts compartidos
- `src/components/` — componentes
- `src/styles/` — estilos globales
- Imports con alias `@/*` → `./src/*`

## Flujo de trabajo git

- Trabajar en `main` con commits atómicos
- Un commit = un cambio lógico
- Push frecuente a `origin` (`main`)

## Mensajes de commit (Conventional Commits, en español)

- `feat:` nueva funcionalidad — ej: `feat: creo página de contacto`
- `fix:` corrección de bug — ej: `fix: corrijo margen del hero`
- `chore:` tareas de mantenimiento — ej: `chore: actualizo dependencias`
- `style:` cambios visuales sin lógica
- `docs:` documentación
- `refactor:` reestructuración sin cambiar comportamiento

## Antes de commitear

- Verificar que `npm run build` no rompa
- Revisar `git status` / `git diff`
- No subir secretos ni `.env`