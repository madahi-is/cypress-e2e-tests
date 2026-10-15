# HU-12 · resultados, diferencias y pendientes

Fecha: 2026-10-10. [Análisis previo y matriz](HU-12-cobertura.md).
[Inventario estático](HU-12-inventario.json): **59 casos en 7 specs**.

| Suite | Casos | Nueva ejecución Cypress |
|---|---:|---|
| HU-12 | 59 | Bloqueada antes de iniciar |
| HU-11 | 44 | Bloqueada antes de iniciar |
| HU-10 | 31 | Bloqueada antes de iniciar |
| HU-9 | 58 | Bloqueada antes de iniciar |
| HU-15 | 10 | Bloqueada antes de iniciar |

**Cero casos ejecutados; sin resultados funcionales nuevos.** HU-15 conserva el
antecedente comunicado de 2 aprobados (04/10) y 8 fallidos, sin nueva ejecución.
No se certifica ausencia de regresiones por haber pasado TypeScript.

## Comprobaciones realizadas

- TypeScript completo: salida 0, incluidas HU-12 y todas las suites anteriores:
  `ELECTRON_RUN_AS_NODE=1 /usr/share/code/code node_modules/typescript/bin/tsc --project cypress/tsconfig.json`.
- Inventario de títulos/variantes: 59 nombres únicos. No ejecuta callbacks ni
  respuestas de backend; no es una ejecución E2E.
- Selección de reset verificada con rutas Linux y Windows para HU-15/9/10/11/12,
  incluida la rama vacía HU-12. Dependencias coinciden con lock.
- Guardias app_e2e/configuración/current_database anteriores a migrate; consulta
  state-hu12 sin operaciones de escritura explícitas, comprobadas estáticamente.
- Hashes de 185 archivos anteriores: sin cambios en fuentes Laravel inspeccionadas,
  specs y helpers anteriores, comandos ni Compose. Laravel conserva únicamente
  su modificación previa de package-lock.json según git status.
- Cambios compartidos: nuevas acciones en whitelist/configuración PHP y rama
  HU-12 en beforeEach; las ramas HU-9/10/11/15 y sus fixtures permanecen compatibles
  por inspección. Su compatibilidad real requiere las ejecuciones bloqueadas.

## Intentos e infraestructura

Primero se ejecutó `podman ps --filter name=income-e2e`. Después, por separado y
secuencialmente, comandos Compose para e2e:types, e2e:hu12, e2e:hu11, e2e:hu10,
e2e:hu9 y e2e:hu15. Todos salieron con código 1 antes de entrar en los servicios:

```
set sticky bit on: chmod /run/user/1000/libpod: read-only file system
```

No se pudo comprobar qué contenedores existen ni ejecutar PHP, PostgreSQL o
Cypress. No hay PHP en PATH del host; lint PHP, bootstrap Laravel, seed, lectura
del registro efectivo de rutas, CSRF, formatos de fecha, responsive y aserciones
persistidas siguen sin ejecución. La política actual impide solicitar escalación
del sandbox; esta sesión no tiene acceso a una terminal externa. Comandos preparados
en README para una terminal normal dentro del proyecto E2E.

## Cobertura y diferencias funcionales

- Estudiante opcional: no se exige mensaje vacío para él. Tres obligatorios
  comprueban el texto exacto por UI y endpoint, incluida descripción de espacios.
- Catálogo cerrado, búsqueda independiente código/documento/nombre, resultados
  vacíos, cancelación, registro con/sin estudiante y sin ingreso previo.
- Persistencia: ids de examen/estudiante nullable/usuario, tipo, texto y timestamp
  PostgreSQL entre lecturas PHP. Campos falsificados no sustituyen actor/hora.
  Recarga y tarjetas completas comprueban disponibilidad, no solo el toast.
- Inmutabilidad: ausencia acciones UI; inventario efectivo de rutas; PUT/PATCH/DELETE
  por los tres roles a colección real (405 esperado) y sonda de recurso ausente
  (404 esperado), con snapshots de BD después de cada intento. El registro efectivo
  no se afirma verificado mientras no se ejecute su tarea.
