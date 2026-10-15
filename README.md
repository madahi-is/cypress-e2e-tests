# Income Control System · E2E

Proyecto independiente de Cypress + TypeScript para HU-15, HU-9, HU-10, HU-11, HU-12, HU-13 y HU-14. Laravel original:
`/home/madahi/Documentos/income-control-system`. No se modifican ni eliminan sus
archivos. Las expectativas de HU-15 se conservan; HU-9 sigue el texto de aceptación proporcionado.

## Archivos revisados

Al iniciar existían `cypress.config.ts` y `cypress/`: cuatro specs HU-15 (10 casos),
fixtures, configuración TypeScript, soporte, helper PHP, Containerfile, Compose,
Apache, documentación y capturas anteriores. No existían `package.json`, lockfile
ni `.gitignore` propios. El original tenía modificaciones en `.gitignore`,
`package.json`, `package-lock.json` y archivos Cypress sin seguimiento; se preservaron.

## Requisitos y aislamiento

Usar Podman rootless y `podman compose`. Se reutilizan las imágenes
`localhost/income-control-system_php-fpm:latest` y
`localhost/income-control-system_workspace:latest` ya construidas desde Laravel.
El original debe tener `.env`, `vendor/` y `public/build/manifest.json` preparados.
Si faltan, preparar esos requisitos fuera de esta migración antes de ejecutar.

Compose conserva el proyecto `income-e2e`, PostgreSQL 15.10 con **app_e2e** y
Apache en **http://localhost:8082**. Sus volúmenes de datos y storage son exclusivos.
Laravel se monta en `/var/www` de solo lectura; el runner trabaja en `/e2e`, donde
se instalan las dependencias Node de este proyecto. Los caches de bootstrap van a
`/tmp` dentro de cada contenedor, evitando caches del entorno original.

Las rutas por defecto se resuelven desde `cypress/compose.yaml`:
`../../income-control-system` y `../../income-control-system/.env`.
Para otro directorio se pueden exportar `E2E_LARAVEL_PATH` y `E2E_LARAVEL_ENV`
con rutas absolutas. El helper recibe `E2E_LARAVEL_ROOT=/var/www` en el runner;
fuera de él, su valor por defecto es el repositorio hermano.

El helper carga Laravel original y comprueba `E2E_DB_DATABASE`, la conexión
predeterminada PostgreSQL, su configuración y `current_database()` antes de
restaurar. `migrate:fresh --database=pgsql` opera exclusivamente en **app_e2e**.
Cada caso restaura la base; no ejecutar suites simultáneas sobre esta instancia.
El navegador exige además la cabecera `X-E2E-Database: app_e2e`.

## Comandos

Desde este directorio, en una terminal con acceso normal a Podman:

```bash
export UID GID="$(id -g)"
podman compose -p income-e2e -f cypress/compose.yaml build runner
podman compose -p income-e2e -f cypress/compose.yaml up -d
podman compose -p income-e2e -f cypress/compose.yaml exec -T --user 0 runner bash cypress/support/init-storage.sh
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm ci && npx cypress install && npx cypress verify'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:types'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:run'
```

`e2e:run` ejecuta todos los specs HU-15 con Electron headless (58 casos tras la ampliación).
`e2e:open` abre la interfaz cuando el entorno dispone de pantalla.
PostgreSQL tiene healthcheck y PHP/runner esperan su disponibilidad.
No hace falta Node ni PHP en el host. El QR depende de `api.qrserver.com`.

Para detener la instancia conservando sus datos:

```bash
podman compose -p income-e2e -f cypress/compose.yaml down
```

## Verificación de la migración — 2026-10-06

- **TypeScript: pasó**, sin errores. En esta sesión no hay Node/npm en PATH:
  se copiaron las dependencias instaladas del original a `node_modules/` local
  (ignorado por Git) y se usó el runtime Node de VS Code:
  `ELECTRON_RUN_AS_NODE=1 /usr/share/code/code node_modules/typescript/bin/tsc --project cypress/tsconfig.json`.
