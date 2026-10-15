# Informe de pruebas automatizadas E2E

## Resultado de la ejecución completa comunicada por el usuario

Fuente: resúmenes de Cypress proporcionados por el usuario tras ejecutar HU-9 a HU-15 desde una terminal normal. La fecha/hora exacta, navegador, versión de código y salida completa de esa ejecución no fueron aportados. Los totales son resultados comunicados; no se presentan como una ejecución realizada por este agente.

**308 casos implementados y ejecutados: 176 aprobados (57,14 %) y 132 fallidos (42,86 %). Sin pendientes ni omitidos.**

| Suite | Implementados | Ejecutados | Aprobados | Fallidos | Pendientes | Omitidos | Duración |
|---|---:|---:|---:|---:|---:|---:|---|
| HU-9 | 58 | 58 | 38 | 20 | 0 | 0 | 12 min 35 s |
| HU-10 | 31 | 31 | 24 | 7 | 0 | 0 | 6 min 17 s |
| HU-11 | 44 | 44 | 10 | 34 | 0 | 0 | 8 min 40 s |
| HU-12 | 59 | 59 | 36 | 23 | 0 | 0 | 15 min 21 s |
| HU-13 | 29 | 29 | 12 | 17 | 0 | 0 | 5 min 43 s |
| HU-14 | 29 | 29 | 25 | 4 | 0 | 0 | 6 min 56 s |
| HU-15 | 58 | 58 | 31 | 27 | 0 | 0 | No informada |
| **Total** | **308** | **308** | **176** | **132** | **0** | **0** | No calculable: falta duración HU-15 |

Los códigos de salida 20, 7, 34, 24, 17, 6 y 27 corresponden a los fallos comunicados de las suites. No son evidencia de fallo de contenedores. Las cantidades de archivos fallidos no son cantidades de casos fallidos. Un caso fallido no equivale necesariamente a un defecto distinto.

La ejecución de terminal superó el bloqueo de infraestructura de los intentos anteriores del agente. Esos intentos se conservan como antecedentes, no como estado actual. No se sabe si la ejecución comunicada incluye la última corrección de limpieza de cookies del helper.

## Desglose por archivo o área

### HU-9

| Archivo o área | Casos | Aprobados | Fallidos |
|---|---:|---:|---:|
| acceso.cy.ts | 5 | 2 | 3 |
| gestion.cy.ts | 11 | 8 | 3 |
| listado.cy.ts | 10 | 10 | 0 |
| registro.cy.ts | 32 | 18 | 14 |
| **Total** | **58** | **38** | **20** |

### HU-10

| Archivo o área | Casos | Aprobados | Fallidos |
|---|---:|---:|---:|
| Acceso | 5 | 2 | 3 |
| Baja | 8 | 8 | 0 |
| Búsqueda | 5 | 5 | 0 |
| Inscripción | 9 | 5 | 4 |
| Listado | 4 | 4 | 0 |
| **Total** | **31** | **24** | **7** |

### HU-11

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

### HU-12

| Archivo o área | Casos | Aprobados | Fallidos |
|---|---:|---:|---:|
| Acceso | 8 | 3 | 5 |
| Defensivos | 5 | 4 | 1 |
| Inmutabilidad | 11 | 11 | 0 |
| Listado y filtros | 11 | 5 | 6 |
| Registro | 21 | 12 | 9 |
| Responsive | 2 | 0 | 2 |
| Vacío | 1 | 1 | 0 |
| **Total** | **59** | **36** | **23** |

### HU-13

| Archivo o área | Casos | Aprobados | Fallidos |
|---|---:|---:|---:|
| Acceso | 8 | 3 | 5 |
| Actualización | 3 | 0 | 3 |
| Búsqueda | 3 | 3 | 0 |
| Cierre | 2 | 2 | 0 |
| Listas | 10 | 2 | 8 |
| Selección | 3 | 2 | 1 |
| **Total** | **29** | **12** | **17** |

### HU-14

| Archivo o área | Casos | Aprobados | Fallidos |
|---|---:|---:|---:|
| Acceso | 7 | 5 | 2 |
| Asignación | 6 | 4 | 2 |
| Desasignación | 4 | 4 | 0 |
| Estados | 2 | 2 | 0 |
| Selector | 10 | 10 | 0 |
| **Total** | **29** | **25** | **4** |

### HU-15

| Archivo o área | Casos | Aprobados | Fallidos |
|---|---:|---:|---:|
| Acceso | 21 | 15 | 6 |
| Baja | 1 | 1 | 0 |
| Foto | 11 | 6 | 5 |
| Identidad | 8 | 4 | 4 |
| QR | 9 | 4 | 5 |
| Responsive | 8 | 1 | 7 |
| **Total** | **58** | **31** | **27** |

## Clasificación de fallos y reportes de bugs

Los resúmenes iniciales no permitían clasificar los 135 fallos. Posteriormente se recibieron los 20 errores de HU-9: véase [reportes HU-9](bug-reports/HU-9/README.md). Posteriormente se recibieron también los siete errores HU-10, documentados en su detalle individual; los 108 fallos de HU-11 a HU-15 siguen sin clasificación individual actual. Esto no significa que todos sean errores del producto. Se clasificarán como incumplimiento funcional, automatización/preparación, infraestructura o causa pendiente cuando se disponga de los errores individuales.

Las seis capturas locales anteriores de HU-14 respaldan incidencias de aquella ejecución: cuatro sugieren un problema de cambio de sesión, y dos detienen la comprobación del mensaje de duplicado. No se puede asegurar que pertenezcan a la ejecución completa recién comunicada ni aplicar esas causas automáticamente a sus seis fallos.

Los [reportes CS01–CS10](bug-reports/README.md) conservan su alcance: automatización observada, investigación e incumplimientos históricos HU-15 pendientes de reproducción. No se crearon 135 bugs duplicados ni se atribuyeron causas nuevas sin evidencia.

Para HU-15, los 27 fallos se distribuyen en acceso (6), fotografía (5), identidad (4), QR (5) y responsive (7). Sin los nombres y errores completos no es posible clasificar cada uno. La baja tiene un caso aprobado.

## Evidencias que faltan

Se necesita la salida completa de cada suite, particularmente los bloques numerados con título del caso, error, resultado esperado/recibido y archivo/línea. Para HU-15 hacen falta los 27 bloques. Si se utilizó el script de este repositorio, los archivos `results/<ejecución>/HU-{9..15}.json` y `.log` proporcionan esos datos; no hace falta repetir las suites.

También conviene registrar fecha, navegador, versión del código y ruta de las capturas. No se modifica Laravel ni se debilitan expectativas para convertir fallos en aprobados.

