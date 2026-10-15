# HU-11 · análisis previo y matriz

Fecha: 2026-10-10. Fuente: HU-11 y ampliación de cobertura proporcionadas por el usuario.
Análisis presentado antes de implementar tests. Laravel se inspecciona sin editarlo.

## Implementación y diferencias

- `routes/web.php:93-100`: GET `/registro-ingreso`, POST
  `/registro-ingreso/validar`, POST `/registro-ingreso` bajo auth,
  password.pendiente y role:administrador,docente,personal de control de ingreso.
  Middleware de rol excluye estudiantes; auth excluye visitantes.
- **Menú:** AuthenticatedLayout ofrece Registrar Ingreso solo a control.
  Se mantiene la expectativa de acceso por interfaz para los tres roles, y se
  separa de pruebas de URL/endpoint para evitar ocultar estas por el fallo del menú.
- Index del controller lista exámenes con fecha >= hoy y sus ambientes asociados.
  Vista `Control/RegistroIngreso/Index.vue`: paso de examen/ambiente, identificación,
  confirmación visual, Cancelar y Confirmar ingreso. SelectInput y TextInput tienen
  IDs generados; se resuelve cada control mediante el for de su label real.
- validarEstudiante busca exactamente por código, documento o codigo_qr. Rechaza
  desconocido (404 con texto HU), falta/false habilitación (403), o ingreso previo
  en cualquier ambiente del examen (409, hora Carbon H:i del registro persistido).
- **Motivo vacío:** se usa `??` y no se sustituye una cadena vacía; la UI cae en
  «Error al validar al estudiante.» por su operador `||`. Caso sin motivo cubre
  tanto NULL como cadena vacía y conserva el mensaje por defecto de HU-11.
- **Guardado:** valida solo enteros requeridos de estudiante y examen_ambiente;
  no verifica nuevamente habilitación ni exige haber buscado. Se prueba que no
  pueda guardarse directamente un no habilitado. Ese rechazo es parte del criterio
  explícito de impedir ingresos no habilitados, no una regla inventada de interfaz.
- **Mensaje duplicado de guardado:** `Registro duplicado detectado.` (409), distinto
  del texto HU con hora. Se prueba protección secuencial y mensaje exacto por separado.
- RegistroIngreso usa `auth()->id()` y `now()`; FK a estudiante, usuario y pivot.
  `timestampTz` con default servidor. Unique solo (estudiante,examen_ambiente).
  No hay unique (estudiante,examen), bloqueo ni transacción que serialice la
  comprobación y alta. Es riesgo de concurrencia por inspección, no fallo concurrente
  certificado. **No se añade caso concurrente:** los reenvíos son secuenciales y
  no se presentan como evidencia de protección concurrente.
- ExamenAmbiente vincula examen y ambiente, con unique(examen,ambiente).
  FK impide guardar un vínculo inexistente, pero store desreferencia el resultado
  de find sin comprobarlo; el caso defensivo espera 422, puede encontrar error 500.
- La UI limpia dato/confirmación tras éxito y conserva contexto, pero usa layouts
  sin reglas responsive específicas en esta vista. Se probará el ancho real y
  los controles en cada paso; no se concluye cumplimiento por CSS ni por inspección.

## Datos independientes y reloj

reset-hu11 es independiente de HU-9/HU-10. Reutiliza únicamente el reset común
HU-15 como base, después agrega sus fixtures exclusivos; no altera otros resets.
Ana y Bruno habilitados para el examen principal; Ana habilitada también para el
segundo. Carla inhabilitada con motivo, Diego sin motivo NULL, Gina con motivo
vacío, Elena sin habilitación y Fabio habilitado solamente para otro examen.
Dos ambientes del examen principal, un ambiente exclusivo del segundo y un
tercer examen sin ambientes. Docente dedicado, admin/control/estudiantes de base.
No hay ingresos iniciales. IDs devueltos por helper; no se asumen valores.

Las identidades/relaciones son fijas. La fecha de los exámenes es el día del
servidor para que aparezcan en el catálogo vigente; no se falsifica el reloj PHP.
Foto PNG real copiada del proyecto E2E al volumen storage exclusivo, con guard
que exige /var/www/storage dentro del runner; nunca se copia a Laravel del host.

state-hu11 es una tarea de solo lectura bajo los mismos guards app_e2e.
Devuelve los registros unidos a examen/ambiente, epoch persistido y hora_mensaje
Carbon H:i, además de la hora actual PHP en segundos. El instante persistido se
compara entre lecturas anterior/posterior al envío; sin tolerancia arbitraria ni
umbral de velocidad. Precisión de segundos coherente con la serialización de now()
y de la columna; no se usa cy.clock para modificar el servidor.

## Matriz criterio → casos → datos → selectores reales