- YAML de Compose, versiones directas del paquete/lock y sintaxis Bash del
  inicializador: comprobaciones estáticas correctas.
- **Ejecución de los 10 casos: bloqueada, sin nuevos resultados funcionales.**
  Se intentaron construir el runner y ejecutar `e2e:types`/`e2e:run` en Podman.
  Todos fallaron antes de iniciar por
  `mkdir /run/user/1000/libpod: read-only file system`, impuesto por el entorno
  restringido de esta sesión. El intento local de Cypress también terminó antes
  de ejecutar specs: no existe el binario Cypress 16.1.1 en el cache local.
- La instalación limpia `npm ci`, la construcción y la ejecución dentro de los
  contenedores quedan pendientes de verificación en una terminal con acceso a Podman.
- Reintento con `sandbox_permissions=require_escalated`: la política de esta
  sesión (`sandbox_approval: false`) rechazó la solicitud antes de ejecutar
  `podman ps`. No se pudo inspeccionar los contenedores ni iniciar una nueva
  ejecución. Esta sesión no dispone de acceso a una terminal externa al sandbox.

Los resultados **anteriores del 2026-10-05** fueron 2 aprobados (HU15-04 y
HU15-10) y 8 fallidos. No se presentan como una nueva ejecución.
HU15-10 elimina a Bruno, sin registros asociados, y comprueba el rechazo de
su sesión anterior y futuros logins. No cubre desactivación temporal ni reactivación.
Las aserciones de HU-15 no se han suavizado.

Detalle de casos, datos y límites: [guía HU-15](cypress/README.md).
Resultados anteriores: [HU-15-resultados.md](cypress/HU-15-resultados.md).
Capturas nuevas se guardan en `cypress/screenshots/`, ignoradas por Git.

## HU-9 · Gestión de grupos e inscripciones — 2026-10-10

Se añadieron **58 casos** en `cypress/e2e/HU-9/`, con cuatro specs y helpers
locales. Antes de escribirlos se inspeccionaron rutas, permisos, requests,
controladores, modelos, migraciones y vistas originales. Matriz criterio → casos
→ datos → selectores y diferencias: [HU-9-cobertura.md](cypress/HU-9-cobertura.md).

El reset `reset-hu9` usa exclusivamente app_e2e, añade dos docentes, tres
asignaturas de prueba, 18 grupos para filtros/paginación y relaciones controladas.
Los grupos semestrales de fixture se insertan como datos de aceptación; las
pruebas de alta siguen esperando que la aplicación acepte 2026-2.
HU-15 conserva `reset`/`state` y los cuatro specs originales sin cambios.

```bash
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:types'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu9'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu15'
```

`e2e:run` sigue ejecutando HU-15. `e2e:all` ejecuta todas las suites en una misma
invocación secuencial. Si HU-9 falla, ejecutar igualmente el comando HU-15 para
comprobar regresiones. No ejecutar procesos Cypress paralelos contra app_e2e.

**Verificación nueva:** TypeScript pasó. Los intentos Podman de ambas suites
quedaron bloqueados antes de iniciar por `chmod /run/user/1000/libpod: read-only
file system`. No hay nuevos resultados funcionales ni confirmación de ausencia
de regresiones de HU-15. Los 2 aprobados/8 fallidos son la línea base histórica.

Pendientes de aclaración: formatos adicionales de Gestión y bloqueo por vínculo
directo examen_grupo cuando no quedan inscritos. Diferencias conocidas por
inspección: se rechaza 2026-2 y el mensaje de duplicado usa «gestion» sin tilde.

Resultados, intentos de ejecución y límites: [HU-9-resultados.md](cypress/HU-9-resultados.md).

## HU-10 · Inscripciones de estudiantes a grupos — 2026-10-10

Se añadieron **31 casos en cinco specs** en `cypress/e2e/HU-10/`.
Matriz criterio → casos → datos → selectores y análisis previo:
[HU-10-cobertura.md](cypress/HU-10-cobertura.md).