## Nombres de los casos implementados

El anexo reproduce los títulos exactos del inventario. Todos fueron ejecutados según el resumen comunicado, pero el resultado individual no puede asignarse a cada título sin el reporte detallado.

## Anexo: nombres exactos de los 308 casos implementados

Todos los casos de este anexo fueron ejecutados según el resumen del usuario. HU-9 ya tiene resultados individuales en la sección detallada; HU-10 también tiene detalle individual; en HU-11 a HU-15 falta asociar el resultado a cada título mediante los logs. Los identificadores pueden repetirse entre variantes independientes; el título completo distingue cada caso.

### HU-9: Gestión de grupos e inscripciones — 58 casos

| N.º | Archivo | Nombre exacto |
|---:|---|---|
| 1 | `acceso.cy.ts` | HU09-01 · administrador accede desde menú y al detalle de inscritos |
| 2 | `acceso.cy.ts` | HU09-02 docente · sin menú, URL ni ninguna escritura de grupos/inscripciones |
| 3 | `acceso.cy.ts` | HU09-02 control · sin menú, URL ni ninguna escritura de grupos/inscripciones |
| 4 | `acceso.cy.ts` | HU09-02 estudiante · sin menú, URL ni ninguna escritura de grupos/inscripciones |
| 5 | `acceso.cy.ts` | HU09-03 · anónimo no accede al módulo ni escribe datos |
| 6 | `gestion.cy.ts` | HU09-24 · reasigna docente y persiste sin alterar grupo ni relaciones |
| 7 | `gestion.cy.ts` | HU09-25 UI · exige seleccionar docente al reasignar |
| 8 | `gestion.cy.ts` | HU09-25 ausente · rechaza reasignación inválida sin cambios |
| 9 | `gestion.cy.ts` | HU09-25 inexistente · rechaza reasignación inválida sin cambios |
| 10 | `gestion.cy.ts` | HU09-25 texto · rechaza reasignación inválida sin cambios |
| 11 | `gestion.cy.ts` | HU09-26 · elimina un grupo libre y persiste la baja |
| 12 | `gestion.cy.ts` | HU09-27 · UI bloquea eliminar grupo con inscrito y muestra mensaje exacto |
| 13 | `gestion.cy.ts` | HU09-28 · UI protege grupo cuyos inscritos se relacionan con examen |
| 14 | `gestion.cy.ts` | HU09-29 B · DELETE directo preserva inscripciones y exámenes asociados |
| 15 | `gestion.cy.ts` | HU09-29 C · DELETE directo preserva inscripciones y exámenes asociados |
| 16 | `gestion.cy.ts` | HU09-30 · inscribir bloquea eliminación; dar de baja permite eliminar grupo libre |
| 17 | `listado.cy.ts` | HU09-16 · muestra asignatura, nombre de grupo, Gestión y docente reales |
| 18 | `listado.cy.ts` | HU09-17 · recorre todas las páginas sin omisiones ni duplicados y permite volver |
| 19 | `listado.cy.ts` | HU09-18 · filtra solo por Asignatura y conserva el filtro al recargar |
| 20 | `listado.cy.ts` | HU09-19 · filtra solo por Gestión y conserva el filtro al recargar |
| 21 | `listado.cy.ts` | HU09-20 · aplica ambos filtros y los mantiene entre páginas |
| 22 | `listado.cy.ts` | HU09-21 · combinación sin coincidencias muestra lista vacía |
| 23 | `listado.cy.ts` | HU09-22 · limpiar restaura ambos filtros y el listado completo |
| 24 | `listado.cy.ts` | HU09-23 asignatura inexistente · rechaza filtros inválidos en servidor |
| 25 | `listado.cy.ts` | HU09-23 asignatura texto · rechaza filtros inválidos en servidor |
| 26 | `listado.cy.ts` | HU09-23 gestion larga · rechaza filtros inválidos en servidor |
| 27 | `registro.cy.ts` | HU09-04 A · registra por UI con Gestión 2026-2 y persiste |
| 28 | `registro.cy.ts` | HU09-04 B · registra por UI con Gestión 2026-2 y persiste |
| 29 | `registro.cy.ts` | HU09-04 1A · registra por UI con Gestión 2026-2 y persiste |
| 30 | `registro.cy.ts` | HU09-04 14 · registra por UI con Gestión 2026-2 y persiste |
| 31 | `registro.cy.ts` | HU09-05 · servidor acepta Gestión semestral sin depender de validación UI |
| 32 | `registro.cy.ts` | HU09-06 · UI exige todos los campos y no escribe el formulario vacío |
| 33 | `registro.cy.ts` | HU09-07 id_asignatura · servidor rechaza campo obligatorio ausente |
| 34 | `registro.cy.ts` | HU09-07 id_usuario · servidor rechaza campo obligatorio ausente |
| 35 | `registro.cy.ts` | HU09-07 gestion · servidor rechaza campo obligatorio ausente |
| 36 | `registro.cy.ts` | HU09-07 nombre_grupo · servidor rechaza campo obligatorio ausente |
| 37 | `registro.cy.ts` | HU09-08 abc · Gestión malformada rechazada en UI y servidor |
| 38 | `registro.cy.ts` | HU09-08 26-2 · Gestión malformada rechazada en UI y servidor |
| 39 | `registro.cy.ts` | HU09-09 · listas de alta y reasignación incluyen exclusivamente los docentes |
| 40 | `registro.cy.ts` | HU09-10 POST administrador · rechaza asignar usuario que no es docente |
| 41 | `registro.cy.ts` | HU09-10 PATCH administrador · rechaza asignar usuario que no es docente |
| 42 | `registro.cy.ts` | HU09-10 POST personal de control de ingreso · rechaza asignar usuario que no es docente |
| 43 | `registro.cy.ts` | HU09-10 PATCH personal de control de ingreso · rechaza asignar usuario que no es docente |
| 44 | `registro.cy.ts` | HU09-10 POST estudiante · rechaza asignar usuario que no es docente |
| 45 | `registro.cy.ts` | HU09-10 PATCH estudiante · rechaza asignar usuario que no es docente |
| 46 | `registro.cy.ts` | HU09-11 id_asignatura inexistente · valida referencia y tipo |
| 47 | `registro.cy.ts` | HU09-11 id_asignatura texto · valida referencia y tipo |
| 48 | `registro.cy.ts` | HU09-11 id_usuario inexistente · valida referencia y tipo |
| 49 | `registro.cy.ts` | HU09-11 id_usuario texto · valida referencia y tipo |
| 50 | `registro.cy.ts` | HU09-12 docente1.e2e · rechaza triple duplicada con mensaje exacto de HU |
| 51 | `registro.cy.ts` | HU09-12 docente2.e2e · rechaza triple duplicada con mensaje exacto de HU |
| 52 | `registro.cy.ts` | HU09-13 · UI muestra el mensaje exacto de triple duplicada |
| 53 | `registro.cy.ts` | HU09-14 nombre · permite otra combinación y varios grupos del mismo docente |
| 54 | `registro.cy.ts` | HU09-14 asignatura · permite otra combinación y varios grupos del mismo docente |
| 55 | `registro.cy.ts` | HU09-14 gestion · permite otra combinación y varios grupos del mismo docente |
| 56 | `registro.cy.ts` | HU09-15 50 · límite actual del nombre y blancos |
| 57 | `registro.cy.ts` | HU09-15 51 · límite actual del nombre y blancos |
| 58 | `registro.cy.ts` | HU09-15 0 · límite actual del nombre y blancos |