| Criterio | Casos propuestos | Datos | Selectores / endpoint real |
|---|---|---|---|
| Acceso por interfaz permitido | HU11-01 control/docente/admin | Tres operadores | `.sidebar-nav a[href="/registro-ingreso"]`, `.titulo-principal` |
| URL y endpoints permitidos | HU11-02 control/docente/admin | Ana habilitada, principal/Norte | GET página, POST validar/store con CSRF, DB usuario correcto |
| Estudiante rechazado | HU11-03 | Ana autenticada | Menú ausente; GET/POST validar/store 403; URL sin controles; DB sin ingreso |
| Visitante rechazado | HU11-04 | Sin sesión, CSRF del login | Endpoints JSON 401, URL a login, DB intacta |
| Selección obligatoria | HU11-05 | Ningún contexto / examen sin ambiente seleccionado | labels EXAMEN ACTIVO/AMBIENTE → for; INICIAR REGISTRO deshabilitado; sin input lector |
| Ambientes de cada examen | HU11-06 | Dos del principal, uno del segundo | Opciones del select AMBIENTE equivalen a pivots del helper |
| Cambio de examen limpia ambiente | HU11-07 | Principal/Norte → segundo/exclusivo | Cambio select EXAMEN ACTIVO; valor AMBIENTE vacío, iniciar deshabilitado |
| Examen sin ambientes | HU11-08 (límite) | Tercer examen sin pivots | Select solo placeholder; inicio deshabilitado |
| Identificar por cada mecanismo | HU11-09 código/documento/QR | Ana, siempre sin ingreso previo | input `placeholder="Escanear o escribir..."`, BUSCAR/Enter; intercept validar; QR real escrito como lector, sin cámara |
| Desconocido exacto | HU11-10 | Dato inexistente | `.alerta-error` exacta, respuesta 404 y snapshot sin ingresos |
| Motivo/default/falta/otro examen | HU11-11 cinco variantes | Carla/Diego/Gina/Elena/Fabio | Validar 403, `.alerta-error`, no `.confirmacion-box`, snapshot |
| Impedir no habilitado en guardado directo | HU11-12 cinco variantes | Mismos alumnos, pivot principal | POST store con CSRF → 403, DB sin registros |
| Identidad y foto antes de confirmar; búsqueda no escribe; hora no editable | HU11-13 | Ana con PNG real | `.nombre-estudiante`, `.foto-perfil` visible/naturalWidth, sin inputs de fecha/hora; snapshot |
| Cancelar y continuar | HU11-14 | Ana → cancelar → Bruno | Cancelar, input vacío y BUSCAR, DB sin ingreso |
| Confirmación y persistencia, hora/usuario | HU11-15 | Control, Ana, principal/Norte | Confirmar ingreso, intercept store real, state-hu11 antes/después, IDs y epoch |
| Hora/usuario no controlados por payload | HU11-16 (defensivo asociado al criterio) | Fecha falsa y otro id_usuario | POST store, DB actor autenticado y ventana PHP |
| Preparado para otro alumno sin recarga ni pérdida de contexto | HU11-17 | Ana y Bruno | Misma referencia Document, `.resumen-valor`, input/confirmación, contador y dos registros |
| Segundo ingreso al mismo examen en cualquier ambiente | HU11-18 mismo/otro | Registro previo creado realmente, hora del helper | Validar 409, `.alerta-error` con hora H:i real; exactamente un registro intacto |
| Reenvío secuencial al guardado | HU11-19 mismo/otro | Primer POST exitoso, segundo POST independiente secuencial | store 409; DB conserva un registro; no se atribuye cobertura concurrente |
| Mensaje de guardado comparado con HU | HU11-20 | Registro previo del propio caso | `error` de store exacto con hora; prueba separada de la integridad |
| Mismo alumno en otro examen habilitado | HU11-21 | Ana en principal y segundo | Cambiar contexto, validar/confirmar dos veces, dos filas vinculadas a distintos exámenes |
| Móvil/tablet | HU11-22 móvil/tablet | 390×844 y 768×1024 | Controles visibles, acciones reales, foto/confirmación, scrollWidth <= innerWidth en cada paso, persistencia |
| Validación de selección/identificación en endpoint | HU11-23 examen/dato ausente (defensivo) | Payload incompleto | validar 422, error por campo, sin ingresos |
| Guardado incompleto | HU11-24 estudiante/pivot ausente (defensivo) | Payload incompleto | store 422, error por campo, sin ingresos |
| Pivot inexistente | HU11-25 (defensivo) | ID superior al máximo | store 422 esperado, snapshot; posible error de servidor según inspección |

Las variantes son casos independientes. La cantidad final se registra en inventario.
Todas las sincronizaciones observan peticiones reales con cy.intercept; no hay
stubs de éxito, pausas fijas ni pruebas de velocidad sin umbral de la HU.

## Riesgos adicionales consultados, pendientes de definición

1. Inhabilitación entre búsqueda y confirmación: store no consulta el estado
   vigente. Se pidió confirmar política de rechazo y motivo. No se añade una
   tarea de escritura para ese escenario mientras no haya respuesta; los casos
   explícitos de no habilitado desde el inicio sí se implementan.
2. Examen declarado A y pivot de B: store solo recibe el pivot. Un pivot válido
   determina unívocamente su examen; no se inventa una selección de sesión que
   el servidor no conoce. Se consultó si un id_examen adicional debe validarse.
   Pendiente, no se presenta ese resultado como criterio confirmado.
3. Concurrencia: no probada. Unique por pivot no garantiza unicidad por examen
   ante dos solicitudes solapadas en ambientes distintos. Reenvíos secuenciales
   no sustituyen solicitudes independientes simultáneas.

## Bloqueos previsibles

Podman ya falló al consultar contenedores por libpod de solo lectura. Se intentarán
HU-11 y todas las suites previas secuencialmente, documentando fallos de infraestructura
antes de los specs. Los fallos funcionales dentro de un caso bloquean sus aserciones
posteriores, que no se cuentan como aprobadas.
