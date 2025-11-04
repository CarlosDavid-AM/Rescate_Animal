## Base de datos

Archivo SQL en `sql/init_db.sql`. Contiene la creación de la base `animal_rescue`, tablas `animals` y `adopters`, y 3 registros de ejemplo.

## Cómo ejecutar (local)

1. Crear la base y tablas con `sql/init_db.sql`.
2. Crear `.env` con tus credenciales:
3. Instalar dependencias:
4. Iniciar en modo desarrollo:
5. Abrir `http://localhost:3000`.

## Rutas API (resumen)

- `GET /api/animals` → lista animales
- `GET /api/animals/:id` → detalle animal
- `POST /api/animals/:id/adopt` → marcar adoptado (body opcional: `{ adopter_id }`)
- `POST /api/adopters` → crear adopción (body con datos del adoptante)
- `GET /api/adopters` → listar adopciones

## Despliegue

- Alta recomendación: usar un servicio de MySQL gestionado (PlanetScale, Railway, RDS).
- Subir código a GitHub (repo público).
- Desplegar frontend y backend en Vercel o Railway; configurar variables de entorno en la plataforma.

## Mejoras futuras (opcional)

- Autenticación y roles (admin).
- Capacidad para subir fotos (Cloudinary).
- Validaciones, tests y CI/CD.
- Panel admin con CRUD completo.
