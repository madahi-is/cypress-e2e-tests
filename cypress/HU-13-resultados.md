# HU-13 · resultados y pendientes

2026-10-11. [Matriz y análisis previo](HU-13-cobertura.md).
[Inventario estático](HU-13-inventario.json): **29 casos en 6 specs**.

| Suite | Casos | Ejecución nueva |
|---|---:|---|
| HU-13 | 29 | Bloqueada antes de Cypress |
| HU-12 | 59 | Bloqueada antes de Cypress |
| HU-11 | 44 | Bloqueada antes de Cypress |
| HU-10 | 31 | Bloqueada antes de Cypress |
| HU-9 | 58 | Bloqueada antes de Cypress |
| HU-15 | 10 | Bloqueada antes de Cypress |

**Cero casos ejecutados y ningún aprobado/fallido nuevo.** HU-15 conserva el
antecedente de 2 aprobados (04/10) y 8 fallidos. No se certifican regresiones por
inspección o por el aprobado de TypeScript.

## Verificación realizada

- TypeScript de todas las suites/configuración/tarea HTTP: salida 0 mediante
  `ELECTRON_RUN_AS_NODE=1 /usr/share/code/code node_modules/typescript/bin/tsc --project cypress/tsconfig.json`.
- Inventario estático registra títulos únicos; no ejecuta callbacks Cypress.
- Selección de resets Linux/Windows, dependencias/lock, orden de guardias y ausencia
  de escrituras explícitas en state-hu13: comprobaciones estáticas correctas.
- Hashes de 195 archivos previos: sin cambios en Laravel, suites/helpers anteriores,
  comandos, Compose ni AGENTS.md. Git de Laravel conserva la modificación previa
  de package-lock.json.
- Extensiones compartidas: reset-hu13/state-hu13 y tarea hu13Checkin. Ninguna suite
  anterior depende del nuevo seed; sus ramas de reset quedan intactas.

## Ejecución e infraestructura

Se intentó primero consultar `podman ps --filter name=income-e2e`. Después,
secuencialmente y por separado, e2e:types y HU-13/12/11/10/9/15 mediante Compose
income-e2e. Todos salieron con código 1 antes de entrar en servicios:

```
set sticky bit on: chmod /run/user/1000/libpod: read-only file system
```

No se pudo confirmar qué contenedores existen, ejecutar PHP/PostgreSQL/Cypress
ni verificar autenticación independiente, CSRF, seed, polling, cierre, horas o
regresiones reales. No hay PHP en PATH del host; lint PHP pendiente. La política
actual impide solicitar escalación y esta sesión no dispone de terminal externa.
El README deja comandos preparados para una terminal normal en este proyecto.

## Cobertura viable implementada

- Acceso por menú, URL, JSON y refresco parcial para tres roles; rechazo estudiante
  y visitante sobre el único endpoint existente de consulta/actualización.
- Selección en curso y cambio de examen sin mezcla. Futuro lejano es una
  caracterización del catálogo actual, **no** cumplimiento de «próximo» confirmado.
- Ingresos por ambiente con hora de PostgreSQL, pendientes globales exactos,
  exclusión de inhabilitados/sin habilitación que no tienen ingreso, aislamiento de
  otro examen y estados todos pendientes/parcial/todos ingresados.
- Contadores globales coherentes para datos válidos, identidad única y suma de
  ingresados entre ambientes. No se inventan denominadores de habilitados por ambiente.
- Búsqueda nombre/código, sin resultados/limpieza. Contadores globales independientes
  de búsqueda caracterizan comportamiento actual, pendiente de confirmación.
- Check-in real de un segundo control: cookie jar Node independiente, login,
  CSRF actualizado tras autenticar, validación y guardado HU-11. Tarea comprueba
  app_e2e por conexión protegida y cabecera HTTP. No escribe SQL para simular ingresos.
- Panel abierto: polling nuevo iniciado después del commit, estudiante pasa a
  ingresados, hora/actor persistidos, examen/ambiente/filtro/documento conservados.
  Se excluyen solicitudes en vuelo; timeout de Cypress es límite técnico del
  comando, no un SLA añadido a la HU.
- Examen ya finalizado según reloj PHP: muestra cierre, asistencia existente y
  ausencia de consultas durante dos intervalos reales leídos del código (6 s).
  La carga inicial terminó antes de observar; no se cuentan peticiones en vuelo.
  El fixture cerrado tiene asistencia vacía: no acredita congelación de una
  asistencia final con ingresos ni la transición desde un panel vivo.

## Incumplimientos y límites

