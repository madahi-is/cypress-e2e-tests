# HU-13 · análisis previo y matriz

2026-10-11. README, AGENTS y helpers/suites existentes (especialmente HU-11)
revisados antes de implementar. Laravel permanece sin modificaciones.

## Panel y evidencia

Sí existe `Control/PanelAsistencia.vue`, servido por `PanelAsistenciaController`
y GET/HEAD `/panel-asistencia` (routes/web.php:101), dentro de auth,
password.pendiente y role administrador/docente/control. Menú Panel Asistencia
incluye esos roles. No se confunde con dashboard ni listado de habilitaciones.

El mismo endpoint sirve selección, JSON y refrescos parciales Inertia. Vue usa
`setInterval(refrescar, 3000)`; router.reload solicita ambientes/pendientes/resumen,
con preserveScroll; no hay WebSocket ni SSE. watcher sobre examen.id/cerrado inicia
el timer; cerrado o desmontaje lo detienen. Búsqueda local conserva su ref durante
refresco. No se inventan endpoints de actualización.

## Diferencias y consultas

- Examen.estado_horario: programado antes del inicio, en_curso hasta inicio+
  duración, finalizado después. estado_actual también admite suspendido/cancelado/
  anulado. Catálogo excluye cancelado/anulado y finalizados, pero incluye **cualquier
  futuro**, sin ventana de «próximo». Se consultó cuántos minutos corresponde.
- Consulta directa puede seleccionar examen finalizado y mostrar cierre; resumen
  cerrado si finalizado/cancelado/anulado. No hay instantánea final persistida:
  se recalcula asistencia. Cambiar horario puede reabrir. Se consultó política.
- No existe id_ambiente en habilitación. Pendientes son una lista **global**, con
  nota explícita de falta de asignación. Cada ambiente muestra ingresos reales,
  pero no sus pendientes; repite total_habilitados del examen como denominador.
  Incumplimiento de las dos listas por ambiente. Se exige presencia del texto
  requerido en tarjetas reales, sin inventar selectores de listas ausentes.
  Distribución y totales exactos por ambiente quedan pendientes de regla de asignación.
- Ingresos se consultan sin intersectar habilitados: alguien inhabilitado después
  de ingresar continúa apareciendo. Se consultó qué debe ocurrir en ese caso;
  no se fabrica registro de un no habilitado mediante bypass para darlo por criterio.
- Resumen ingresaron cuenta registros, no IDs únicos. Unique BD es por alumno/pivot,
  no alumno/examen: potencial duplicación concurrente, documentada en HU-11.
  Fixtures válidos y check-in real no generan datos duplicados artificiales.
- Contadores globales no cambian por búsqueda; contador pendiente muestra
  resultados filtrados de total. Se pidió confirmar interpretación; se caracteriza
  comportamiento actual mientras esté pendiente.

## Datos y sesión independiente

Reset exclusivo app_e2e: tres exámenes en curso (dos ambientes, uno, y otro), uno
futuro lejano para caracterización, uno finalizado ayer para cierre observable.
Horarios relativos al reloj PHP; examen principal con margen de horas para no
cerrarse accidentalmente durante tests. Cuatro habilitados principales: Ana,
Bruno, Carla, Diego; Elena false y Fabio sin habilitación. Segundo examen Ana/Elena
true (contrasta false en principal). No se insertan check-ins en seed.

Se reutilizan tipos y snapshot de HU-11; la verificación especializada exige el segundo actor. Nueva tarea HTTP
crea cookie jar independiente en Node, autentica un segundo usuario de control,
obtiene CSRF vigente, valida y guarda por endpoints reales de HU-11. No altera
cookies/sesión del panel ni inserta ingresos en SQL. Comprobar app_e2e antes de HTTP
mediante consulta protegida y cabecera aislada. state-hu13 solo lee BD y código
fuente del polling para conocer intervalo, sin cambios de horario/habilitación.

## Matriz criterio → casos → datos → selectores reales