### HU-10: Inscripciones de estudiantes a grupos — 31 casos

| N.º | Archivo | Nombre exacto |
|---:|---|---|
| 1 | `acceso.cy.ts` | HU10-01 · administrador llega desde Grupos al detalle y sus acciones |
| 2 | `acceso.cy.ts` | HU10-02 docente responsable · UI, URL y acciones directas denegadas |
| 3 | `acceso.cy.ts` | HU10-02 control · UI, URL y acciones directas denegadas |
| 4 | `acceso.cy.ts` | HU10-02 estudiante del grupo · UI, URL y acciones directas denegadas |
| 5 | `acceso.cy.ts` | HU10-03 · sin sesión no accede al detalle ni inscribe o da de baja |
| 6 | `baja.cy.ts` | HU10-18 · baja por UI persiste sin borrar estudiante, grupo u otras inscripciones |
| 7 | `baja.cy.ts` | HU10-19 · DELETE directo realiza únicamente la baja elegida y coincide con la UI |
| 8 | `baja.cy.ts` | HU10-20 · no elimina la inscripción usando una URL de otro grupo |
| 9 | `baja.cy.ts` | HU10-21 GET · grupo inexistente rechazado sin modificar datos |
| 10 | `baja.cy.ts` | HU10-21 POST · grupo inexistente rechazado sin modificar datos |
| 11 | `baja.cy.ts` | HU10-21 DELETE · grupo inexistente rechazado sin modificar datos |
| 12 | `baja.cy.ts` | HU10-22 · inscripción inexistente rechazada sin modificar datos |
| 13 | `baja.cy.ts` | HU10-23 · cancelar baja conserva la inscripción después de recargar |
| 14 | `busqueda.cy.ts` | HU10-04 código · busca y conserva resultados correctos al recargar |
| 15 | `busqueda.cy.ts` | HU10-04 nombre · busca y conserva resultados correctos al recargar |
| 16 | `busqueda.cy.ts` | HU10-04 apellido · busca y conserva resultados correctos al recargar |
| 17 | `busqueda.cy.ts` | HU10-05 · término inexistente muestra búsqueda sin resultados y no cambia datos |
| 18 | `busqueda.cy.ts` | HU10-06 · limpiar búsqueda restaura el buscador y conserva el listado |
| 19 | `inscripcion.cy.ts` | HU10-07 · inscripción por UI persiste después de recargar |
| 20 | `inscripcion.cy.ts` | HU10-08 · POST autenticado válido persiste y coincide con el listado UI |
| 21 | `inscripcion.cy.ts` | HU10-09 · UI excluye al inscrito; endpoint rechaza duplicado con mensaje exacto |
| 22 | `inscripcion.cy.ts` | HU10-10 · UI rechaza otro grupo de la misma Asignatura y Gestión con mensaje exacto |
| 23 | `inscripcion.cy.ts` | HU10-11 · endpoint rechaza otro grupo de la misma Asignatura y Gestión con mensaje exacto |
| 24 | `inscripcion.cy.ts` | HU10-12 · permite inscribir simultáneamente en distintas asignaturas de la misma Gestión |
| 25 | `inscripcion.cy.ts` | HU10-13 ausente · servidor valida el estudiante sin alterar inscripciones |
| 26 | `inscripcion.cy.ts` | HU10-13 inexistente · servidor valida el estudiante sin alterar inscripciones |
| 27 | `inscripcion.cy.ts` | HU10-13 no entero · servidor valida el estudiante sin alterar inscripciones |
| 28 | `listado.cy.ts` | HU10-14 · lista código, nombres y apellidos reales de los inscritos |
| 29 | `listado.cy.ts` | HU10-15 · pagina todos los inscritos sin omisiones y conserva la búsqueda al navegar |
| 30 | `listado.cy.ts` | HU10-16 · grupo sin inscritos muestra estado vacío y permite buscar |
| 31 | `listado.cy.ts` | HU10-17 · exactamente 15 inscritos caben en una página después de una baja |

### HU-11: Registro de ingreso — 44 casos

