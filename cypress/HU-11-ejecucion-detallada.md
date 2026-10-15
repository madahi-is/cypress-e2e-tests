# HU-11 — ejecución detallada

## HU-11: títulos y resultados individuales de la ejecución aportada

**44 ejecutados: 10 aprobados y 34 fallidos; 0 pendientes y 0 omitidos. Duración: 8 min 40 s.** Fuente: fragmento de salida y resumen final de Cypress aportados por el usuario. No se reejecutó la suite.

El fragmento comienza en el tercer archivo. Faltan los bloques de acceso.cy.ts y confirmacion.cy.ts. El resumen acredita que los cinco casos de confirmación fallaron, por lo que se pueden identificar sus títulos mediante el inventario; no se conocen sus errores. Para acceso solo consta 2 aprobados y 6 fallidos: no se puede determinar cuáles de sus ocho títulos corresponden a cada estado.

| Archivo | Ejecutados | Aprobados | Fallidos | Duración del resumen |
|---|---:|---:|---:|---|
| acceso.cy.ts | 8 | 2 | 6 | 01:32 |
| confirmacion.cy.ts | 5 | 0 | 5 | 01:04 |
| defensivos.cy.ts | 10 | 4 | 6 | 01:38 |
| duplicados.cy.ts | 6 | 2 | 4 | 01:13 |
| responsive.cy.ts | 2 | 0 | 2 | 00:27 |
| seleccion.cy.ts | 4 | 2 | 2 | 00:42 |
| verificacion.cy.ts | 9 | 0 | 9 | 02:01 |
| **Total** | **44** | **10** | **34** | **08:40** |

### Aprobados identificados por título: 8 de 10

| N.º | Archivo | Título del caso |
|---:|---|---|
| 1 | `defensivos.cy.ts` | HU11-23 validar exige id_examen |
| 2 | `defensivos.cy.ts` | HU11-23 validar exige dato_estudiante |
| 3 | `defensivos.cy.ts` | HU11-24 guardar exige id_estudiante |
| 4 | `defensivos.cy.ts` | HU11-24 guardar exige id_examen_ambiente |
| 5 | `duplicados.cy.ts` | HU11-19 reenvío secuencial directo en el mismo ambiente conserva un registro |
| 6 | `duplicados.cy.ts` | HU11-19 reenvío secuencial directo en otro ambiente conserva un registro |
| 7 | `seleccion.cy.ts` | HU11-05 · examen y ambiente obligatorios antes de identificar |
| 8 | `seleccion.cy.ts` | HU11-08 · examen sin ambientes no permite iniciar |

### Fallidos identificados por título: 28 de 34

| N.º | Archivo | Título del caso |
|---:|---|---|
| 1 | `confirmacion.cy.ts` | HU11-13 muestra identidad y foto sin registrar ni permitir editar la hora |
| 2 | `confirmacion.cy.ts` | HU11-14 cancelar no registra y permite buscar otro estudiante |
| 3 | `confirmacion.cy.ts` | HU11-15 confirmar persiste todas las relaciones y la hora del servidor |
| 4 | `confirmacion.cy.ts` | HU11-16 el cliente no puede imponer hora ni usuario |
| 5 | `confirmacion.cy.ts` | HU11-17 registra dos estudiantes sin recargar ni perder examen y ambiente |
| 6 | `defensivos.cy.ts` | HU11-12 guardado directo rechaza estudiante no habilitado: Carla |
| 7 | `defensivos.cy.ts` | HU11-12 guardado directo rechaza estudiante no habilitado: Diego |
| 8 | `defensivos.cy.ts` | HU11-12 guardado directo rechaza estudiante no habilitado: Gina |
| 9 | `defensivos.cy.ts` | HU11-12 guardado directo rechaza estudiante no habilitado: Elena |
| 10 | `defensivos.cy.ts` | HU11-12 guardado directo rechaza estudiante no habilitado: Fabio |
| 11 | `defensivos.cy.ts` | HU11-25 ambiente de examen inexistente se rechaza como entrada inválida |
| 12 | `duplicados.cy.ts` | HU11-18 rechaza segundo ingreso en el mismo ambiente |
| 13 | `duplicados.cy.ts` | HU11-18 rechaza segundo ingreso en otro ambiente |
| 14 | `duplicados.cy.ts` | HU11-20 el endpoint directo devuelve el mensaje exigido con hora previa |
| 15 | `duplicados.cy.ts` | HU11-21 permite al mismo estudiante ingresar en otro examen habilitado |
| 16 | `responsive.cy.ts` | HU11-22 flujo completo usable en móvil |
| 17 | `responsive.cy.ts` | HU11-22 flujo completo usable en tablet |
| 18 | `seleccion.cy.ts` | HU11-06 · las opciones de ambiente corresponden exclusivamente al examen elegido |
| 19 | `seleccion.cy.ts` | HU11-07 · cambiar examen limpia la selección incompatible de ambiente |
| 20 | `verificacion.cy.ts` | HU11-09 código · resuelve al mismo estudiante sin ingreso previo |
| 21 | `verificacion.cy.ts` | HU11-09 documento · resuelve al mismo estudiante sin ingreso previo |
| 22 | `verificacion.cy.ts` | HU11-09 QR · resuelve al mismo estudiante sin ingreso previo |
| 23 | `verificacion.cy.ts` | HU11-10 · dato desconocido muestra el mensaje exacto y no escribe |
| 24 | `verificacion.cy.ts` | HU11-11 Carla · rechaza habilitación inválida y no crea ingreso |
| 25 | `verificacion.cy.ts` | HU11-11 Diego · rechaza habilitación inválida y no crea ingreso |
| 26 | `verificacion.cy.ts` | HU11-11 Gina · rechaza habilitación inválida y no crea ingreso |
| 27 | `verificacion.cy.ts` | HU11-11 Elena · rechaza habilitación inválida y no crea ingreso |
| 28 | `verificacion.cy.ts` | HU11-11 Fabio · rechaza habilitación inválida y no crea ingreso |

