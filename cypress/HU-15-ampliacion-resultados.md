# HU-15 · ampliación y verificación actual

2026-10-11. [Matriz previa](HU-15-cobertura.md).
[Inventario estático](HU-15-inventario.json): **58 casos en 6 specs**, ampliando
los escenarios iniciales, sin mantener una segunda suite duplicada.

## Resultados actuales

| Comprobación | Resultado |
|---|---|
| TypeScript de todas las suites/configuración | Pasó, salida 0 |
| Inventario | 58 títulos únicos; no ejecuta callbacks |
| PNG de frontera | Tamaño exacto y CRC de cada chunk verificados |
| Selección de resets Linux/Windows y guardias | Correcta por comprobación estática |
| HU-15 ampliada | Bloqueada antes de Cypress; cero casos ejecutados |
| HU-9/10/11/12/13/14 | Bloqueadas antes de Cypress; regresiones sin ejecución |

Se intentó primero `podman ps --filter name=income-e2e`, después e2e:types,
e2e:hu15 y cada suite previa, por separado y secuencialmente. Todos salieron
con código 1 antes de acceder a los servicios:

```
set sticky bit on: chmod /run/user/1000/libpod: read-only file system
```

No se pudo inspeccionar contenedores ni ejecutar seed, PHP, PostgreSQL, navegador,
QR externo, uploads o revocación. La política no permite solicitar escalación;
no hay terminal externa disponible ni PHP en PATH para lint. Comandos en README.
No se certifica ausencia de regresiones por el aprobado de TypeScript.

Los 2 aprobados y 8 fallidos del 2026-10-05 se conservan en
[el informe histórico](HU-15-resultados.md). **No son resultados actuales** ni
pueden extrapolarse a los 58 casos nuevos/separados.

## Preservación y cambios

Se compararon 211 archivos previos mediante SHA-256: solo cambiaron los tres
specs autorizados acceso.cy.ts/qr.cy.ts/foto.cy.ts de HU-15. Los otros 208 archivos
comparados, incluidas otras suites, fuentes Laravel, Compose, comandos y
**desactivacion.cy.ts completo (HU15-10)**, permanecen intactos. Laravel mantiene
su modificación previa de package-lock.json. Nuevos helpers/specs/documentos
pertenecen exclusivamente a este proyecto E2E.

Se añadió reset-hu15/state-hu15; HU15-10 conserva reset/state originales. Nuevos
casos tienen fotos distintas persistidas por fixture en storage E2E. La consulta
solo lee BD y hashes de archivos públicos; no expone hashes de contraseña.
Hash::check comprueba la credencial temporal sin alterar la cuenta. Guardias de
configuración pgsql/app_e2e/current_database preceden todas las acciones.

## Cobertura y límites

- Alta/rol/credencial temporal, obligación de cambio y destino final separados.
- Un caso por URL prohibida y enlaces por separado. Autorregistro y modificación
  propia separados de identidad. Nombres/código y CI tienen casos propios.
- Dos perfiles distintos, incluso query con id ajeno: contenido y foto propios.
- Imagen QR/legibilidad y decoder real en casos independientes, ambos contra BD.
  Unicidad separada de predictibilidad; cambio/recarga, invalidación y segunda
  regeneración mediante endpoint real HU-11. La URL data no se usa como decoder.
- Foto JPG/PNG independientes con foto previa de contenido distinto: también
  cubren reemplazo, sin caso redundante adicional. Persistencia exige cambio
  real de URL **o** hash de archivo; admite reemplazar en la misma ruta. Solo
  perfil propio cambia y archivos del otro estudiante permanecen intactos.
- Foto de referencia en HU-11 se verifica independientemente con fixture BD,
  API y UI, sin depender de que la carga desde panel funcione antes.
- Rechazo UI formato/tamaño y HTTP multipart de formato inválido separados,
  con BD y archivos sin cambios. Fronteras 2097151/2097152/2097153 son PNG válidos
  con tEXt y CRC, no contenido renombrado. Los dos tamaños permitidos solo
  comprueban envío del navegador; **no acreditan persistencia** ni contrato servidor.
- Acciones con id ajeno comprueban otro perfil intacto y cambio funcional solo
  del propietario; no permiten que un endpoint vacío pase por autorización útil.
  Visitante no accede a ambas acciones. No se inventaron rutas con id en URL.
- Responsive móvil/tablet: CI separado de controles/layout para no bloquearlos;
  upload y QR en casos distintos, sin decoder repetido por viewport.
- HU15-10 intacto: eliminación de Bruno sin relaciones, cookies anteriores y
  futuros logins rechazados. No exige borrado de alumnos con relaciones protegidas.

## Diferencias actuales, por inspección

Se volvió a revisar el código: las brechas no se asumen a partir del informe viejo.

- /dashboard sigue llevando al estudiante a Mis Exámenes; cambio de contraseña
  termina en ese dashboard. Se conserva destino exclusivo al panel QR.
- Panel no representa CI ni recibe la foto persistida (foto_path null).
- qrPayload sigue siendo ident:v1:+código. E2E demuestra esa predictibilidad;
  no puede certificar entropía criptográfica. Generador inspeccionado sin aleatoriedad.
- Rutas de QR/foto solo retornan back(), sin rotación, guardado ni validación.
  Toast no se considera evidencia. Rechazo de formato backend espera 422 y
  conservación de archivos; no acepta un 200 final tras redirección como rechazo.
- Layout necesita ejecución actual: no se usa el ancho histórico 519px como una
  medición nueva. Decoder externo también sigue sin ejecución por infraestructura.

Errores de red/timeout/HTTP/PNG de api.qrserver.com se etiquetan como infraestructura
QR externa. Contenido decodificado incorrecto, imagen no escaneable o token distinto
son comprobaciones diferentes; no se ocultan mediante stubs o fallback al parámetro URL.
Una primera aserción fallida deja posteriores del mismo caso **no ejecutadas**,
no aprobadas. Separar casos mejora la evidencia, sin suavizar expectativas.

## Pendientes consultados

1. Confirmar JPG/PNG y máximo inclusivo de **2 MiB** como política del servidor.
   Solo está implementado en navegador. Se caracterizan fronteras del cliente;
   rechazo directo de tamaño y fronteras backend quedan sin caso hasta fijar
   política. No se presenta la cifra de ejemplo HU como requisito confirmado.
2. Reactivación requiere definir si exige nuevo login y no restaura cookies
   revocadas. No existe actualmente desactivación/reactivación; cobertura pendiente,
   sin endpoints imaginarios y sin confundir eliminación con reactivación.

No se modificaron producción ni datos de desarrollo/producción. Todas las
sincronizaciones observan peticiones reales y no hay esperas fijas añadidas.

## Resultado completo comunicado posteriormente

58 casos ejecutados: **31 aprobados y 27 fallidos**, sin pendientes ni omitidos. Fuente: resumen aportado por el usuario desde terminal normal; falta log completo, fecha y versión de código para clasificar cada fallo. Este resultado supera el bloqueo de los intentos anteriores; no confirma por sí solo las causas descritas por inspección.
