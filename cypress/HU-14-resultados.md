# HU-14 · resultados y pendientes

2026-10-11. [Análisis previo y matriz](HU-14-cobertura.md).
[Inventario estático](HU-14-inventario.json): **29 casos en 5 specs**.

| Suite | Casos | Nueva ejecución Cypress |
|---|---:|---|
| HU-14 | 29 | Bloqueada antes de iniciar |
| HU-13 | 29 | Bloqueada antes de iniciar |
| HU-12 | 59 | Bloqueada antes de iniciar |
| HU-11 | 44 | Bloqueada antes de iniciar |
| HU-10 | 31 | Bloqueada antes de iniciar |
| HU-9 | 58 | Bloqueada antes de iniciar |
| HU-15 | 10 | Bloqueada antes de iniciar |

**Cero casos ejecutados. Sin aprobados ni fallidos funcionales nuevos.** HU-15
conserva el antecedente histórico comunicado de 2 aprobados (04/10) y 8 fallidos.
No se certifica ausencia de regresiones mediante TypeScript o inventario.

## Verificaciones realizadas

- TypeScript completo de suites y configuración: salida 0 con
  `ELECTRON_RUN_AS_NODE=1 /usr/share/code/code node_modules/typescript/bin/tsc --project cypress/tsconfig.json`.
- Inventario: 29 títulos únicos, sin ejecutar callbacks ni simular backend.
- Selección de resets con rutas Linux/Windows, dependencias/lock, orden de las
  guardias y ausencia de escrituras explícitas en state-hu14: comprobación estática.
- Hashes de 204 archivos anteriores: sin cambios en fuentes Laravel inspeccionadas,
  suites/helpers previos, comandos, sesión independiente HU-13, Compose o AGENTS.
- Nuevas ramas reset-hu14/state-hu14 y whitelist. Ramas anteriores intactas.
  La compatibilidad runtime de los cambios compartidos sigue sin ejecución.

## Infraestructura

Primero se intentó `podman ps --filter name=income-e2e`. Después, secuencialmente,
los comandos Compose income-e2e para e2e:types y HU-14/13/12/11/10/9/15. Todos
terminaron con salida 1 antes de acceder a los servicios:

```
set sticky bit on: chmod /run/user/1000/libpod: read-only file system
```

No se pudo confirmar qué contenedores existen ni ejecutar PHP, PostgreSQL,
Cypress o las regresiones. No hay PHP en PATH del host: lint PHP y ejecución del
seed/consulta también pendientes. La política actual no permite solicitar
escalación; esta sesión no dispone de una terminal externa. README contiene
comandos para ejecutarlos desde una terminal normal dentro del proyecto E2E.

## Cobertura implementada

- Acceso desde listado→detalle para administrador y ambos docentes vinculados
  al examen compartido. Sección separada de las habilitaciones.
- Control, estudiante y visitante no asignan ni quitan por UI/URL/POST/DELETE.
  Antes del intento existe una relación real para comprobar que no desaparece.
- Catálogo exclusivo control y manipulación de otros roles rechazada por ambos
  roles autorizados. Vacío/inexistente y validación local separados como adicionales.
- Asignación válida por admin/docentes, varios miembros, coherencia de lista y
  selector, recarga y relación examen–usuario exacta en PostgreSQL.
- Consulta protegida de solo lectura con snapshots de usuarios/roles, exámenes,
  grupos/inscripciones, habilitaciones, ambientes, otras relaciones y registros.
  Comprueba que solo cambia examen_personal_control; no usa toast como prueba.
- Desasignación por admin/docente: conserva usuario y rol, login posterior,
  otros miembros del examen, relaciones del mismo usuario a otros exámenes y
  recarga. Vuelve a ofrecerlo en selector y permite reasignar con relación única.
- Fechas/horas distintas y detalles aislados; vacío y todos los controles asignados.

## Mensaje de duplicado: dónde se comprueba

El selector **oculta** al usuario ya asignado. La prueba no altera opciones de la
vista: reenvía POST real autenticado con CSRF. Controller devuelve 302 con errores
de sesión, no JSON 422. La siguiente consulta real Inertia al detalle, con versión
extraída del documento, debe mostrar `props.errors.id_usuario` exactamente:

> Este usuario ya está asignado a este examen

La UI tiene `.personal-error` para el callback onError de router.post. Una petición
cy.request no ejecuta ese callback: no se afirma que el texto sea visible en la
interfaz por ese reenvío. Se comprueba por separado error de sesión y una sola
relación persistida. Después se recarga y se comprueba lista/selector.

## Diferencias, fallos y pendientes

No se identificaron por inspección incumplimientos explícitos del texto HU-14;
**esto no significa que los casos hayan pasado**. Navegación, protocolo Inertia,
CSRF, mensajes, serialización y persistencia requieren ejecución real. Si la primera
aserción falla, las siguientes del mismo caso quedan no ejecutadas, nunca aprobadas.