**Por inspección, no por ejecución:** cada tarjeta de ambiente carece de las dos
listas exigidas y solo presenta ingresos; pendientes están fuera, globales. Los
casos HU13-09 uno/múltiples conservan la expectativa de ambas listas en tarjetas
existentes, sin selectores ficticios. Si fallan, las comprobaciones posteriores
quedan no ejecutadas, no aprobadas.

La relación habilitación→ambiente no existe. Por ello, pendientes y totales exactos
por ambiente se documentan **no implementados** y pendientes de asignación, sin
repartir alumnos arbitrariamente. Total_habilitados repite el global en cada ambiente.

Ingresos no se filtran por habilitación vigente; resumen cuenta registros. Hay
riesgo de incluir inhabilitados posteriores y duplicados concurrentes entre
ambientes (unique por pivot). No se crean entradas artificiales de no habilitados
ni duplicados para atribuirles una política no confirmada.

El panel recalcula estado; cierre no es un snapshot durable. El watcher y
clearInterval existen, pero transición vivo→cerrado, conservación de asistencia
final y reapertura tras modificar horario siguen sin automatización hasta definir
la política. No se añadió tarea de escritura de horario/habilitación sin respuesta.

## Consultas pendientes

1. Ventana en minutos de «próximo a comenzar».
2. Relación/regla para asignar habilitados pendientes a ambientes.
3. Cierre por fin calculado/estado y política al cambiar horario posteriormente.
4. Tratamiento del ingreso histórico al inhabilitar al alumno.
5. Confirmación de contadores globales frente a resultados filtrados.

Errores de red/reconexión, permisos por examen y concurrencia son escenarios
adicionales sin contrato confirmado; no se presentan como requisitos cubiertos.
No se modificó Laravel ni datos de desarrollo/producción. No se simulan respuestas
ni se cambian expectativas para hacer pasar incumplimientos.

## Ejecución completa comunicada por el usuario — resultado más reciente disponible

**29 ejecutados; 12 aprobados; 17 fallidos; 0 pendientes y 0 omitidos. Duración: 5 min 41 s.**

Fuente: resumen suministrado por el usuario, sin log completo ni fecha exacta de ejecución. Supera los antecedentes de ejecución bloqueada que figuran arriba. No permite identificar cada caso fallido ni atribuir causas.

| Archivo o área | Casos | Aprobados | Fallidos |
|---|---:|---:|---:|
| Acceso | 8 | 3 | 5 |
| Actualización | 3 | 0 | 3 |
| Búsqueda | 3 | 3 | 0 |
| Cierre | 2 | 2 | 0 |
| Listas | 10 | 2 | 8 |
| Selección | 3 | 2 | 1 |
| **Total** | **29** | **12** | **17** |

Clasificación causal pendiente de los bloques numerados de error y/o JSON Cypress. No se extrapolan resultados históricos o de inspección a esta ejecución.

## HU-13: títulos y resultados individuales de la ejecución aportada

**29 ejecutados: 12 aprobados y 17 fallidos; 0 pendientes y 0 omitidos. Duración total: 5 min 43 s.** Fuente: salida completa de Cypress compartida por el usuario. No se ejecutaron nuevas pruebas para preparar este detalle.

| Archivo | Ejecutados | Aprobados | Fallidos |
|---|---:|---:|---:|
| acceso.cy.ts | 8 | 3 | 5 |
| actualizacion.cy.ts | 3 | 0 | 3 |
| busqueda.cy.ts | 3 | 3 | 0 |
| cierre.cy.ts | 2 | 2 | 0 |
| listas.cy.ts | 10 | 2 | 8 |
| seleccion.cy.ts | 3 | 2 | 1 |
| **Total** | **29** | **12** | **17** |

### Aprobados: 12 casos

| N.º | Archivo | Título del caso |
|---:|---|---|
| 1 | `acceso.cy.ts` | HU13-01 personal de control de ingreso entra desde el menú |
| 2 | `acceso.cy.ts` | HU13-01 docente entra desde el menú |
| 3 | `acceso.cy.ts` | HU13-04 visitante no accede a URL ni consulta/actualización |
| 4 | `busqueda.cy.ts` | HU13-15 busca pendientes por nombre; caracteriza resumen global independiente del filtro |
| 5 | `busqueda.cy.ts` | HU13-15 busca pendientes por código; caracteriza resumen global independiente del filtro |
| 6 | `busqueda.cy.ts` | HU13-16 búsqueda sin resultados y limpieza recuperan los pendientes |
| 7 | `cierre.cy.ts` | HU13-19 examen finalizado por reloj PHP muestra cierre y asistencia existente |
| 8 | `cierre.cy.ts` | HU13-20 examen ya cerrado no refresca durante dos intervalos reales del polling |
| 9 | `listas.cy.ts` | HU13-10 listas y resumen coherentes con 0 de 4 ingresados |
| 10 | `listas.cy.ts` | HU13-11 inhabilitado y sin habilitación no aparecen en ninguna lista |
| 11 | `seleccion.cy.ts` | HU13-05 selecciona examen en curso y muestra su asistencia |
| 12 | `seleccion.cy.ts` | HU13-06 caracteriza catálogo que incluye futuro lejano sin ventana de próximo definida |

