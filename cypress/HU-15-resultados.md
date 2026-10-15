# HU-15 · resultados E2E

Fecha: 2026-10-05. Instancia Podman `income-e2e`, PostgreSQL 15.10 y base
`app_e2e`, HTTP en puerto 8082. Cypress 16.1.1, Electron headless.

Se ejecutaron los 10 casos, sin mocks del backend y sin modificar producción.
Se restauraron únicamente los datos de `app_e2e`. Los fallos iniciales de
configuración HTTP/Inertia fueron corregidos antes de evaluar funcionalidad.

| Caso | Resultado | Evidencia / límite |
|---|---|---|
| HU15-01 | Falla | Alta y contraseña temporal funcionan; tras cambiarla termina en `/mis-examenes`, no en el panel QR. |
| HU15-02 | Falla | Login termina en `/mis-examenes`; no alcanza las aserciones posteriores de identidad. |
| HU15-03 | Falla | El estudiante puede llegar a Mis Exámenes vía `/dashboard`; no hay acceso exclusivo al panel. |
| HU15-04 | Pasa | Sin registro público; alta de estudiantes/usuarios y edición propia rechazadas por rol. |
| HU15-05 | Falla | En viewport móvil de 390 px el documento mide 519 px: desbordamiento horizontal. La decodificación QR y tablet quedan bloqueadas por ese fallo previo. |
| HU15-06 | Falla | El contenido es `ident:v1:202600901`, derivado del código universitario. No alcanza la comparación posterior entre estudiantes. |
| HU15-07 | Falla | Tras regenerar, el contenido del QR no cambia. No alcanza las comprobaciones posteriores de invalidación. |
| HU15-08 | Falla | Tras subir JPG y recargar no aparece foto persistida. No alcanza reemplazo PNG ni consulta desde control. |
| HU15-09 | Falla | El navegador rechaza formato y tamaño y no envía esas cargas; el envío directo al servidor no devuelve 422 (devuelve 200 tras redirección). |
| HU15-10 | Pasa | Baja mediante eliminación: cookies de sesión anterior ya no permiten el panel y las credenciales dejan de funcionar. |

HU15-10 cubre la alternativa «dado de baja». No cubre desactivación temporal,
reactivación ni borrado físico inmediato de la fila de sesión: comprueba que
esa sesión deja de autorizar acceso a la aplicación.

El escenario de baja usa a Bruno, sin registros asociados. No permite concluir
que puedan darse de baja estudiantes con habilitaciones o ingresos asociados.

Las capturas locales están en `cypress/screenshots/` y se excluyen de Git.
Las pruebas se detienen en el primer incumplimiento de cada caso; que una
comprobación posterior no se alcance no significa que haya pasado.

## Migración al proyecto independiente — 2026-10-06

TypeScript pasó en el proyecto independiente. La nueva ejecución Podman quedó
bloqueada antes de iniciar los casos por `mkdir /run/user/1000/libpod: read-only
file system`. El intento local tampoco inició specs por ausencia del binario
Cypress. La tabla anterior conserva los resultados del 2026-10-05; no representa
una ejecución posterior a la migración. Comandos e instrucciones en
[README principal](../README.md).

## Ampliación del 2026-10-11

La suite ahora tiene 58 casos en 6 specs. TypeScript pasó; la ejecución Podman
quedó bloqueada antes de Cypress. La tabla de diez casos de arriba sigue siendo
histórica, sin resultados funcionales nuevos. Cobertura y verificación actual:
[HU-15-ampliacion-resultados.md](HU-15-ampliacion-resultados.md).

## Ejecución completa comunicada por el usuario — resultado más reciente disponible

**58 ejecutados; 31 aprobados; 27 fallidos; 0 pendientes y 0 omitidos. Duración: No informada.**

Fuente: resumen suministrado por el usuario, sin log completo ni fecha exacta de ejecución. Supera los antecedentes de ejecución bloqueada que figuran arriba. No permite identificar cada caso fallido ni atribuir causas.

| Archivo o área | Casos | Aprobados | Fallidos |
|---|---:|---:|---:|
| Acceso | 21 | 15 | 6 |
| Baja | 1 | 1 | 0 |
| Foto | 11 | 6 | 5 |
| Identidad | 8 | 4 | 4 |
| QR | 9 | 4 | 5 |
| Responsive | 8 | 1 | 7 |
| **Total** | **58** | **31** | **27** |

Clasificación causal pendiente de los bloques numerados de error y/o JSON Cypress. No se extrapolan resultados históricos o de inspección a esta ejecución.