Restricción docente: el listado muestra solo exámenes de sus grupos y las
habilitaciones se segmentan; la sección de personal es global al examen y los
endpoints solo validan rol. Se consultó resultado para un docente sin vínculo.
Los casos positivos no suponen autorización universal: usan grupos vinculados y
examen compartido. No se aplica automáticamente la política de habilitaciones a HU-14.

Solapamiento: HU no define restricción y el código no valida disponibilidad horaria
del personal. Se consultó si se desea cubrirlo y qué resultado se espera. Pendiente,
sin test que convierta una regla adicional en requisito confirmado.

No se inventó asignación por ambiente. No se modifica Laravel ni desarrollo/
producción, no se simulan respuestas y no se suavizan textos de aceptación.
No se acredita concurrencia mediante reenvíos secuenciales.

## Evidencia posterior: revisión del 13 de octubre de 2026

Se encontraron seis capturas Cypress `(failed).png` nuevas en `cypress/screenshots/`, fechadas entre las 23:19 y 23:22 del 13 de octubre, todas de HU-14. Confirman que hubo ejecución posterior a los bloqueos documentados. Los contadores visibles muestran además cuatro aprobados en acceso y cuatro en asignación: **al menos 14 casos alcanzados, con al menos 8 aprobados y 6 fallidos**. Son mínimos observados, no el resumen final de la suite de 29 casos. No se encontró un reporte final JSON/XML ni log de ejecución que permita determinar el total, los omitidos o resultados de otras suites.

Fallos con evidencia:

- HU14-03 control: no asigna ni quita por interfaz o endpoint.
- HU14-03 estudiante: no asigna ni quita por interfaz o endpoint.
- HU14-10 admin.e2e: mensaje exacto de duplicado mediante endpoint.
- HU14-10 docente1.hu14: mensaje exacto de duplicado mediante endpoint.
- HU14-11 admin.e2e: desasignación preserva usuario, rol y otras asignaciones.
- HU14-11 docente1.hu14: desasignación preserva usuario, rol y otras asignaciones.

Las capturas de HU14-03 y HU14-11 muestran un intento de `visit /login` que redirige al dashboard de la sesión vigente y luego busca `#identificador` inexistente allí. Esto apunta a un problema de cambio de sesión en la automatización; no prueba un incumplimiento de autorización o desasignación. HU14-10 se detiene en la comprobación del mensaje posterior al POST directo; la captura no permite concluir por sí sola la causa exacta.

Esta revisión no lanzó las suites. La consulta de contenedores desde este entorno sigue fallando por `/run/user/1000/libpod: read-only file system`. Los resúmenes anteriores de cero ejecutados describen los intentos previos y han quedado superados parcialmente por estas evidencias; no deben usarse como estado actual global.

## Ejecución completa comunicada por el usuario — resultado más reciente disponible

**29 ejecutados; 23 aprobados; 6 fallidos; 0 pendientes y 0 omitidos. Duración: 6 min 49 s.**

Fuente: resumen suministrado por el usuario, sin log completo ni fecha exacta de ejecución. Supera los antecedentes de ejecución bloqueada que figuran arriba. No permite identificar cada caso fallido ni atribuir causas.

| Archivo o área | Casos | Aprobados | Fallidos |
|---|---:|---:|---:|
| Acceso | 7 | 5 | 2 |
| Asignación | 6 | 4 | 2 |
| Desasignación | 4 | 2 | 2 |
| Estados | 2 | 2 | 0 |
| Selector | 10 | 10 | 0 |
| **Total** | **29** | **23** | **6** |

Clasificación causal pendiente de los bloques numerados de error y/o JSON Cypress. No se extrapolan resultados históricos o de inspección a esta ejecución.

## HU-14: títulos y resultados individuales de la ejecución aportada

**29 ejecutados: 25 aprobados y 4 fallidos; 0 pendientes y 0 omitidos. Duración total: 6 min 56 s.** Fuente: salida completa de Cypress compartida por el usuario. No se ejecutaron nuevas pruebas para preparar el detalle.

Esta salida sustituye el resumen previo de 23 aprobados y 6 fallidos. Los cuatro casos de desasignación aprobaron en esta ejecución; no se atribuye la mejora automáticamente a una corrección sin confirmar la revisión de código ejecutada.

| Archivo | Ejecutados | Aprobados | Fallidos |
|---|---:|---:|---:|
| acceso.cy.ts | 7 | 5 | 2 |
| asignacion.cy.ts | 6 | 4 | 2 |
| desasignacion.cy.ts | 4 | 4 | 0 |
| estados.cy.ts | 2 | 2 | 0 |
| selector.cy.ts | 10 | 10 | 0 |
| **Total** | **29** | **25** | **4** |

### Aprobados: 25 casos