| N.º | Archivo | Nombre exacto |
|---:|---|---|
| 1 | `acceso.cy.ts` | HU11-01 personal de control de ingreso · tiene acceso al módulo por el menú |
| 2 | `acceso.cy.ts` | HU11-02 personal de control de ingreso · URL y endpoints permiten verificar y guardar con el actor correcto |
| 3 | `acceso.cy.ts` | HU11-01 docente · tiene acceso al módulo por el menú |
| 4 | `acceso.cy.ts` | HU11-02 docente · URL y endpoints permiten verificar y guardar con el actor correcto |
| 5 | `acceso.cy.ts` | HU11-01 administrador · tiene acceso al módulo por el menú |
| 6 | `acceso.cy.ts` | HU11-02 administrador · URL y endpoints permiten verificar y guardar con el actor correcto |
| 7 | `acceso.cy.ts` | HU11-03 · estudiante no accede por menú, URL ni endpoints |
| 8 | `acceso.cy.ts` | HU11-04 · visitante no accede ni registra ingresos |
| 9 | `confirmacion.cy.ts` | HU11-13 muestra identidad y foto sin registrar ni permitir editar la hora |
| 10 | `confirmacion.cy.ts` | HU11-14 cancelar no registra y permite buscar otro estudiante |
| 11 | `confirmacion.cy.ts` | HU11-15 confirmar persiste todas las relaciones y la hora del servidor |
| 12 | `confirmacion.cy.ts` | HU11-16 el cliente no puede imponer hora ni usuario |
| 13 | `confirmacion.cy.ts` | HU11-17 registra dos estudiantes sin recargar ni perder examen y ambiente |
| 14 | `defensivos.cy.ts` | HU11-12 guardado directo rechaza estudiante no habilitado: Carla |
| 15 | `defensivos.cy.ts` | HU11-12 guardado directo rechaza estudiante no habilitado: Diego |
| 16 | `defensivos.cy.ts` | HU11-12 guardado directo rechaza estudiante no habilitado: Gina |
| 17 | `defensivos.cy.ts` | HU11-12 guardado directo rechaza estudiante no habilitado: Elena |
| 18 | `defensivos.cy.ts` | HU11-12 guardado directo rechaza estudiante no habilitado: Fabio |
| 19 | `defensivos.cy.ts` | HU11-23 validar exige id_examen |
| 20 | `defensivos.cy.ts` | HU11-23 validar exige dato_estudiante |
| 21 | `defensivos.cy.ts` | HU11-24 guardar exige id_estudiante |
| 22 | `defensivos.cy.ts` | HU11-24 guardar exige id_examen_ambiente |
| 23 | `defensivos.cy.ts` | HU11-25 ambiente de examen inexistente se rechaza como entrada inválida |
| 24 | `duplicados.cy.ts` | HU11-18 rechaza segundo ingreso en el mismo ambiente |
| 25 | `duplicados.cy.ts` | HU11-19 reenvío secuencial directo en el mismo ambiente conserva un registro |
| 26 | `duplicados.cy.ts` | HU11-18 rechaza segundo ingreso en otro ambiente |
| 27 | `duplicados.cy.ts` | HU11-19 reenvío secuencial directo en otro ambiente conserva un registro |
| 28 | `duplicados.cy.ts` | HU11-20 el endpoint directo devuelve el mensaje exigido con hora previa |
| 29 | `duplicados.cy.ts` | HU11-21 permite al mismo estudiante ingresar en otro examen habilitado |
| 30 | `responsive.cy.ts` | HU11-22 flujo completo usable en móvil |
| 31 | `responsive.cy.ts` | HU11-22 flujo completo usable en tablet |
| 32 | `seleccion.cy.ts` | HU11-05 · examen y ambiente obligatorios antes de identificar |
| 33 | `seleccion.cy.ts` | HU11-06 · las opciones de ambiente corresponden exclusivamente al examen elegido |
| 34 | `seleccion.cy.ts` | HU11-07 · cambiar examen limpia la selección incompatible de ambiente |
| 35 | `seleccion.cy.ts` | HU11-08 · examen sin ambientes no permite iniciar |
| 36 | `verificacion.cy.ts` | HU11-09 código · resuelve al mismo estudiante sin ingreso previo |
| 37 | `verificacion.cy.ts` | HU11-09 documento · resuelve al mismo estudiante sin ingreso previo |
| 38 | `verificacion.cy.ts` | HU11-09 QR · resuelve al mismo estudiante sin ingreso previo |
| 39 | `verificacion.cy.ts` | HU11-10 · dato desconocido muestra el mensaje exacto y no escribe |
| 40 | `verificacion.cy.ts` | HU11-11 Carla · rechaza habilitación inválida y no crea ingreso |
| 41 | `verificacion.cy.ts` | HU11-11 Diego · rechaza habilitación inválida y no crea ingreso |
| 42 | `verificacion.cy.ts` | HU11-11 Gina · rechaza habilitación inválida y no crea ingreso |
| 43 | `verificacion.cy.ts` | HU11-11 Elena · rechaza habilitación inválida y no crea ingreso |
| 44 | `verificacion.cy.ts` | HU11-11 Fabio · rechaza habilitación inválida y no crea ingreso |

### HU-12: Gestión de incidencias — 59 casos

