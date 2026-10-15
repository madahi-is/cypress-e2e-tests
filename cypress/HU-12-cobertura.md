# HU-12 · análisis previo y matriz

2026-10-10. Inspección sin modificar Laravel; matriz presentada antes de implementar.

## Interpretación y diferencias

Estudiante es **opcional**. El mensaje «Debe rellenar este campo para proceder»
se exige únicamente para Examen, Tipo y Descripción. HU-12 menciona HU-3 como
registro automático de ingreso, pero ese flujo corresponde a HU-11 en las HU
proporcionadas. No se exige ingreso previo: los fixtures no tienen registros de
entrada y los casos verifican que registrar una incidencia no los crea.

Fuentes del Laravel original: routes/web.php:93-100, IncidenciaController,
IndexIncidenciaRequest, StoreIncidenciaRequest, Incidencia, migración
2026_09_04_200927_create_incidencias_table, Pages/Incidencias/Index.vue,
Layouts/AuthenticatedLayout.vue y components/ui/{SelectInput,TextInput,Modal,Pagination}.vue.

- GET/HEAD `/incidencias` y POST `/incidencias`: auth, password.pendiente y los
  tres roles requeridos. Menú Incidencias también incluye los tres roles.
- Búsqueda de estudiantes en el cliente sobre la lista real recibida: código,
  documento y nombre/apellido, sin endpoint de búsqueda. Cambiar búsqueda limpia
  selección. No hay mensaje específico de búsqueda vacía: solo opción Ninguno;
  no se inventa un texto obligatorio para ella.
- Store usa Request genérico y validación inline: required, exists, nullable,
  catálogo y descripción string. **StoreIncidenciaRequest no está conectado**;
  su max:1000, enteros explícitos y mensaje personalizado de tipo inválido no
  describen el contrato activo. TrimStrings/ConvertEmptyStringsToNull globales
  deben rechazar espacios como descripción vacía. Se verifica realmente.
- Guarda now() y user()->id(), ignora campos de cliente adicionales, usa
  transacción y redirige con flash. UI cierra modal al éxito. Se exige evidencia
  en PostgreSQL y recarga, no solo toast.
- No hay rutas de edición/baja ni botones. Se contrastará con el registro de
  rutas de Laravel leído por tarea, no solo con el archivo fuente. PUT/PATCH/DELETE
  a la colección existente son pruebas de método no permitido; `/incidencias/{id}`
  es una **sonda de ruta ausente**, ya usada en Feature/IncidenciaTest; no se
  presenta como endpoint existente de edición. Se comprueban 405/404 e integridad.
- Modelo/BD permiten escribir; inmutabilidad HTTP no implica inmutabilidad BD.
  FK examen cascadeOnDelete y estudiante nullOnDelete son riesgos de trazabilidad
  al borrar entidades relacionadas, fuera de criterios confirmados aquí.
- Listado muestra tarjetas, fecha con Date.toLocaleString('es-BO') y username.
  Pagina 15; orden fecha desc/id desc; backend conserva filtros en links.
  **Paginación UI incompatible**: recibe links, pero componente requiere
  currentPage/totalPages y emite change-page sin listener. Se mantiene navegación
  esperada; puede bloquear las comprobaciones de segunda página.
- Fechas: whereDate >= desde y <= hasta. Ambos extremos inclusivos según código;
  se consultó su confirmación como requisito. El caso de extremos se etiqueta
  caracterización de implementación mientras siga pendiente.
- Index valida fechas invertidas/fechas válidas/examen existente/tipo catálogo.
  Son defensivos adicionales, no requisitos nuevos. Relación inexistente al
  guardar también se separa. Texto libre de 1001 caracteres caracteriza la
  ausencia de límite activo, sin reclamar max:1000 como requisito HU.
- Responsive usa filtros en columna bajo 768px y modal con scroll vertical.
  Se comprobará flujo real y ancho del documento/modal; no se presume aprobado.

## Datos independientes

Reset HU-12 conserva reset de suites previas y crea docente, segundo examen y
26 incidencias históricas identificables: 18 Otro/examen principal en 2026-03-11,
cuatro tipos repartidos en 2026-03-10/12, dos límites (00:00:00 y 23:59:59 del 11),
y dos de segundo examen. Estudiante alterna Ana/null. Una acción específica
reset-hu12-empty prepara estado vacío sin borrar datos desde tests HTTP.
Los dos resets restauran exclusivamente app_e2e. No requieren correr otra suite.
Consulta state-hu12: SELECT incidencias, estudiantes, exámenes, usuarios,
registros de ingreso y reloj PHP; además lectura del registro de rutas.