`reset-hu10` restaura exclusivamente app_e2e, reutiliza la preparación de grupos
HU-9 y añade estudiantes buscables, 16 inscritos para paginación y un alumno con
inscripciones en dos asignaturas para verificar bajas sin daños laterales.
No depende de ejecutar HU-9 antes. HU-9/HU-15 conservan sus resets y specs.

Después del arranque/instalación descritos arriba, ejecutar secuencialmente:

```bash
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:types'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu10'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu9'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu15'
```

Si una suite falla, ejecutar igualmente las siguientes. `e2e:all` incluye las
tres suites en una invocación; `e2e:run` conserva la selección histórica HU-15.
Nunca ejecutar procesos concurrentes contra app_e2e.

**Verificación:** TypeScript pasó para todas las suites. El inventario estático
registra 31 casos HU-10; specs/helpers anteriores y código Laravel comprobados
con hashes permanecen intactos. Las ejecuciones Podman de HU-10, HU-9 y HU-15
se intentaron y quedaron bloqueadas antes de iniciar el runner por libpod de
solo lectura. No hay nuevos resultados funcionales ni certificación de ausencia
de regresiones. HU-15 conserva su línea base histórica de 2 aprobados y 8 fallidos.

Los textos actuales de rechazo no incluyen las tildes exigidas («está», «gestión»).
Los tests conservan los mensajes exactos de HU-10, sin modificar la vista ni
simular respuestas exitosas. Detalles y clasificación de pendientes:
[HU-10-resultados.md](cypress/HU-10-resultados.md).

## HU-11: Registro de Ingreso

Se añadieron 44 casos independientes en `cypress/e2e/HU-11/`, en 7 specs.
La [matriz de cobertura](cypress/HU-11-cobertura.md) incluye los datos y selectores
reales, las diferencias detectadas antes de implementar y los riesgos consultados.
Los [resultados y pendientes](cypress/HU-11-resultados.md) distinguen inspección,
verificación estática y ejecución. El [inventario](cypress/HU-11-inventario.json)
no representa resultados Cypress.

Cada caso ejecuta `reset-hu11` exclusivamente en app_e2e. `state-hu11` es una
consulta de solo lectura para verificar relaciones, usuario y timestamp del ingreso.
La foto proviene del fixture local y se copia al volumen aislado de storage.
Los exámenes usan la fecha del servidor al preparar el caso para estar en el catálogo
vigente; códigos, documentos, QR, nombres y relaciones son deterministas.

Desde una terminal normal ubicada en este proyecto, consultar primero contenedores
y ejecutar cada comando por separado (un fallo funcional no debe impedir lanzar
las otras suites). Si hace falta iniciar la instancia, seguir la preparación anterior.

```bash
podman ps --filter name=income-e2e
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:types'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu11'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu10'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu9'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu15'
```

Verificación del 2026-10-10: TypeScript completo pasó en el host. La consulta de
contenedores y todas las ejecuciones Podman quedaron bloqueadas por
`chmod /run/user/1000/libpod: read-only file system`, antes de iniciar Cypress.
No hay resultados nuevos ni regresiones acreditadas. HU-15 conserva su antecedente
de 2 aprobados y 8 fallidos. La política de esta sesión impide solicitar escalación;
la ejecución real y el lint PHP quedan pendientes desde una terminal normal.

## HU-12: Gestión de Incidencias

Se añadieron **59 casos en 7 specs** en `cypress/e2e/HU-12/`. La
[matriz previa](cypress/HU-12-cobertura.md) relaciona requisitos, variantes, datos
y selectores reales. [Resultados y pendientes](cypress/HU-12-resultados.md) e
[inventario estático](cypress/HU-12-inventario.json) separan cobertura implementada
de ejecución acreditada.

Estudiante es opcional; el mensaje obligatorio solo se exige para Examen, Tipo
y Descripción. La dependencia que llama HU-3 al registro de ingreso se documenta
como inconsistente con HU-11, sin imponer entradas previas a las incidencias.