| N.º | Archivo | Nombre exacto |
|---:|---|---|
| 1 | `acceso.cy.ts` | HU12-01 personal de control de ingreso accede desde navegación |
| 2 | `acceso.cy.ts` | HU12-02 personal de control de ingreso accede por URL y registra por endpoint |
| 3 | `acceso.cy.ts` | HU12-01 docente accede desde navegación |
| 4 | `acceso.cy.ts` | HU12-02 docente accede por URL y registra por endpoint |
| 5 | `acceso.cy.ts` | HU12-01 administrador accede desde navegación |
| 6 | `acceso.cy.ts` | HU12-02 administrador accede por URL y registra por endpoint |
| 7 | `acceso.cy.ts` | HU12-03 estudiante rechazado por navegación, URL y registro |
| 8 | `acceso.cy.ts` | HU12-04 visitante no accede ni registra |
| 9 | `defensivos.cy.ts` | HU12-29 catálogo cerrado rechaza tipo externo por endpoint |
| 10 | `defensivos.cy.ts` | HU12-30 adicional: relación inexistente id_examen rechazada |
| 11 | `defensivos.cy.ts` | HU12-30 adicional: relación inexistente id_estudiante rechazada |
| 12 | `defensivos.cy.ts` | HU12-31 adicional: rango invertido rechazado por validación actual |
| 13 | `defensivos.cy.ts` | HU12-32 caracteriza texto largo sin límite max:1000 activo |
| 14 | `inmutabilidad.cy.ts` | HU12-25 tarjetas no ofrecen edición ni eliminación |
| 15 | `inmutabilidad.cy.ts` | HU12-26 registro real de rutas contiene solo índice y registro |
| 16 | `inmutabilidad.cy.ts` | HU12-27 personal de control de ingreso no modifica datos con PUT |
| 17 | `inmutabilidad.cy.ts` | HU12-27 personal de control de ingreso no modifica datos con PATCH |
| 18 | `inmutabilidad.cy.ts` | HU12-27 personal de control de ingreso no modifica datos con DELETE |
| 19 | `inmutabilidad.cy.ts` | HU12-27 docente no modifica datos con PUT |
| 20 | `inmutabilidad.cy.ts` | HU12-27 docente no modifica datos con PATCH |
| 21 | `inmutabilidad.cy.ts` | HU12-27 docente no modifica datos con DELETE |
| 22 | `inmutabilidad.cy.ts` | HU12-27 administrador no modifica datos con PUT |
| 23 | `inmutabilidad.cy.ts` | HU12-27 administrador no modifica datos con PATCH |
| 24 | `inmutabilidad.cy.ts` | HU12-27 administrador no modifica datos con DELETE |
| 25 | `listado.cy.ts` | HU12-16 listado completo y recarga con estudiante |
| 26 | `listado.cy.ts` | HU12-16 listado completo y recarga sin estudiante |
| 27 | `listado.cy.ts` | HU12-18 navega entre páginas sin perder ni repetir incidencias |
| 28 | `listado.cy.ts` | HU12-19 filtro individual por examen |
| 29 | `listado.cy.ts` | HU12-19 filtro individual por tipo |
| 30 | `listado.cy.ts` | HU12-19 filtro individual por rango |
| 31 | `listado.cy.ts` | HU12-20 filtros combinados restringen conjuntamente el resultado |
| 32 | `listado.cy.ts` | HU12-21 limpiar filtros recupera listado sin restricciones |
| 33 | `listado.cy.ts` | HU12-22 rango sin coincidencias muestra estado vacío |
| 34 | `listado.cy.ts` | HU12-23 caracteriza extremos inclusivos del rango implementado (pendiente de confirmación HU) |
| 35 | `listado.cy.ts` | HU12-24 paginación mantiene filtros activos en backend y navegación UI |
| 36 | `registro.cy.ts` | HU12-05 registra Expulsión con estudiante sin ingreso previo |
| 37 | `registro.cy.ts` | HU12-05 registra Problema de identificación con estudiante sin ingreso previo |
| 38 | `registro.cy.ts` | HU12-05 registra Cambio de ambiente con estudiante sin ingreso previo |
| 39 | `registro.cy.ts` | HU12-05 registra Otro con estudiante sin ingreso previo |
| 40 | `registro.cy.ts` | HU12-06 registra incidencia sin estudiante y sin error obligatorio para él |
| 41 | `registro.cy.ts` | HU12-07 búsqueda por código asocia el estudiante correcto |
| 42 | `registro.cy.ts` | HU12-07 búsqueda por documento asocia el estudiante correcto |
| 43 | `registro.cy.ts` | HU12-07 búsqueda por nombre asocia el estudiante correcto |
| 44 | `registro.cy.ts` | HU12-08 búsqueda desconocida no ofrece estudiantes ni registra |
| 45 | `registro.cy.ts` | HU12-09 cambiar búsqueda limpia la asociación anterior |
| 46 | `registro.cy.ts` | HU12-10 id_examen vacío muestra mensaje obligatorio en UI |
| 47 | `registro.cy.ts` | HU12-11 endpoint rechaza id_examen vacío sin persistir |
| 48 | `registro.cy.ts` | HU12-10 tipo_incidencia vacío muestra mensaje obligatorio en UI |
| 49 | `registro.cy.ts` | HU12-11 endpoint rechaza tipo_incidencia vacío sin persistir |
| 50 | `registro.cy.ts` | HU12-10 descripcion_motivo vacío muestra mensaje obligatorio en UI |
| 51 | `registro.cy.ts` | HU12-11 endpoint rechaza descripcion_motivo vacío sin persistir |
| 52 | `registro.cy.ts` | HU12-12 UI rechaza descripción compuesta solo por espacios |
| 53 | `registro.cy.ts` | HU12-12 endpoint rechaza descripción compuesta solo por espacios |
| 54 | `registro.cy.ts` | HU12-13 cancelar el formulario no crea incidencia |
| 55 | `registro.cy.ts` | HU12-14 el cliente no suplanta reportante ni fija fecha del servidor |
| 56 | `registro.cy.ts` | HU12-15 formulario no tiene controles para fecha, hora o reportante |
| 57 | `responsive.cy.ts` | HU12-28 listado, filtros y formulario utilizables en móvil |
| 58 | `responsive.cy.ts` | HU12-28 listado, filtros y formulario utilizables en tablet |
| 59 | `vacio.cy.ts` | HU12-17 listado vacío permite abrir registro |

### HU-13: Panel de asistencia en tiempo real — 29 casos

| N.º | Archivo | Nombre exacto |
|---:|---|---|
| 1 | `acceso.cy.ts` | HU13-01 personal de control de ingreso entra desde el menú |
| 2 | `acceso.cy.ts` | HU13-02 personal de control de ingreso consulta URL, JSON y refresco parcial |
| 3 | `acceso.cy.ts` | HU13-01 docente entra desde el menú |
| 4 | `acceso.cy.ts` | HU13-02 docente consulta URL, JSON y refresco parcial |
| 5 | `acceso.cy.ts` | HU13-01 administrador entra desde el menú |
| 6 | `acceso.cy.ts` | HU13-02 administrador consulta URL, JSON y refresco parcial |
| 7 | `acceso.cy.ts` | HU13-03 estudiante no accede por menú, URL o consulta/actualización |
| 8 | `acceso.cy.ts` | HU13-04 visitante no accede a URL ni consulta/actualización |
| 9 | `actualizacion.cy.ts` | HU13-17 check-in independiente mueve pendiente a Norte HU13 sin recarga y conserva filtro |
| 10 | `actualizacion.cy.ts` | HU13-17 check-in independiente mueve pendiente a Sur HU13 sin recarga y conserva filtro |
| 11 | `actualizacion.cy.ts` | HU13-18 polling mantiene examen y filtro ante ingreso en otro examen |
| 12 | `busqueda.cy.ts` | HU13-15 busca pendientes por nombre; caracteriza resumen global independiente del filtro |
| 13 | `busqueda.cy.ts` | HU13-15 busca pendientes por código; caracteriza resumen global independiente del filtro |
| 14 | `busqueda.cy.ts` | HU13-16 búsqueda sin resultados y limpieza recuperan los pendientes |
| 15 | `cierre.cy.ts` | HU13-19 examen finalizado por reloj PHP muestra cierre y asistencia existente |
| 16 | `cierre.cy.ts` | HU13-20 examen ya cerrado no refresca durante dos intervalos reales del polling |
| 17 | `listas.cy.ts` | HU13-08 agrupa ingresos reales por ambiente: Un ambiente HU13 |
| 18 | `listas.cy.ts` | HU13-09 exige ambas listas dentro de cada ambiente: Un ambiente HU13 |
| 19 | `listas.cy.ts` | HU13-08 agrupa ingresos reales por ambiente: Principal HU13 |
| 20 | `listas.cy.ts` | HU13-09 exige ambas listas dentro de cada ambiente: Principal HU13 |
| 21 | `listas.cy.ts` | HU13-10 listas y resumen coherentes con 0 de 4 ingresados |
| 22 | `listas.cy.ts` | HU13-10 listas y resumen coherentes con 2 de 4 ingresados |
| 23 | `listas.cy.ts` | HU13-10 listas y resumen coherentes con 4 de 4 ingresados |
| 24 | `listas.cy.ts` | HU13-11 inhabilitado y sin habilitación no aparecen en ninguna lista |
| 25 | `listas.cy.ts` | HU13-12 ingreso de otro examen no altera pendientes ni resumen principal |
| 26 | `listas.cy.ts` | HU13-13 ingresados no se repiten entre ambientes y suman el total global |
| 27 | `seleccion.cy.ts` | HU13-05 selecciona examen en curso y muestra su asistencia |
| 28 | `seleccion.cy.ts` | HU13-06 caracteriza catálogo que incluye futuro lejano sin ventana de próximo definida |
| 29 | `seleccion.cy.ts` | HU13-07 cambiar examen sustituye listas, ambientes y contadores sin mezcla |