| N.º | Archivo | Título del caso |
|---:|---|---|
| 1 | `acceso.cy.ts` | HU14-01 admin.e2e abre personal desde el detalle del examen compartido |
| 2 | `acceso.cy.ts` | HU14-01 docente1.hu14 abre personal desde el detalle del examen compartido |
| 3 | `acceso.cy.ts` | HU14-01 docente2.hu14 abre personal desde el detalle del examen compartido |
| 4 | `acceso.cy.ts` | HU14-02 sección de personal separada de las habilitaciones |
| 5 | `acceso.cy.ts` | HU14-03 visitante no asigna ni quita por interfaz o endpoint |
| 6 | `asignacion.cy.ts` | HU14-05 admin.e2e asigna y persiste tras recargar sin cambios laterales |
| 7 | `asignacion.cy.ts` | HU14-05 docente1.hu14 asigna y persiste tras recargar sin cambios laterales |
| 8 | `asignacion.cy.ts` | HU14-05 docente2.hu14 asigna y persiste tras recargar sin cambios laterales |
| 9 | `asignacion.cy.ts` | HU14-06 varios miembros permanecen asignados al mismo examen |
| 10 | `desasignacion.cy.ts` | HU14-11 admin.e2e quita solo la relación y preserva usuario, rol y otras asignaciones |
| 11 | `desasignacion.cy.ts` | HU14-11 docente1.hu14 quita solo la relación y preserva usuario, rol y otras asignaciones |
| 12 | `desasignacion.cy.ts` | HU14-12 quitar y volver a asignar no duplica relaciones |
| 13 | `desasignacion.cy.ts` | HU14-13 mismo miembro en exámenes con fechas/horas distintas y detalles aislados |
| 14 | `estados.cy.ts` | HU14-14 sección sin personal muestra estado vacío y candidatos |
| 15 | `estados.cy.ts` | HU14-15 al asignar todos no quedan opciones y registro se deshabilita |
| 16 | `selector.cy.ts` | HU14-04 selector ofrece exclusivamente el rol control |
| 17 | `selector.cy.ts` | HU14-07 admin.e2e no puede asignar id de administrador |
| 18 | `selector.cy.ts` | HU14-07 admin.e2e no puede asignar id de docente |
| 19 | `selector.cy.ts` | HU14-07 admin.e2e no puede asignar id de estudiante |
| 20 | `selector.cy.ts` | HU14-07 docente1.hu14 no puede asignar id de administrador |
| 21 | `selector.cy.ts` | HU14-07 docente1.hu14 no puede asignar id de docente |
| 22 | `selector.cy.ts` | HU14-07 docente1.hu14 no puede asignar id de estudiante |
| 23 | `selector.cy.ts` | HU14-08 adicional: selección vacía muestra validación local y no envía registro |
| 24 | `selector.cy.ts` | HU14-09 adicional: endpoint rechaza ID vacío |
| 25 | `selector.cy.ts` | HU14-09 adicional: endpoint rechaza ID inexistente |

### Fallidos: 4 casos

| N.º | Archivo | Título del caso |
|---:|---|---|
| 1 | `acceso.cy.ts` | HU14-03 control no asigna ni quita por interfaz o endpoint |
| 2 | `acceso.cy.ts` | HU14-03 estudiante no asigna ni quita por interfaz o endpoint |
| 3 | `asignacion.cy.ts` | HU14-10 admin.e2e recibe mensaje exacto de duplicado por endpoint aunque selector lo oculta |
| 4 | `asignacion.cy.ts` | HU14-10 docente1.hu14 recibe mensaje exacto de duplicado por endpoint aunque selector lo oculta |

### Alcance de los errores aportados

- HU14-03 control y estudiante: HTTP 419 en vez de 403. Obstáculo CSRF/sesión; no demuestra permiso de asignar o quitar. Faltan encabezados y diagnóstico para fijar causa.
- HU14-10 administrador y docente: `SyntaxError: "undefined" is not valid JSON` en helpers.ts:64 al leer la información de página. El mensaje exacto del rechazo no se alcanza a comprobar; no se demuestra que sea incorrecto.
- Los cuatro casos de desasignación aprobaron; el problema de sesión observado en capturas anteriores no se presenta como fallo de esta ejecución.

El código de salida 4 corresponde a cuatro casos fallidos, no a un fallo de contenedores. No se contabilizan las comprobaciones posteriores no alcanzadas como aprobadas.

## Reportes HU-14 actualizados con errores completos

[Reportes HU-14](../bug-reports/HU-14/README.md): CS2 actualizado documenta dos errores de JSON.parse en el helper, antes de comprobar el mensaje de duplicado; CS37 documenta dos respuestas 419 frente a 403 con causa pendiente. CS1 es un antecedente y no se cuenta entre los cuatro fallos actuales: desasignación aprobó todos sus casos. No se atribuyen fallos funcionales de autorización o duplicados a comprobaciones bloqueadas. No se modificaron Laravel ni tests.
