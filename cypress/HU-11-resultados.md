# HU-11 · resultados y pendientes

Fecha: 2026-10-10. [Matriz y diferencias previas](HU-11-cobertura.md).
[Inventario estático](HU-11-inventario.json): 44 casos independientes en 7 specs.

| Suite | Casos | Ejecución nueva |
|---|---:|---|
| HU-11 | 44 | Bloqueada antes de Cypress |
| HU-10 | 31 | Bloqueada antes de Cypress |
| HU-9 | 58 | Bloqueada antes de Cypress |
| HU-15 | 10 | Bloqueada antes de Cypress |

No hay aprobados ni fallidos nuevos de Cypress: cero casos ejecutados. HU-15
mantiene el antecedente comunicado de 2 aprobados (04/10) y 8 fallidos, que no
constituye una nueva regresión ejecutada.

## Comprobaciones realizadas

- TypeScript de todas las suites: código de salida 0 con
  `ELECTRON_RUN_AS_NODE=1 /usr/share/code/code node_modules/typescript/bin/tsc --project cypress/tsconfig.json`.
- Inventario: registra los títulos y variantes sin ejecutar sus callbacks. No
  simula backend ni certifica que los casos funcionen en el navegador.
- Comparación SHA-256 de 176 archivos previos: sin cambios en suites/helpers
  HU-9/HU-10/HU-15, comandos compartidos, Compose ni fuentes Laravel inspeccionadas.
- El estado Git de Laravel sigue con el cambio previo en package-lock.json.
- El reset compartido mantiene las ramas anteriores y añade exclusivamente
  reset-hu11. state-hu11 solo consulta datos, después de comprobar configuración
  pgsql/app_e2e y current_database(). No ejecuta migraciones ni seed.
- Foto: fixture real copiado únicamente al volumen E2E de storage; el helper
  exige /var/www y no copia al storage del proyecto original.
- Los ingresos se comprueban con relaciones, usuario, cantidad y timestamp de
  PostgreSQL entre dos lecturas del reloj PHP. No se usa cy.clock ni se toma
  el mensaje de éxito como evidencia de persistencia.

## Infraestructura

Primero se intentó `podman ps --filter name=income-e2e`; después los comandos
Compose del README para HU-11, TypeScript, HU-10, HU-9 y HU-15, secuencialmente.
Todos terminaron con salida 1 antes de acceder a los servicios:

```
set sticky bit on: chmod /run/user/1000/libpod: read-only file system
```

No se pudo comprobar el estado de los contenedores. La política actual de esta
sesión rechaza escalaciones del sandbox; no puede solicitar su aprobación ni
operar una terminal normal externa. Los comandos del README quedan preparados
para ejecutarse desde una terminal normal en este proyecto.

PHP no está disponible en el host: quedan pendientes lint PHP, ejecución del
seed/consulta, comprobación de fotos, flujo responsive y regresiones reales.
El aprobado de TypeScript no verifica esas operaciones.

## Diferencias funcionales identificadas por inspección

Estos son hallazgos del código, **no resultados ejecutados**:

- Menú solo para control: HU11-01 docente/administrador conserva acceso esperado.
- Guardado sin comprobación de habilitación: HU11-12 exige rechazo también por
  endpoint; comprobar UI no cubre este bypass.
- Motivo vacío devuelve cadena vacía y UI mensaje genérico: HU11-11 Gina mantiene
  el mensaje predeterminado de la HU.
- Guardado duplicado usa «Registro duplicado detectado.»: HU11-20 mantiene el
  mensaje con hora; HU11-19 comprueba por separado protección y persistencia.
- Pivot inexistente puede generar error del servidor: HU11-25 es defensivo;
  422 es el contrato de validación esperado por esta prueba, no un código HTTP
  especificado por HU-11.
- Unique por estudiante/pivot: riesgo de concurrencia entre ambientes del mismo
  examen. Solo se implementaron reenvíos secuenciales; no se acredita concurrencia.

Un fallo en una aserción puede bloquear las comprobaciones posteriores del mismo
caso. Esas comprobaciones no deben contarse como aprobadas. En particular, los
casos con mensajes incorrectos no acreditan su resto del flujo automáticamente.
No se cambiaron producción ni expectativas para convertirlos en aprobados.

## Pendientes de definición

Se consultó la política ante cambio de habilitación entre búsqueda y confirmación,
y ante un examen declarado incompatible con el pivot enviado. No se implementan
estos escenarios adicionales como criterios confirmados sin respuesta. La
prohibición explícita de ingreso no habilitado desde el inicio sí está cubierta.

## Ejecución completa comunicada por el usuario — resultado más reciente disponible

**44 ejecutados; 10 aprobados; 34 fallidos; 0 pendientes y 0 omitidos. Duración: 8 min 42 s.**

Fuente: resumen suministrado por el usuario, sin log completo ni fecha exacta de ejecución. Supera los antecedentes de ejecución bloqueada que figuran arriba. No permite identificar cada caso fallido ni atribuir causas.

| Archivo o área | Casos | Aprobados | Fallidos |
|---|---:|---:|---:|
| Acceso | 8 | 2 | 6 |
| Confirmación | 5 | 0 | 5 |
| Defensivos | 10 | 4 | 6 |
| Duplicados | 6 | 2 | 4 |
| Responsive | 2 | 0 | 2 |
| Selección | 4 | 2 | 2 |
| Verificación | 9 | 0 | 9 |
| **Total** | **44** | **10** | **34** |

Clasificación causal pendiente de los bloques numerados de error y/o JSON Cypress. No se extrapolan resultados históricos o de inspección a esta ejecución.

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

## Reportes HU-11 basados en errores aportados

[CS21–CS25](../bug-reports/HU-11/README.md) agrupan 23 fallos con bloques de error: cinco respuestas 200 sin habilitación válida, un 500 para ambiente inexistente, un mensaje de duplicado incorrecto, quince TypeError del runner y un selector sin opciones esperadas. Faltan once errores: seis de acceso y cinco de confirmación. No se afirma persistencia indebida a partir de HTTP 200 ni se convierten errores del runner en incumplimientos funcionales. La inspección de store confirma que falta revalidar habilitación antes de crear; la BD de esa ejecución no fue comprobada tras el fallo.