- Listado vacío y 26 fixtures para paginación, filtros individuales/combinados,
  limpieza, fechas sin coincidencias, conservación de filtros en links y UI.
- Móvil/tablet: listado, filtros y formulario, validación legible y acciones reales,
  ancho del documento/modal sin desbordamiento horizontal y persistencia.

**Hallazgo funcional por inspección, no fallo Cypress ejecutado:** la paginación
Vue usa un componente incompatible: links frente a currentPage/totalPages, sin
listener de change-page. HU12-18 y HU12-24 conservan la navegación requerida. Si
falla, segunda página y regreso por UI quedan no ejecutados; sus aserciones no
se cuentan como aprobadas. La comprobación de links backend en HU12-24 va antes
para conservar evidencia independiente de esa navegación.

StoreIncidenciaRequest no está conectado al controller: max:1000 y su mensaje
personalizado de tipo inválido no son validaciones activas. HU12-32 caracteriza
texto libre de 1001 caracteres; HU12-30/31 documentan relaciones inexistentes y
fechas invertidas como defensivos adicionales, no requisitos confirmados.

La migración permite cascade de examen y poner estudiante null al borrar otras
entidades. Se documenta riesgo de trazabilidad indirecta; no se agrega regla de
borrado de otras HU ni se modifica producción.

## Pendientes

- Confirmación solicitada: límites inclusivos del rango. HU12-23 caracteriza
  whereDate >=/<= del código; no acredita criterio confirmado mientras no haya
  respuesta. Incluye filas de 00:00:00 y 23:59:59 y consulta ambas páginas reales.
- Inconsistencia del enunciado: la dependencia HU-3 se denomina registro automático
  de ingreso, mientras ese flujo corresponde a HU-11 en las HU suministradas.
  Se documenta sin imponer ingreso previo a ninguna incidencia.
- Ejecutar PHP y las suites desde terminal con Podman. Los fallos funcionales previos
  de otras HU no son errores nuevos de automatización HU-12; la infraestructura
  impide actualmente distinguir fallos de ejecución dentro de esta nueva suite.

No se alteró Laravel, no se accedió a datos de desarrollo/producción y no se
sustituyeron respuestas. Un fallo de aserción bloquea lo posterior en ese caso;
no debe extrapolarse aprobación a comprobaciones que no llegaron a ejecutarse.

## Ejecución completa comunicada por el usuario — resultado más reciente disponible

**59 ejecutados; 35 aprobados; 24 fallidos; 0 pendientes y 0 omitidos. Duración: 14 min 23 s.**

Fuente: resumen suministrado por el usuario, sin log completo ni fecha exacta de ejecución. Supera los antecedentes de ejecución bloqueada que figuran arriba. No permite identificar cada caso fallido ni atribuir causas.

| Archivo o área | Casos | Aprobados | Fallidos |
|---|---:|---:|---:|
| Acceso | 8 | 3 | 5 |
| Defensivos | 5 | 4 | 1 |
| Inmutabilidad | 11 | 11 | 0 |
| Listado y filtros | 11 | 4 | 7 |
| Registro | 21 | 12 | 9 |
| Responsive | 2 | 0 | 2 |
| Vacío | 1 | 1 | 0 |
| **Total** | **59** | **35** | **24** |

Clasificación causal pendiente de los bloques numerados de error y/o JSON Cypress. No se extrapolan resultados históricos o de inspección a esta ejecución.

## HU-12: títulos y resultados individuales de la ejecución aportada

**59 ejecutados: 36 aprobados y 23 fallidos; 0 pendientes y 0 omitidos. Duración total: 15 min 21 s.** Fuente: salida completa compartida por el usuario. No se ejecutaron nuevas pruebas para preparar este documento.

Esta salida detallada sustituye el resumen previo de 35 aprobados y 24 fallidos (14 min 23 s). No se suman ambas cifras ni se asume que correspondan a la misma ejecución. El listado pasó 5 casos y falló 6, frente al resumen anterior de 4 y 7.

