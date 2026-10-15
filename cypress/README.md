# HU-15: pruebas E2E

Cypress + TypeScript. 58 casos ejecutables tras la ampliación; la tabla inicial de diez casos se conserva como referencia histórica. HU15-10 cubre la baja mediante eliminación de un estudiante
sin registros asociados. No cubre desactivación temporal ni reactivación, flujos aún inexistentes. No se simulan
respuestas exitosas ni se modifican rutas, controladores o vistas.

## Entorno exclusivo

`compose.yaml` usa un proyecto Podman independiente, PostgreSQL 15.10 con base
`app_e2e`, almacenamiento separado y Apache en `http://localhost:8082`.
Reutiliza las imágenes PHP ya construidas en el proyecto. El runner añade las
bibliotecas de Cypress sin modificar la imagen workspace del equipo.

Los tests restauran **solo app_e2e** mediante `migrate:fresh` antes de cada caso.
Nunca ejecutar en paralelo contra esta misma base. El helper PHP comprueba el
nombre configurado y el nombre real de la base antes de escribir. El navegador
exige la cabecera del Apache E2E antes de interactuar con formularios.

La guía de instalación y ejecución del proyecto independiente está en
[README principal](../README.md). El código Laravel se monta desde el repositorio
hermano, en solo lectura; el runner trabaja en `/e2e` y mantiene las dependencias
Node en este proyecto. Storage y PostgreSQL pertenecen exclusivamente a `income-e2e`.

Se usa `APP_ENV=local` porque el proveedor existente fuerza HTTPS en otros
entornos. La separación se garantiza por red, base, cookies y volúmenes exclusivos.
El manifest Vite y `vendor/` deben existir previamente en Laravel.

## Datos

Administrador `admin.e2e@example.test`, control `control.e2e@example.test`,
estudiantes `202600901` (Ana Prueba / CI 9900901) y `202600902` (Bruno Prueba / CI
9900902). Contraseña de pruebas: `E2ePassword!2026`.
HU15-01 crea `202600903`; su contraseña temporal actual es el CI `9900903`.
Un examen de hoy, periodo, asignatura, ambiente y habilitación de Ana.
Bruno no tiene registros asociados, para permitir su baja.

Fixtures: JPG y PNG válidos, PNG real superior a 2 MiB y texto no admitido.
El QR requiere acceso a api.qrserver.com; se decodifica con jsQR y pngjs.
HU15-06 detecta predictibilidad evidente: no sustituye la revisión criptográfica.

## Casos y brechas esperadas

| Caso | Comprobación | Brecha actual |
|---|---|---|
| 01 | Alta, contraseña temporal y cambio obligatorio | Destino después del cambio |
| 02 | Login e identidad completa propia | Login va a mis-examenes; CI no visible |
| 03 | Acceso exclusivo al panel | mis-examenes sigue permitido |
| 04 | Sin autorregistro ni edición propia | Verificar ejecución |
| 05 | QR decodificable, móvil y tablet | Dependencia externa y layout por verificar |
| 06 | QR distinto y no derivado de identidad | Payload predecible |
| 07 | Rotación persistente e invalidación | Ruta placeholder |
| 08 | JPG, reemplazo PNG y referencia en control | Ruta placeholder; foto no enviada al panel |
| 09 | Rechazo de formato/tamaño y validación servidor | Servidor sin validación |
| 10 | Baja, revocación de sesión y rechazo de login | Desactivación temporal/reactivación fuera de cobertura |

Las capturas de fallos se guardan en `cypress/screenshots/` (ignoradas por Git).
No se alteran PHPUnit ni CI existentes. La automatización CI queda pendiente
hasta verificar el runner y la instancia E2E.

Resultados y límites de cobertura: [HU-15-resultados.md](HU-15-resultados.md).

## Suite ampliada — 2026-10-11

La tabla anterior describe la suite inicial histórica. Actualmente se ejecutan
**58 casos en 6 specs**, separando identidad, QR, fotos, responsive y acceso.
[Matriz de ampliación](HU-15-cobertura.md),
[resultados actuales y pendientes](HU-15-ampliacion-resultados.md) e
[inventario estático](HU-15-inventario.json).

HU15-10 conserva archivo y reset originales. Los demás casos usan reset-hu15 y
state-hu15 con fotos previas distintas en el volumen E2E y consultas protegidas
solo lectura. El límite servidor de fotos y reactivación siguen pendientes de
política/mecanismo; las fronteras cliente no acreditan validación del servidor.