### Fallidos: 17 casos

| N.º | Archivo | Título del caso |
|---:|---|---|
| 1 | `acceso.cy.ts` | HU13-02 personal de control de ingreso consulta URL, JSON y refresco parcial |
| 2 | `acceso.cy.ts` | HU13-02 docente consulta URL, JSON y refresco parcial |
| 3 | `acceso.cy.ts` | HU13-01 administrador entra desde el menú |
| 4 | `acceso.cy.ts` | HU13-02 administrador consulta URL, JSON y refresco parcial |
| 5 | `acceso.cy.ts` | HU13-03 estudiante no accede por menú, URL o consulta/actualización |
| 6 | `actualizacion.cy.ts` | HU13-17 check-in independiente mueve pendiente a Norte HU13 sin recarga y conserva filtro |
| 7 | `actualizacion.cy.ts` | HU13-17 check-in independiente mueve pendiente a Sur HU13 sin recarga y conserva filtro |
| 8 | `actualizacion.cy.ts` | HU13-18 polling mantiene examen y filtro ante ingreso en otro examen |
| 9 | `listas.cy.ts` | HU13-08 agrupa ingresos reales por ambiente: Un ambiente HU13 |
| 10 | `listas.cy.ts` | HU13-09 exige ambas listas dentro de cada ambiente: Un ambiente HU13 |
| 11 | `listas.cy.ts` | HU13-08 agrupa ingresos reales por ambiente: Principal HU13 |
| 12 | `listas.cy.ts` | HU13-09 exige ambas listas dentro de cada ambiente: Principal HU13 |
| 13 | `listas.cy.ts` | HU13-10 listas y resumen coherentes con 2 de 4 ingresados |
| 14 | `listas.cy.ts` | HU13-10 listas y resumen coherentes con 4 de 4 ingresados |
| 15 | `listas.cy.ts` | HU13-12 ingreso de otro examen no altera pendientes ni resumen principal |
| 16 | `listas.cy.ts` | HU13-13 ingresados no se repiten entre ambientes y suman el total global |
| 17 | `seleccion.cy.ts` | HU13-07 cambiar examen sustituye listas, ambientes y contadores sin mezcla |

### Alcance de los errores aportados

- Diez fallos se detienen en helpers.ts:58 porque el epoch llega como string y la aserción exige número o fecha: actualización (3), listas (6) y selección (1). Esto no demuestra que fallen la actualización automática, los contadores o la separación de exámenes; las comprobaciones posteriores quedan bloqueadas.
- Cuatro casos de acceso reciben HTTP 409: tres esperaban 200 y el del estudiante esperaba 403. Hay que revisar el protocolo Inertia y los encabezados antes de atribuir un problema de autorización.
- El acceso desde el menú del administrador falla porque el centro del enlace está oculto. Falta distinguir layout de automatización.
- Dos HU13-09 no encuentran «Ingresaron» dentro de .ambiente-card. El error acredita esa ausencia en la comprobación, pero no permite concluir por sí solo toda la organización de listas o su causa.

La búsqueda y el cierre aprobaron sus escenarios. HU13-06 caracteriza el catálogo actual; no confirma una ventana temporal de «próximo a comenzar», aún sin definición. Los reintentos y las aserciones no alcanzadas no se cuentan como aprobados. El código de salida 17 comunica los 17 casos fallidos, no un fallo de contenedores.

## Reportes HU-13 basados en la salida completa

[CS33–CS36](../bug-reports/HU-13/README.md) agrupan los 17 fallos: diez comparaciones temporales con epoch string, cuatro consultas parciales con HTTP 409, un enlace oculto y dos comprobaciones de organización de listas por ambiente. El tipo del epoch y las consultas parciales se distinguen de incumplimientos funcionales; la definición de distribución de pendientes por ambiente sigue pendiente. No se modificaron Laravel ni tests.