| Archivo | Ejecutados | Aprobados | Fallidos |
|---|---:|---:|---:|
| acceso.cy.ts | 8 | 3 | 5 |
| defensivos.cy.ts | 5 | 4 | 1 |
| inmutabilidad.cy.ts | 11 | 11 | 0 |
| listado.cy.ts | 11 | 5 | 6 |
| registro.cy.ts | 21 | 12 | 9 |
| responsive.cy.ts | 2 | 0 | 2 |
| vacio.cy.ts | 1 | 1 | 0 |
| **Total** | **59** | **36** | **23** |

### Aprobados: 36 casos

| N.º | Archivo | Título del caso |
|---:|---|---|
| 1 | `acceso.cy.ts` | HU12-01 personal de control de ingreso accede desde navegación |
| 2 | `acceso.cy.ts` | HU12-01 docente accede desde navegación |
| 3 | `acceso.cy.ts` | HU12-04 visitante no accede ni registra |
| 4 | `defensivos.cy.ts` | HU12-29 catálogo cerrado rechaza tipo externo por endpoint |
| 5 | `defensivos.cy.ts` | HU12-30 adicional: relación inexistente id_examen rechazada |
| 6 | `defensivos.cy.ts` | HU12-30 adicional: relación inexistente id_estudiante rechazada |
| 7 | `defensivos.cy.ts` | HU12-31 adicional: rango invertido rechazado por validación actual |
| 8 | `inmutabilidad.cy.ts` | HU12-25 tarjetas no ofrecen edición ni eliminación |
| 9 | `inmutabilidad.cy.ts` | HU12-26 registro real de rutas contiene solo índice y registro |
| 10 | `inmutabilidad.cy.ts` | HU12-27 personal de control de ingreso no modifica datos con PUT |
| 11 | `inmutabilidad.cy.ts` | HU12-27 personal de control de ingreso no modifica datos con PATCH |
| 12 | `inmutabilidad.cy.ts` | HU12-27 personal de control de ingreso no modifica datos con DELETE |
| 13 | `inmutabilidad.cy.ts` | HU12-27 docente no modifica datos con PUT |
| 14 | `inmutabilidad.cy.ts` | HU12-27 docente no modifica datos con PATCH |
| 15 | `inmutabilidad.cy.ts` | HU12-27 docente no modifica datos con DELETE |
| 16 | `inmutabilidad.cy.ts` | HU12-27 administrador no modifica datos con PUT |
| 17 | `inmutabilidad.cy.ts` | HU12-27 administrador no modifica datos con PATCH |
| 18 | `inmutabilidad.cy.ts` | HU12-27 administrador no modifica datos con DELETE |
| 19 | `listado.cy.ts` | HU12-19 filtro individual por rango |
| 20 | `listado.cy.ts` | HU12-20 filtros combinados restringen conjuntamente el resultado |
| 21 | `listado.cy.ts` | HU12-21 limpiar filtros recupera listado sin restricciones |
| 22 | `listado.cy.ts` | HU12-22 rango sin coincidencias muestra estado vacío |
| 23 | `listado.cy.ts` | HU12-23 caracteriza extremos inclusivos del rango implementado (pendiente de confirmación HU) |
| 24 | `registro.cy.ts` | HU12-08 búsqueda desconocida no ofrece estudiantes ni registra |
| 25 | `registro.cy.ts` | HU12-09 cambiar búsqueda limpia la asociación anterior |
| 26 | `registro.cy.ts` | HU12-10 id_examen vacío muestra mensaje obligatorio en UI |
| 27 | `registro.cy.ts` | HU12-11 endpoint rechaza id_examen vacío sin persistir |
| 28 | `registro.cy.ts` | HU12-10 tipo_incidencia vacío muestra mensaje obligatorio en UI |
| 29 | `registro.cy.ts` | HU12-11 endpoint rechaza tipo_incidencia vacío sin persistir |
| 30 | `registro.cy.ts` | HU12-10 descripcion_motivo vacío muestra mensaje obligatorio en UI |
| 31 | `registro.cy.ts` | HU12-11 endpoint rechaza descripcion_motivo vacío sin persistir |
| 32 | `registro.cy.ts` | HU12-12 UI rechaza descripción compuesta solo por espacios |
| 33 | `registro.cy.ts` | HU12-12 endpoint rechaza descripción compuesta solo por espacios |
| 34 | `registro.cy.ts` | HU12-13 cancelar el formulario no crea incidencia |
| 35 | `registro.cy.ts` | HU12-15 formulario no tiene controles para fecha, hora o reportante |
| 36 | `vacio.cy.ts` | HU12-17 listado vacío permite abrir registro |