| Criterio | Casos | Datos | Selectores y sincronización |
|---|---|---|---|
| Menú tres roles | HU13-01 ×3 | admin/docente/control | .sidebar-nav a[href="/panel-asistencia"], .panel-title |
| URL/consulta/refresco tres roles | HU13-02 ×3 | principal | GET JSON y parcial Inertia reales, .selector select, GET observado |
| Estudiante/visitante rechazados | HU13-03/04 | Ana/sin sesión | URL, GET JSON y parcial mismo endpoint, menú ausente, BD intacta |
| Selección en curso | HU13-05 | reloj servidor | .selector select, .estado-chip, resumen/listas |
| Próximo/futuro (caracterización) | HU13-06 | futuro +30 días | opciones y selección existentes; no acredita ventana confirmada |
| Cambio sustituye datos | HU13-07 | Ana principal / Elena otro | GET observado, tarjetas, códigos, contadores; sin mezcla |
| Agrupación de ingresos | HU13-08 uno/múltiples | entradas reales | .ambiente-card, .ambiente-nombre, .item-codigo/.item-nombre/.item-hora |
| Dos listas por ambiente | HU13-09 uno/múltiples | pendientes | tarjetas existentes contienen «Ingresaron»/«No se han presentado»; incumplimiento esperado por inspección |
| Estados y contadores globales | HU13-10 pendientes/parcial/todos | 4 alumnos principales | .resumen-card, listas exactas, ingresados+pendientes=habilitados |
| Inhabilitados/sin habilitación fuera | HU13-11 | Elena/Fabio sin entrada | ambas listas, API y BD |
| Otro examen no afecta principal | HU13-12 | Ana ingresa otro | listas exactas y resumen |
| Sin repetición de ingresados por ambiente | HU13-13 | Ana norte/Bruno sur | códigos únicos, suma de ingresos y resumen |
| Totales habilitados no se suman dos veces | Pendiente | no hay asignación | denominadores actuales repiten global; no inventar reparto ni expectativa sumable |
| Búsqueda nombre/código | HU13-15 ×2 | Ana | input[placeholder="Buscar por nombre o codigo universitario"], pendientes filtrados; resumen global caracterizado |
| Sin coincidencias/limpieza | HU13-16 | texto desconocido | .pendientes-card .lista-vacia, input, listas restauradas |
| Nuevo ingreso actualiza sin recarga | HU13-17 norte/sur | segundo usuario control | tarea sesión independiente, POST reales, polling parcial observado, documento mismo, hora BD, filtro conservado |
| Otro examen no mezcla actualización | HU13-18 | Elena en otro | polling principal observado, filtro/contadores intactos |
| Cerrado conserva asistencia observable | HU13-19 (cierre por horario actual) | finalizado ayer, estado sin ingresos | URL existente, .estado-chip cerrado, resumen/BD/hora; no certifica regla de reapertura |
| Cerrado no consulta automáticamente | HU13-20 | finalizado ayer | observar GET parciales durante 2 intervalos leídos (3000ms); excluir carga inicial/inflight |
| Transición vivo→cerrado | Pendiente política | helper de cierre no añadido sin definición | watcher/clearInterval existen; comprobar transición después de confirmar política |
| Pendientes/totales por ambiente | No implementado, pendiente asignación | relación ausente | evidencia controller, modelo/migración y nota vista; no selectores inventados |
| Excluir ingreso luego inhabilitado | Pendiente definición | regla consultada | evidencia ingresos sin filtro; sin test que confirme regla adicional |

Se observan peticiones reales; no hay stubs, recarga manual en casos live ni SLA
inventado. Ventana de ausencia de polling deriva del intervalo del código y se
usa solo para comprobar detención. No se usa cy.clock para pretender cambiar PHP.
Errores de red/reconexión, permisos por examen, concurrencia y reapertura tras
cambio de horario son adicionales sin resultado definido: documentados, no confirmados.