### Acceso: 8 títulos sin asignación individual (2 aprobaron y 6 fallaron)

| N.º | Archivo | Título del caso |
|---:|---|---|
| 1 | `acceso.cy.ts` | HU11-01 personal de control de ingreso · tiene acceso al módulo por el menú |
| 2 | `acceso.cy.ts` | HU11-02 personal de control de ingreso · URL y endpoints permiten verificar y guardar con el actor correcto |
| 3 | `acceso.cy.ts` | HU11-01 docente · tiene acceso al módulo por el menú |
| 4 | `acceso.cy.ts` | HU11-02 docente · URL y endpoints permiten verificar y guardar con el actor correcto |
| 5 | `acceso.cy.ts` | HU11-01 administrador · tiene acceso al módulo por el menú |
| 6 | `acceso.cy.ts` | HU11-02 administrador · URL y endpoints permiten verificar y guardar con el actor correcto |
| 7 | `acceso.cy.ts` | HU11-03 · estudiante no accede por menú, URL ni endpoints |
| 8 | `acceso.cy.ts` | HU11-04 · visitante no accede ni registra ingresos |

### Alcance de la evidencia de errores

- HU11-12 (cinco estudiantes): HTTP 200 en lugar de 403; la aserción se detuvo antes de la verificación de persistencia. No se afirma que se haya creado un ingreso solo por el estado HTTP.
- HU11-25: HTTP 500 en lugar de 422 para ambiente inexistente.
- HU11-18 (dos variantes), HU11-21, HU11-22 (móvil/tablet), HU11-07 y los nueve casos de verificación: 15 fallos muestran `cy.subjectChain is not a function` en el runner. No demuestran 15 incumplimientos funcionales; la causa técnica exacta requiere investigación.
- HU11-20: mensaje recibido «Registro duplicado detectado.» en lugar de «Este estudiante ya registró su ingreso a este examen a las 05:40». La hora corresponde a esa ejecución, no es un valor fijo del requisito.
- HU11-06: opciones observadas [] frente a IDs esperados [1, 2]. Falta determinar si la causa está en datos, sincronización o aplicación.
- Confirmación: cinco fallos identificados por archivo sin errores individuales aportados.
- Acceso: seis fallos sin títulos ni errores individuales identificables en el fragmento.

El código de salida 34 transmite los 34 casos fallidos; no acredita un fallo de contenedores. Los casos pendientes de asignar a un resultado individual no son casos Pending o Skipped de Cypress.

### Evidencia pendiente

Compartir la parte inicial de la ejecución: los ocho títulos con sus marcas de resultado de acceso.cy.ts y sus seis bloques de error; además los cinco bloques de error de confirmacion.cy.ts. No hace falta repetir la suite.