### Fallidos: 23 casos

| N.º | Archivo | Título del caso |
|---:|---|---|
| 1 | `acceso.cy.ts` | HU12-02 personal de control de ingreso accede por URL y registra por endpoint |
| 2 | `acceso.cy.ts` | HU12-02 docente accede por URL y registra por endpoint |
| 3 | `acceso.cy.ts` | HU12-01 administrador accede desde navegación |
| 4 | `acceso.cy.ts` | HU12-02 administrador accede por URL y registra por endpoint |
| 5 | `acceso.cy.ts` | HU12-03 estudiante rechazado por navegación, URL y registro |
| 6 | `defensivos.cy.ts` | HU12-32 caracteriza texto largo sin límite max:1000 activo |
| 7 | `listado.cy.ts` | HU12-16 listado completo y recarga con estudiante |
| 8 | `listado.cy.ts` | HU12-16 listado completo y recarga sin estudiante |
| 9 | `listado.cy.ts` | HU12-18 navega entre páginas sin perder ni repetir incidencias |
| 10 | `listado.cy.ts` | HU12-19 filtro individual por examen |
| 11 | `listado.cy.ts` | HU12-19 filtro individual por tipo |
| 12 | `listado.cy.ts` | HU12-24 paginación mantiene filtros activos en backend y navegación UI |
| 13 | `registro.cy.ts` | HU12-05 registra Expulsión con estudiante sin ingreso previo |
| 14 | `registro.cy.ts` | HU12-05 registra Problema de identificación con estudiante sin ingreso previo |
| 15 | `registro.cy.ts` | HU12-05 registra Cambio de ambiente con estudiante sin ingreso previo |
| 16 | `registro.cy.ts` | HU12-05 registra Otro con estudiante sin ingreso previo |
| 17 | `registro.cy.ts` | HU12-06 registra incidencia sin estudiante y sin error obligatorio para él |
| 18 | `registro.cy.ts` | HU12-07 búsqueda por código asocia el estudiante correcto |
| 19 | `registro.cy.ts` | HU12-07 búsqueda por documento asocia el estudiante correcto |
| 20 | `registro.cy.ts` | HU12-07 búsqueda por nombre asocia el estudiante correcto |
| 21 | `registro.cy.ts` | HU12-14 el cliente no suplanta reportante ni fija fecha del servidor |
| 22 | `responsive.cy.ts` | HU12-28 listado, filtros y formulario utilizables en móvil |
| 23 | `responsive.cy.ts` | HU12-28 listado, filtros y formulario utilizables en tablet |

### Alcance de la evidencia

Quince fallos se detienen en la comparación temporal del helper porque el epoch llega como string (por ejemplo, «1792058193») y la aserción exige número o fecha. Esto identifica un problema de tipos de la verificación; no demuestra una hora incorrecta ni un fallo de registro. Las comprobaciones posteriores quedan no ejecutadas.

Los ocho fallos restantes son: enlace de navegación del administrador no interactuable (1), CSRF 419 frente a 403 (1), espera de petición de paginación no observada (1), filtrado por examen/tipo y tablet con 15 resultados frente a 2 esperados (3), discrepancia de resultados al paginar con filtros (1) y desbordamiento móvil de 418 px frente a viewport de 390 px (1). No se atribuye una causa común sin diagnóstico.

El código de salida 23 comunica los 23 casos fallidos, no un fallo de contenedores. «Pendiente de confirmación HU» dentro del título HU12-23 describe la política de límites de fechas: el caso se ejecutó y aprobó, no quedó Pending de Cypress.

## Reportes HU-12 basados en la salida detallada

[CS26–CS32](../bug-reports/HU-12/README.md) agrupan los 23 fallos: 15 por epoch string en la aserción temporal y ocho por navegación, CSRF, paginación, resultados de filtros y desbordamiento móvil. Las causas pendientes no se convierten en defectos confirmados. No se modificó código de producción, tests ni expectativas.