### HU-14: Asignación de personal de control — 29 casos

| N.º | Archivo | Nombre exacto |
|---:|---|---|
| 1 | `acceso.cy.ts` | HU14-01 admin.e2e abre personal desde el detalle del examen compartido |
| 2 | `acceso.cy.ts` | HU14-01 docente1.hu14 abre personal desde el detalle del examen compartido |
| 3 | `acceso.cy.ts` | HU14-01 docente2.hu14 abre personal desde el detalle del examen compartido |
| 4 | `acceso.cy.ts` | HU14-02 sección de personal separada de las habilitaciones |
| 5 | `acceso.cy.ts` | HU14-03 control no asigna ni quita por interfaz o endpoint |
| 6 | `acceso.cy.ts` | HU14-03 estudiante no asigna ni quita por interfaz o endpoint |
| 7 | `acceso.cy.ts` | HU14-03 visitante no asigna ni quita por interfaz o endpoint |
| 8 | `asignacion.cy.ts` | HU14-05 admin.e2e asigna y persiste tras recargar sin cambios laterales |
| 9 | `asignacion.cy.ts` | HU14-05 docente1.hu14 asigna y persiste tras recargar sin cambios laterales |
| 10 | `asignacion.cy.ts` | HU14-05 docente2.hu14 asigna y persiste tras recargar sin cambios laterales |
| 11 | `asignacion.cy.ts` | HU14-06 varios miembros permanecen asignados al mismo examen |
| 12 | `asignacion.cy.ts` | HU14-10 admin.e2e recibe mensaje exacto de duplicado por endpoint aunque selector lo oculta |
| 13 | `asignacion.cy.ts` | HU14-10 docente1.hu14 recibe mensaje exacto de duplicado por endpoint aunque selector lo oculta |
| 14 | `desasignacion.cy.ts` | HU14-11 admin.e2e quita solo la relación y preserva usuario, rol y otras asignaciones |
| 15 | `desasignacion.cy.ts` | HU14-11 docente1.hu14 quita solo la relación y preserva usuario, rol y otras asignaciones |
| 16 | `desasignacion.cy.ts` | HU14-12 quitar y volver a asignar no duplica relaciones |
| 17 | `desasignacion.cy.ts` | HU14-13 mismo miembro en exámenes con fechas/horas distintas y detalles aislados |
| 18 | `estados.cy.ts` | HU14-14 sección sin personal muestra estado vacío y candidatos |
| 19 | `estados.cy.ts` | HU14-15 al asignar todos no quedan opciones y registro se deshabilita |
| 20 | `selector.cy.ts` | HU14-04 selector ofrece exclusivamente el rol control |
| 21 | `selector.cy.ts` | HU14-07 admin.e2e no puede asignar id de administrador |
| 22 | `selector.cy.ts` | HU14-07 admin.e2e no puede asignar id de docente |
| 23 | `selector.cy.ts` | HU14-07 admin.e2e no puede asignar id de estudiante |
| 24 | `selector.cy.ts` | HU14-07 docente1.hu14 no puede asignar id de administrador |
| 25 | `selector.cy.ts` | HU14-07 docente1.hu14 no puede asignar id de docente |
| 26 | `selector.cy.ts` | HU14-07 docente1.hu14 no puede asignar id de estudiante |
| 27 | `selector.cy.ts` | HU14-08 adicional: selección vacía muestra validación local y no envía registro |
| 28 | `selector.cy.ts` | HU14-09 adicional: endpoint rechaza ID vacío |
| 29 | `selector.cy.ts` | HU14-09 adicional: endpoint rechaza ID inexistente |

### HU-15: Panel de estudiante — 58 casos