Cada caso usa `reset-hu12`, exclusivamente app_e2e: dos exámenes, tres roles
permitidos y 26 incidencias históricas deterministas para filtros y paginación.
`vacio.cy.ts` usa `reset-hu12-empty` desde el mismo beforeEach para estado vacío.
`state-hu12` solo consulta PostgreSQL y el registro de rutas de Laravel tras las
protecciones compartidas. Verifica fecha/hora contra lecturas del reloj PHP;
no depende de cy.clock ni del mensaje de éxito.

Ejecutar desde una terminal normal ubicada en este proyecto, después de la
preparación de la instancia descrita arriba. Comprobar contenedores primero y
lanzar las suites secuencialmente, incluso si otra suite termina con fallos:

```bash
podman ps --filter name=income-e2e
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:types'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu12'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu11'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu10'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu9'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu15'
```

Verificación del 2026-10-10: **TypeScript pasó para todas las suites**. La consulta
de contenedores y los siete comandos Podman anteriores terminaron antes de
Cypress por `chmod /run/user/1000/libpod: read-only file system`. Cero casos
nuevos ejecutados; regresiones y lint PHP pendientes. Se preservaron por hashes
185 archivos previos. La política de esta sesión impide solicitar escalación.

La paginación UI tiene una incompatibilidad detectada por inspección; se conserva
la expectativa de navegación y se documentarán las aserciones que bloquee. Los
extremos de fecha implementados son inclusivos, pendientes de confirmación como
requisito. Validaciones adicionales y texto largo se identifican por separado.

## HU-13: Panel en tiempo real de asistencia

Se añadieron **29 casos en 6 specs** en `cypress/e2e/HU-13/`. Consultar la
[matriz previa y evidencia del panel](cypress/HU-13-cobertura.md), los
[resultados y límites](cypress/HU-13-resultados.md) y el
[inventario estático](cypress/HU-13-inventario.json).

Existe un panel específico con polling Inertia cada 3000 ms sobre GET
`/panel-asistencia`. `reset-hu13` prepara datos independientes exclusivamente en
app_e2e: escenarios en curso, uno/múltiples ambientes, futuro lejano y cerrado
según horario PHP, con habilitados/inhabilitado/sin habilitación. No inserta
check-ins. `state-hu13` solo lee datos y el intervalo real del código.

`hu13Checkin` usa una sesión HTTP independiente del segundo operador de control,
con cookies y CSRF propios y endpoints reales de HU-11. Verifica aislamiento
antes de escribir; el panel conserva su usuario, documento, selección y búsqueda.
La prueba de cierre observado usa un examen ya finalizado y una ventana de dos
intervalos de polling. No acredita la transición vivo→cerrado ni un snapshot final
con ingresos; esas comprobaciones dependen de definir la política de cierre.

Pendientes por ambiente no están implementados: la vista los muestra globalmente
y no existe asignación de ambiente en habilitación. Se conserva la expectativa
de dos listas por ambiente. Ventana de «próximo», asignación, cambio de horario,
inhabilitación posterior al ingreso y semántica de contadores filtrados fueron
consultados; no se inventan esas reglas.

Desde una terminal normal en este proyecto, después de preparar la instancia,
ejecutar por separado y secuencialmente aunque una suite falle:

```bash
podman ps --filter name=income-e2e
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:types'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu13'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu12'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu11'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu10'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu9'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu15'
```

Verificación del 2026-10-11: **TypeScript completo pasó**. Consultar contenedores
y ejecutar los comandos Podman anteriores quedó bloqueado por
`chmod /run/user/1000/libpod: read-only file system`, antes de Cypress. Cero casos
nuevos ejecutados; PHP, integración, polling y regresiones pendientes. Los hashes
de 195 archivos previos permanecen intactos. Esta sesión no permite solicitar
escalación del sandbox ni dispone de terminal externa.

## HU-14: Asignación de personal de control

Se añadieron **29 casos en 5 specs** en `cypress/e2e/HU-14/`. Consultar la
[matriz previa](cypress/HU-14-cobertura.md), los
[resultados y pendientes](cypress/HU-14-resultados.md) y el
[inventario estático](cypress/HU-14-inventario.json).

