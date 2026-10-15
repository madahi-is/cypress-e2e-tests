# HU-9 · resultados y pendientes

Fecha: 2026-10-10. Instancia prevista: income-e2e, app_e2e, puerto 8082.

## Resultado verificable

**TypeScript pasó** para la configuración, soporte, HU-9 y HU-15, sin errores.
El host no tiene Node/npm/PHP en PATH. Se usó el runtime Node de VS Code con las
 dependencias existentes de este proyecto (no se instalaron en Laravel):

```bash
ELECTRON_RUN_AS_NODE=1 /usr/share/code/code node_modules/typescript/bin/tsc --project cypress/tsconfig.json
```

El inventario estático registra **58 casos HU-9** independientes, con nombres
únicos. Esto no ejecuta callbacks de tests ni prueba el comportamiento del servidor.
Detalle: [HU-9-inventario.json](HU-9-inventario.json).

| Spec | Casos | Resultado funcional nuevo |
|---|---:|---|
| acceso.cy.ts | 5 | No ejecutados: infraestructura bloqueada |
| gestion.cy.ts | 11 | No ejecutados: infraestructura bloqueada |
| listado.cy.ts | 10 | No ejecutados: infraestructura bloqueada |
| registro.cy.ts | 32 | No ejecutados: infraestructura bloqueada |

Compose conserva income-e2e, app_e2e, puerto 8082 y Laravel montado en solo lectura.
Se verificaron estos valores leyendo YAML; no se validó su arranque en Podman.

## Infraestructura

Se intentó primero consultar contenedores con:

```bash
podman ps -a --filter name=income-e2e --format '{{.Names}} {{.Status}}'
```

Luego se intentaron los tres comandos de verificación desde el proyecto E2E:

```bash
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:types'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu9'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu15'
```

Todos fallaron antes de iniciar el proceso de contenedor:
`set sticky bit on: chmod /run/user/1000/libpod: read-only file system`.
Esta sesión mantiene sandbox_approval=false; la escalación ya fue rechazada en
la verificación anterior. No existe acceso desde aquí a una terminal externa.
No se restauró ni escribió ninguna base en estos intentos.

**No hay casos aprobados/fallidos nuevos de HU-9 o HU-15.** Tampoco se pudo
validar el helper PHP en ejecución ni ejecutar php -l por falta de PHP local y
acceso a Podman. La instalación/imagen/build Vite siguen sin verificación nueva.

## Compatibilidad HU-15

- Los cuatro specs HU-15 conservan sus SHA-256 previos a esta tarea.
- `reset`/`state` conservan los datos y claves students/examen/ambiente originales.
- Los datos adicionales solo se crean en `reset-hu9`; únicamente specs bajo
  HU-9 seleccionan ese reset. HU-15 no recibe docentes, grupos ni inscripciones.
- Se mantuvo `e2e:run` para HU-15 y se añadieron scripts explícitos por suite.
- TypeScript comprueba ambas suites. La ausencia de regresiones funcionales
  queda **pendiente de ejecución**: no se deduce de las comprobaciones estáticas.
- Línea base histórica HU-15: 2 aprobados (04/10), 8 fallidos, del 2026-10-05.
  Esta línea base no es un resultado de hoy.

## Cobertura y límites

Cada caso restaura sus propios datos; los negativos usan snapshots para detectar
mutaciones, incluidos borrados en cascada. No hay mocks de éxito de backend.
El formato 2026-2 y los mensajes de aceptación se conservan aunque difieran del
código. Los casos terminan en su primer fallo: las comprobaciones posteriores no
alcanzadas no cuentan como aprobadas.

Fixtures semestrales insertados en app_e2e permiten evaluar filtros, paginación,
reasignación y eliminación independientemente del defecto del alta. Esto no
presenta el alta de esos fixtures como aprobada por el servidor.

La matriz previa cubre todos los criterios explícitos y los escenarios necesarios:
[HU-9-cobertura.md](HU-9-cobertura.md). Sus diferencias son hallazgos por inspección,
no fallos certificados por una ejecución E2E.

Pendientes de aclaración: formatos/periodos adicionales de Gestión («o similar»)
y eliminación de examen_grupo sin inscritos. Esos escenarios no tienen tests con
expectativas supuestas ni se presentan como cubiertos. Las restricciones extra
sobre duplicidad de inscripciones en distintos grupos requieren su propia HU;
HU-9 cubre aquí acceso, inscripción/baja básica y su efecto sobre eliminación.

## Continuar en una terminal con acceso a Podman

Seguir primero el arranque/instalación del [README principal](../README.md),
luego ejecutar las dos suites **secuencialmente**, nunca en paralelo:

```bash
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:types'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu9'
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:hu15'
```