| N.º | Archivo | Nombre exacto |
|---:|---|---|
| 1 | `acceso.cy.ts` | HU15-01 alta administrativa crea cuenta temporal de estudiante |
| 2 | `acceso.cy.ts` | HU15-11 contraseña obligatoria bloquea panel hasta cambiarla y persiste el cambio |
| 3 | `acceso.cy.ts` | HU15-12 después de cambiar contraseña termina únicamente en el panel QR |
| 4 | `acceso.cy.ts` | HU15-02 login dirige únicamente al panel QR propio |
| 5 | `acceso.cy.ts` | HU15-03 acceso directo rechazado o panel permitido: /admin/dashboard |
| 6 | `acceso.cy.ts` | HU15-03 acceso directo rechazado o panel permitido: /docente/dashboard |
| 7 | `acceso.cy.ts` | HU15-03 acceso directo rechazado o panel permitido: /control/dashboard |
| 8 | `acceso.cy.ts` | HU15-03 acceso directo rechazado o panel permitido: /dashboard |
| 9 | `acceso.cy.ts` | HU15-03 acceso directo rechazado o panel permitido: /mis-examenes |
| 10 | `acceso.cy.ts` | HU15-03 acceso directo rechazado o panel permitido: /usuarios |
| 11 | `acceso.cy.ts` | HU15-03 acceso directo rechazado o panel permitido: /estudiantes |
| 12 | `acceso.cy.ts` | HU15-03 acceso directo rechazado o panel permitido: /examenes |
| 13 | `acceso.cy.ts` | HU15-03 acceso directo rechazado o panel permitido: /asignaturas |
| 14 | `acceso.cy.ts` | HU15-03 acceso directo rechazado o panel permitido: /ambientes |
| 15 | `acceso.cy.ts` | HU15-03 acceso directo rechazado o panel permitido: /grupos |
| 16 | `acceso.cy.ts` | HU15-03 acceso directo rechazado o panel permitido: /incidencias |
| 17 | `acceso.cy.ts` | HU15-03 acceso directo rechazado o panel permitido: /registro-ingreso |
| 18 | `acceso.cy.ts` | HU15-03 acceso directo rechazado o panel permitido: /panel-asistencia |
| 19 | `acceso.cy.ts` | HU15-16 no ofrece enlaces a módulos prohibidos |
| 20 | `acceso.cy.ts` | HU15-04 no existe autorregistro público por UI ni petición |
| 21 | `acceso.cy.ts` | HU15-17 estudiante no crea cuentas o estudiantes mediante peticiones |
| 22 | `desactivacion.cy.ts` | HU15-10 · la baja revoca el acceso de la sesión existente y futuros logins |
| 23 | `foto.cy.ts` | HU15-08 subir JPG persiste foto y referencia tras recarga |
| 24 | `foto.cy.ts` | HU15-08 subir PNG persiste foto y referencia tras recarga |
| 25 | `foto.cy.ts` | HU15-27 foto persistida se muestra en identificación de control (API y UI) |
| 26 | `foto.cy.ts` | HU15-09 UI rechaza formato y conserva foto previa y archivos |
| 27 | `foto.cy.ts` | HU15-09 UI rechaza tamaño y conserva foto previa y archivos |
| 28 | `foto.cy.ts` | HU15-28 backend rechaza formato inválido sin guardar ni perder foto previa |
| 29 | `foto.cy.ts` | HU15-24 carga con id ajeno no modifica foto del otro estudiante |
| 30 | `foto.cy.ts` | HU15-25 visitante no puede cargar fotografía |
| 31 | `foto.cy.ts` | HU15-29 caracteriza frontera frontend limite-menos (política servidor pendiente) |
| 32 | `foto.cy.ts` | HU15-29 caracteriza frontera frontend limite-exacto (política servidor pendiente) |
| 33 | `foto.cy.ts` | HU15-29 caracteriza frontera frontend limite-mas (política servidor pendiente) |
| 34 | `identidad.cy.ts` | HU15-13 Ana muestra nombres, apellidos y código propios |
| 35 | `identidad.cy.ts` | HU15-14 Ana muestra CI correcto |
| 36 | `identidad.cy.ts` | HU15-20 Ana solo recibe su QR y foto aunque query indique otro perfil |
| 37 | `identidad.cy.ts` | HU15-13 Bruno muestra nombres, apellidos y código propios |
| 38 | `identidad.cy.ts` | HU15-14 Bruno muestra CI correcto |
| 39 | `identidad.cy.ts` | HU15-20 Bruno solo recibe su QR y foto aunque query indique otro perfil |
| 40 | `identidad.cy.ts` | HU15-18 no tiene controles de edición de identidad |
| 41 | `identidad.cy.ts` | HU15-19 peticiones no permiten modificar datos personales propios |
| 42 | `qr.cy.ts` | HU15-05 imagen vigente cargada y legible junto a identidad |
| 43 | `qr.cy.ts` | HU15-05 decodifica PNG real independientemente del layout |
| 44 | `qr.cy.ts` | HU15-06 identificadores distintos para estudiantes distintos |
| 45 | `qr.cy.ts` | HU15-21 QR no es CI, código ni fórmula predecible vigente |
| 46 | `qr.cy.ts` | HU15-07 regenerar cambia QR persistido y sobrevive a recarga |
| 47 | `qr.cy.ts` | HU15-22 QR anterior no resuelve y nuevo funciona con identificación real |
| 48 | `qr.cy.ts` | HU15-23 segunda regeneración invalida ambos identificadores anteriores |
| 49 | `qr.cy.ts` | HU15-24 payload ajeno no regenera QR de otro estudiante |
| 50 | `qr.cy.ts` | HU15-25 visitante no regenera QR |
| 51 | `responsive.cy.ts` | HU15-30 móvil identidad, QR y controles accesibles sin desbordamiento |
| 52 | `responsive.cy.ts` | HU15-30 móvil CI visible de forma independiente |
| 53 | `responsive.cy.ts` | HU15-31 móvil selección y subida de foto funcionan |
| 54 | `responsive.cy.ts` | HU15-32 móvil regeneración funciona y persiste |
| 55 | `responsive.cy.ts` | HU15-30 tablet identidad, QR y controles accesibles sin desbordamiento |
| 56 | `responsive.cy.ts` | HU15-30 tablet CI visible de forma independiente |
| 57 | `responsive.cy.ts` | HU15-31 tablet selección y subida de foto funcionan |
| 58 | `responsive.cy.ts` | HU15-32 tablet regeneración funciona y persiste |



## Antecedentes

HU-15 inicial (05/10/2026): 10 ejecutados, 2 aprobados y 8 fallidos. No se suma a los 308 casos actuales. Los intentos posteriores del agente quedaron bloqueados por libpod, mientras que la ejecución completa comunicada por el usuario sí completó las suites.

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

## Reportes de bugs organizados por HU

[Índice por historia de usuario](bug-reports/README.md). CS11–CS16 documentan los errores HU-9 aportados: formato Gestión, validación defensiva con HTTP 500, mensaje exacto de duplicado, obstáculo CSRF 419, protocolo Inertia 409 y mensaje UI pendiente. Se agrupan casos relacionados y se distinguen defectos confirmados de observaciones con causa pendiente. Los reportes CS01–CS10 conservan sus IDs y antecedentes bajo HU-14/HU-15. HU-10 a HU-13 tienen pendientes explícitos, sin bugs inventados a partir de los totales.

## HU-10: títulos y resultados individuales de la ejecución aportada

Fuente: salida completa de Cypress compartida por el usuario. **31 ejecutados: 24 aprobados y 7 fallidos; 0 pendientes y 0 omitidos. Duración total: 6 min 17 s.** No se ejecutaron pruebas nuevas para preparar este detalle.

| Archivo | Ejecutados | Aprobados | Fallidos |
|---|---:|---:|---:|
| acceso.cy.ts | 5 | 2 | 3 |
| baja.cy.ts | 8 | 8 | 0 |
| busqueda.cy.ts | 5 | 5 | 0 |
| inscripcion.cy.ts | 9 | 5 | 4 |
| listado.cy.ts | 4 | 4 | 0 |
| **Total** | **31** | **24** | **7** |

### Aprobados: 24 casos