La sección existe en el detalle real `/examenes/{id}/habilitaciones`. `reset-hu14`
prepara exclusivamente app_e2e: dos docentes vinculados al examen compartido,
tres controles, dos exámenes con fechas/horas distintas, grupos, habilitaciones
y ambientes. Las asignaciones parten vacías y se crean mediante UI/endpoints
reales. `state-hu14` solo consulta la relación examen–usuario y entidades
relacionadas después de las guardias compartidas; verifica ausencia de cambios
laterales. No hay asignación individual por ambiente.

El selector oculta asignados. Duplicados se comprueban mediante POST autenticado
con CSRF y la bolsa de errores de sesión devuelta al detalle Inertia: texto exacto
y una única relación PostgreSQL. El reenvío directo no acredita que el callback
visual onError se haya ejecutado. Desasignación comprueba usuario/rol/login,
otros miembros/exámenes, recarga y posibilidad de reasignar sin duplicados.

Docentes sin vínculo y horarios solapados fueron consultados como reglas
adicionales pendientes; los casos positivos usan docentes realmente vinculados.

Desde una terminal normal en este proyecto, después de preparar la instancia,
comprobar contenedores y ejecutar por separado, secuencialmente, aunque una suite falle:

```bash
podman ps --filter name=income-e2e
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:types'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu14'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu13'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu12'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu11'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu10'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu9'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu15'
```

Verificación del 2026-10-11: **TypeScript de todas las suites pasó**. Consulta
de contenedores y ejecuciones Podman bloqueadas antes de Cypress por
`chmod /run/user/1000/libpod: read-only file system`. Cero casos nuevos ejecutados;
PHP, integración y regresiones pendientes. Los hashes de 204 archivos previos
permanecen intactos. Esta sesión no permite solicitar escalación del sandbox ni
dispone de terminal externa.

## HU-15: ampliación del panel de estudiante — 2026-10-11

La suite inicial de diez casos se amplió a **58 casos en 6 specs** en el mismo
`cypress/e2e/HU-15/`, sin suite duplicada. Se conservaron sus escenarios útiles y
se separaron los que bloqueaban criterios independientes. HU15-10 permanece
intacto. [Matriz previa](cypress/HU-15-cobertura.md),
[resultados de ampliación](cypress/HU-15-ampliacion-resultados.md) e
[inventario estático](cypress/HU-15-inventario.json).

`reset-hu15` prepara fotos previas distintas únicamente en storage E2E.
`state-hu15` lee cuentas/perfiles/relaciones y hashes de archivos para comprobar
persistencia y rechazos sin escrituras. HU15-10 sigue con reset/state originales.
La selección de resets no cambia las otras HU. QR se decodifica realmente, sin
sustituir el decoder por la URL; errores de servicio externo se distinguen.

El código actual sigue con redirección a Mis Exámenes, token derivado de código,
ausencia de CI/foto persistida en el panel y rutas de foto/QR vacías. No se
presentan esas observaciones como resultados ejecutados. Se consultó el máximo
servidor de fotos: 2 MiB inclusivos solo se caracteriza como límite del navegador.
Desactivación/reactivación no existe y queda pendiente; baja definitiva no la acredita.

Desde una terminal normal, después de preparar income-e2e, ejecutar cada comando
por separado y secuencialmente, incluso si otra suite falla:

```bash
podman ps --filter name=income-e2e
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:types'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu15'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu14'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu13'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu12'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu11'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu10'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu9'
```

**TypeScript de todas las suites pasó.** Todos los intentos Podman quedaron
bloqueados antes de Cypress por `chmod /run/user/1000/libpod: read-only file system`.
Cero casos nuevos ejecutados; PHP, integración y regresiones pendientes. Los
2 aprobados/8 fallidos del 2026-10-05 son históricos. Se verificaron 211 archivos
previos: solo tres specs HU-15 cambiaron según lo autorizado, los otros 208 siguen
intactos. Esta sesión no puede solicitar escalación ni acceder a terminal externa.