## Matriz criterio → casos → datos → selectores reales

| Criterio | Casos (variantes independientes) | Datos | Selectores/observación |
|---|---|---|---|
| Acceso por interfaz tres roles | HU12-01 ×3 | admin/control/docente | .sidebar-nav a[href="/incidencias"], .panel-title |
| URL y registro autorizado | HU12-02 ×3 | actor por rol, payload válido | GET/POST /incidencias con CSRF, DB actor |
| Estudiante/visitante rechazados | HU12-03/04 | Ana/sin sesión | menú ausente, URL 403/redirect, POST 403/401, snapshot |
| Examen seleccionable/catálogo completo | HU12-05 ×4 | cada tipo, Ana | modal label for EXAMEN/TIPO, opciones, textarea, POST observado, DB |
| Estudiante opcional | HU12-06 | estudiante null | .select-html opción Ninguno, sin error, DB null |
| Búsqueda código/documento/nombre | HU12-07 ×3 | Ana independiente | placeholder Buscar por código..., .select-html opciones, DB id exacto |
| Sin resultados | HU12-08 | dato desconocido | opciones solo Ninguno, selección vacía, sin escritura |
| Cambio de búsqueda limpia asociación | HU12-09 (comportamiento adicional) | Ana → Bruno | .select-html valor vacío |
| Obligatorios vacíos UI | HU12-10 ×3 | cada campo vacío, resto válido | .form-group .error-msg exacto; POST real/DB |
| Obligatorios vacíos endpoint | HU12-11 ×3 | payload vacío por campo | POST 422, errors campo mensaje exacto, snapshot |
| Espacios no son motivo válido | HU12-12 UI/endpoint | descripción espacios | error obligatorio, snapshot |
| Cancelar | HU12-13 | formulario completado | .btn-cancelar, modal ausente, snapshot |
| Fecha/usuario automáticos | HU12-14 | valores falsos en POST | DB actor/hora entre lecturas PHP |
| Valores no editables | HU12-15 | modal abierto | conjunto de inputs/select/textarea; sin fecha/usuario |
| Recarga y listado completo | HU12-16 con/sin alumno | ingreso real registrado | .incidencia-card, .card-examen/.badge-tipo/.card-descripcion/.card-footer, recarga, DB |
| Estado vacío | HU12-17 | reset-hu12-empty | .empty-state, sin tarjetas |
| Paginación | HU12-18 | 26 filas | .pagination button Siguiente/Anterior, GET observado, descripciones de cada página |
| Filtros individuales | HU12-19 examen/tipo/rango | conjunto histórico | .filters-container select (posición real), input[title=Desde/Hasta], GET observado |
| Filtros combinados/limpieza | HU12-20/21 | examen+tipo+fechas | mismos controles; conjunto exacto y URL |
| Sin coincidencias | HU12-22 | fechas 2000 | .empty-state, sin tarjetas |
| Extremos inclusivos (caracterización pendiente) | HU12-23 | fechas 11 a 11, límites de medianoche | API/listado con selección exacta de fixtures |
| Paginación conserva filtros | HU12-24 | principal/Otro/11: >15 | controles+URL+segunda página; links backend |
| Sin edición/baja UI | HU12-25 | fixtures | ausencia acciones/a de edición/baja en tarjetas |
| Registro de rutas inmutable | HU12-26 | colección rutas Laravel | tarea readonly: GET/HEAD/POST únicamente |
| Métodos no mutan | HU12-27 roles × PUT/PATCH/DELETE | fixture existente | colección 405, sonda recurso 404, snapshot PostgreSQL |
| Responsive | HU12-28 móvil/tablet | 390×844/768×1024 | filtros, tarjetas, modal, error legible, submit real, ancho documento/modal |
| Tipo ajeno al catálogo | HU12-29 | Robo | POST autenticado 422, errors tipo, snapshot |
| Relaciones inexistentes (adicional) | HU12-30 examen/estudiante | ID 2147483647 | POST 422, snapshot |
| Fechas invertidas (adicional) | HU12-31 | desde > hasta | GET JSON 422, errors hasta, snapshot |
| Texto >1000 (caracterización adicional) | HU12-32 | 1001 caracteres | POST real, DB texto íntegro; no confirma regla max |

Los tests no sustituyen respuestas ni agregan selectores a producción. Se observan
POST y GET reales; búsqueda de alumno es local y no se inventa petición. No hay
esperas fijas. Un primer fallo bloquea aserciones posteriores: quedan no ejecutadas.