Ejecutar HU-15 aunque HU-9 retorne un código de fallo, para obtener la comparación.
Capturas de fallos: cypress/screenshots (ignoradas por Git).

## Ejecución completa comunicada por el usuario — resultado más reciente disponible

**58 ejecutados; 38 aprobados; 20 fallidos; 0 pendientes y 0 omitidos. Duración: ≈13 min.**

Fuente: resumen suministrado por el usuario, sin log completo ni fecha exacta de ejecución. Supera los antecedentes de ejecución bloqueada que figuran arriba. No permite identificar cada caso fallido ni atribuir causas.

| Archivo o área | Casos | Aprobados | Fallidos |
|---|---:|---:|---:|
| acceso.cy.ts | 5 | 2 | 3 |
| gestion.cy.ts | 11 | 8 | 3 |
| listado.cy.ts | 10 | 10 | 0 |
| registro.cy.ts | 32 | 18 | 14 |
| **Total** | **58** | **38** | **20** |

Clasificación causal pendiente de los bloques numerados de error y/o JSON Cypress. No se extrapolan resultados históricos o de inspección a esta ejecución.

## HU-9: títulos y resultados individuales de la ejecución aportada

Fuente: salida completa de Cypress compartida por el usuario. **58 ejecutados: 38 aprobados y 20 fallidos; 0 pendientes y 0 omitidos. Duración total: 12 min 35 s.** No se ejecutaron pruebas nuevas para preparar esta tabla.

| Archivo | Ejecutados | Aprobados | Fallidos |
|---|---:|---:|---:|
| acceso.cy.ts | 5 | 2 | 3 |
| gestion.cy.ts | 11 | 8 | 3 |
| listado.cy.ts | 10 | 10 | 0 |
| registro.cy.ts | 32 | 18 | 14 |
| **Total** | **58** | **38** | **20** |

### Aprobados: 38 casos

| N.º | Archivo | Título del caso |
|---:|---|---|
| 1 | `acceso.cy.ts` | HU09-01 · administrador accede desde menú y al detalle de inscritos |
| 2 | `acceso.cy.ts` | HU09-03 · anónimo no accede al módulo ni escribe datos |
| 3 | `gestion.cy.ts` | HU09-24 · reasigna docente y persiste sin alterar grupo ni relaciones |
| 4 | `gestion.cy.ts` | HU09-25 UI · exige seleccionar docente al reasignar |
| 5 | `gestion.cy.ts` | HU09-25 ausente · rechaza reasignación inválida sin cambios |
| 6 | `gestion.cy.ts` | HU09-25 inexistente · rechaza reasignación inválida sin cambios |
| 7 | `gestion.cy.ts` | HU09-26 · elimina un grupo libre y persiste la baja |
| 8 | `gestion.cy.ts` | HU09-27 · UI bloquea eliminar grupo con inscrito y muestra mensaje exacto |
| 9 | `gestion.cy.ts` | HU09-28 · UI protege grupo cuyos inscritos se relacionan con examen |
| 10 | `gestion.cy.ts` | HU09-30 · inscribir bloquea eliminación; dar de baja permite eliminar grupo libre |
| 11 | `listado.cy.ts` | HU09-16 · muestra asignatura, nombre de grupo, Gestión y docente reales |
| 12 | `listado.cy.ts` | HU09-17 · recorre todas las páginas sin omisiones ni duplicados y permite volver |
| 13 | `listado.cy.ts` | HU09-18 · filtra solo por Asignatura y conserva el filtro al recargar |
| 14 | `listado.cy.ts` | HU09-19 · filtra solo por Gestión y conserva el filtro al recargar |
| 15 | `listado.cy.ts` | HU09-20 · aplica ambos filtros y los mantiene entre páginas |
| 16 | `listado.cy.ts` | HU09-21 · combinación sin coincidencias muestra lista vacía |
| 17 | `listado.cy.ts` | HU09-22 · limpiar restaura ambos filtros y el listado completo |
| 18 | `listado.cy.ts` | HU09-23 asignatura inexistente · rechaza filtros inválidos en servidor |
| 19 | `listado.cy.ts` | HU09-23 asignatura texto · rechaza filtros inválidos en servidor |
| 20 | `listado.cy.ts` | HU09-23 gestion larga · rechaza filtros inválidos en servidor |
| 21 | `registro.cy.ts` | HU09-06 · UI exige todos los campos y no escribe el formulario vacío |
| 22 | `registro.cy.ts` | HU09-07 id_asignatura · servidor rechaza campo obligatorio ausente |
| 23 | `registro.cy.ts` | HU09-07 id_usuario · servidor rechaza campo obligatorio ausente |
| 24 | `registro.cy.ts` | HU09-07 gestion · servidor rechaza campo obligatorio ausente |
| 25 | `registro.cy.ts` | HU09-07 nombre_grupo · servidor rechaza campo obligatorio ausente |
| 26 | `registro.cy.ts` | HU09-08 abc · Gestión malformada rechazada en UI y servidor |
| 27 | `registro.cy.ts` | HU09-08 26-2 · Gestión malformada rechazada en UI y servidor |
| 28 | `registro.cy.ts` | HU09-09 · listas de alta y reasignación incluyen exclusivamente los docentes |
| 29 | `registro.cy.ts` | HU09-10 POST administrador · rechaza asignar usuario que no es docente |
| 30 | `registro.cy.ts` | HU09-10 PATCH administrador · rechaza asignar usuario que no es docente |
| 31 | `registro.cy.ts` | HU09-10 POST personal de control de ingreso · rechaza asignar usuario que no es docente |
| 32 | `registro.cy.ts` | HU09-10 PATCH personal de control de ingreso · rechaza asignar usuario que no es docente |
| 33 | `registro.cy.ts` | HU09-10 POST estudiante · rechaza asignar usuario que no es docente |
| 34 | `registro.cy.ts` | HU09-10 PATCH estudiante · rechaza asignar usuario que no es docente |
| 35 | `registro.cy.ts` | HU09-11 id_asignatura inexistente · valida referencia y tipo |
| 36 | `registro.cy.ts` | HU09-11 id_usuario inexistente · valida referencia y tipo |
| 37 | `registro.cy.ts` | HU09-15 51 · límite actual del nombre y blancos |
| 38 | `registro.cy.ts` | HU09-15 0 · límite actual del nombre y blancos |