| N.º | Archivo | Título del caso |
|---:|---|---|
| 1 | `acceso.cy.ts` | HU10-01 · administrador llega desde Grupos al detalle y sus acciones |
| 2 | `acceso.cy.ts` | HU10-03 · sin sesión no accede al detalle ni inscribe o da de baja |
| 3 | `baja.cy.ts` | HU10-18 · baja por UI persiste sin borrar estudiante, grupo u otras inscripciones |
| 4 | `baja.cy.ts` | HU10-19 · DELETE directo realiza únicamente la baja elegida y coincide con la UI |
| 5 | `baja.cy.ts` | HU10-20 · no elimina la inscripción usando una URL de otro grupo |
| 6 | `baja.cy.ts` | HU10-21 GET · grupo inexistente rechazado sin modificar datos |
| 7 | `baja.cy.ts` | HU10-21 POST · grupo inexistente rechazado sin modificar datos |
| 8 | `baja.cy.ts` | HU10-21 DELETE · grupo inexistente rechazado sin modificar datos |
| 9 | `baja.cy.ts` | HU10-22 · inscripción inexistente rechazada sin modificar datos |
| 10 | `baja.cy.ts` | HU10-23 · cancelar baja conserva la inscripción después de recargar |
| 11 | `busqueda.cy.ts` | HU10-04 código · busca y conserva resultados correctos al recargar |
| 12 | `busqueda.cy.ts` | HU10-04 nombre · busca y conserva resultados correctos al recargar |
| 13 | `busqueda.cy.ts` | HU10-04 apellido · busca y conserva resultados correctos al recargar |
| 14 | `busqueda.cy.ts` | HU10-05 · término inexistente muestra búsqueda sin resultados y no cambia datos |
| 15 | `busqueda.cy.ts` | HU10-06 · limpiar búsqueda restaura el buscador y conserva el listado |
| 16 | `inscripcion.cy.ts` | HU10-07 · inscripción por UI persiste después de recargar |
| 17 | `inscripcion.cy.ts` | HU10-08 · POST autenticado válido persiste y coincide con el listado UI |
| 18 | `inscripcion.cy.ts` | HU10-12 · permite inscribir simultáneamente en distintas asignaturas de la misma Gestión |
| 19 | `inscripcion.cy.ts` | HU10-13 ausente · servidor valida el estudiante sin alterar inscripciones |
| 20 | `inscripcion.cy.ts` | HU10-13 inexistente · servidor valida el estudiante sin alterar inscripciones |
| 21 | `listado.cy.ts` | HU10-14 · lista código, nombres y apellidos reales de los inscritos |
| 22 | `listado.cy.ts` | HU10-15 · pagina todos los inscritos sin omisiones y conserva la búsqueda al navegar |
| 23 | `listado.cy.ts` | HU10-16 · grupo sin inscritos muestra estado vacío y permite buscar |
| 24 | `listado.cy.ts` | HU10-17 · exactamente 15 inscritos caben en una página después de una baja |

### Fallidos: 7 casos

| N.º | Archivo | Título del caso |
|---:|---|---|
| 1 | `acceso.cy.ts` | HU10-02 docente responsable · UI, URL y acciones directas denegadas |
| 2 | `acceso.cy.ts` | HU10-02 control · UI, URL y acciones directas denegadas |
| 3 | `acceso.cy.ts` | HU10-02 estudiante del grupo · UI, URL y acciones directas denegadas |
| 4 | `inscripcion.cy.ts` | HU10-09 · UI excluye al inscrito; endpoint rechaza duplicado con mensaje exacto |
| 5 | `inscripcion.cy.ts` | HU10-10 · UI rechaza otro grupo de la misma Asignatura y Gestión con mensaje exacto |
| 6 | `inscripcion.cy.ts` | HU10-11 · endpoint rechaza otro grupo de la misma Asignatura y Gestión con mensaje exacto |
| 7 | `inscripcion.cy.ts` | HU10-13 no entero · servidor valida el estudiante sin alterar inscripciones |

### Evidencia de los fallos

- HU10-02 docente responsable, control y estudiante del grupo: HTTP 419 en lugar de 403. No demuestra acceso indebido; falta determinar la causa del obstáculo CSRF/sesión.
- HU10-09: mensaje recibido «El estudiante ya esta inscrito en este grupo»; requerido «El estudiante ya está inscrito en este grupo».
- HU10-10 y HU10-11: mensaje recibido «El estudiante ya esta inscrito en otro grupo de esta asignatura para esta gestion»; requerido «El estudiante ya está inscrito en otro grupo de esta asignatura para esta gestión». Las dos variantes evidencian el mismo defecto de mensaje.
- HU10-13 no entero: HTTP 500 en lugar de 422; validación defensiva adicional. La traza de servidor no fue aportada y no se atribuye una causa interna exacta.

El código de salida 7 representa siete casos fallidos, no un fallo de los contenedores. Una comprobación posterior al primer fallo no se presenta como aprobada.

## Bugs HU-10 documentados con evidencia de ejecución

[Reportes separados por HU](bug-reports/HU-10/README.md): CS17 mensaje de duplicado (1 caso); CS18 mensaje de otro grupo (2 casos); CS19 ID de texto con respuesta 500 (1 caso, validación adicional); CS20 obstáculo CSRF 419 (3 casos, causa pendiente). Cuatro reportes cubren los siete casos fallidos sin atribuir acceso indebido ni duplicación de inscripciones. No se modificó Laravel ni se debilitaron expectativas.

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

[CS21–CS25](bug-reports/HU-11/README.md) agrupan 23 fallos con bloques de error: cinco respuestas 200 sin habilitación válida, un 500 para ambiente inexistente, un mensaje de duplicado incorrecto, quince TypeError del runner y un selector sin opciones esperadas. Faltan once errores: seis de acceso y cinco de confirmación. No se afirma persistencia indebida a partir de HTTP 200 ni se convierten errores del runner en incumplimientos funcionales. La inspección de store confirma que falta revalidar habilitación antes de crear; la BD de esa ejecución no fue comprobada tras el fallo.

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

Actualización del consolidado: **308 ejecutados, 174 aprobados y 134 fallidos**, con los datos detallados más recientes de HU-12 y los últimos resultados comunicados de las otras HU. No es una nueva corrida conjunta.

## Reportes HU-12 basados en la salida detallada

[CS26–CS32](bug-reports/HU-12/README.md) agrupan los 23 fallos: 15 por epoch string en la aserción temporal y ocho por navegación, CSRF, paginación, resultados de filtros y desbordamiento móvil. Las causas pendientes no se convierten en defectos confirmados. No se modificó código de producción, tests ni expectativas.

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

[CS33–CS36](bug-reports/HU-13/README.md) agrupan los 17 fallos: diez comparaciones temporales con epoch string, cuatro consultas parciales con HTTP 409, un enlace oculto y dos comprobaciones de organización de listas por ambiente. El tipo del epoch y las consultas parciales se distinguen de incumplimientos funcionales; la definición de distribución de pendientes por ambiente sigue pendiente. No se modificaron Laravel ni tests.

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

Consolidado de los últimos resultados aportados: **308 ejecutados, 176 aprobados y 132 fallidos**, sin pendientes ni omitidos. No es una nueva corrida conjunta; los resúmenes anteriores se conservan como antecedentes.

## Reportes HU-14 actualizados con errores completos

[Reportes HU-14](bug-reports/HU-14/README.md): CS2 actualizado documenta dos errores de JSON.parse en el helper, antes de comprobar el mensaje de duplicado; CS37 documenta dos respuestas 419 frente a 403 con causa pendiente. CS1 es un antecedente y no se cuenta entre los cuatro fallos actuales: desasignación aprobó todos sus casos. No se atribuyen fallos funcionales de autorización o duplicados a comprobaciones bloqueadas. No se modificaron Laravel ni tests.