### Fallidos: 20 casos

| N.º | Archivo | Título del caso |
|---:|---|---|
| 1 | `acceso.cy.ts` | HU09-02 docente · sin menú, URL ni ninguna escritura de grupos/inscripciones |
| 2 | `acceso.cy.ts` | HU09-02 control · sin menú, URL ni ninguna escritura de grupos/inscripciones |
| 3 | `acceso.cy.ts` | HU09-02 estudiante · sin menú, URL ni ninguna escritura de grupos/inscripciones |
| 4 | `gestion.cy.ts` | HU09-25 texto · rechaza reasignación inválida sin cambios |
| 5 | `gestion.cy.ts` | HU09-29 B · DELETE directo preserva inscripciones y exámenes asociados |
| 6 | `gestion.cy.ts` | HU09-29 C · DELETE directo preserva inscripciones y exámenes asociados |
| 7 | `registro.cy.ts` | HU09-04 A · registra por UI con Gestión 2026-2 y persiste |
| 8 | `registro.cy.ts` | HU09-04 B · registra por UI con Gestión 2026-2 y persiste |
| 9 | `registro.cy.ts` | HU09-04 1A · registra por UI con Gestión 2026-2 y persiste |
| 10 | `registro.cy.ts` | HU09-04 14 · registra por UI con Gestión 2026-2 y persiste |
| 11 | `registro.cy.ts` | HU09-05 · servidor acepta Gestión semestral sin depender de validación UI |
| 12 | `registro.cy.ts` | HU09-11 id_asignatura texto · valida referencia y tipo |
| 13 | `registro.cy.ts` | HU09-11 id_usuario texto · valida referencia y tipo |
| 14 | `registro.cy.ts` | HU09-12 docente1.e2e · rechaza triple duplicada con mensaje exacto de HU |
| 15 | `registro.cy.ts` | HU09-12 docente2.e2e · rechaza triple duplicada con mensaje exacto de HU |
| 16 | `registro.cy.ts` | HU09-13 · UI muestra el mensaje exacto de triple duplicada |
| 17 | `registro.cy.ts` | HU09-14 nombre · permite otra combinación y varios grupos del mismo docente |
| 18 | `registro.cy.ts` | HU09-14 asignatura · permite otra combinación y varios grupos del mismo docente |
| 19 | `registro.cy.ts` | HU09-14 gestion · permite otra combinación y varios grupos del mismo docente |
| 20 | `registro.cy.ts` | HU09-15 50 · límite actual del nombre y blancos |

### Alcance de los fallos

Los tres fallos de acceso recibieron 419 en lugar de 403; por sí solos no demuestran acceso indebido. Los dos HU09-29 se detuvieron por un GET Inertia con HTTP 409, antes de completar sus comprobaciones. Tres validaciones de IDs con texto devolvieron 500 en lugar de 422. Dos casos de duplicados evidencian diferencia entre «gestion» y «gestión». Los demás errores se conservan como observaciones de ejecución, sin atribuir automáticamente una causa común ni contar cada caso como un bug distinto.

La advertencia de deprecación de Electron no impidió terminar la suite. El código de salida 20 representa los 20 casos fallidos.
