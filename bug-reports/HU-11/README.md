# Reportes HU-11

**44 ejecutados: 10 aprobados y 34 fallidos**, sin pendientes ni omitidos. Duración: **8 min 40 s**. Fuente: fragmento detallado y resumen final aportados; no se reejecutó la suite.

| Reporte | Tema | Casos fallidos documentados | Clasificación |
|---|---|---:|---|
| [CS21](CS21.md) | Guardado sin comprobación de habilitación | 5 | Omisión funcional; persistencia posterior no alcanzada |
| [CS22](CS22.md) | Ambiente inexistente produce HTTP 500 | 1 | Validación defensiva adicional |
| [CS23](CS23.md) | Mensaje de duplicado sin hora | 1 | Incumplimiento del mensaje |
| [CS24](CS24.md) | TypeError cy.subjectChain del runner | 15 | Automatización/runner; raíz pendiente |
| [CS25](CS25.md) | Opciones de ambiente vacías | 1 | En investigación |
| **Total con bloques de error** | **5 reportes** | **23** | |

**Faltan 11 errores individuales:** seis de acceso.cy.ts y cinco de confirmacion.cy.ts. No se inventaron bugs para esos once fallos. Los cinco títulos de confirmación se conocen por inventario y total del archivo; en acceso faltan también las marcas para identificar sus seis fallidos entre ocho títulos.

Prioridad y severidad son propuestas de triaje. Las capturas se referencian según la salida, sin inventar attachments disponibles. [Detalle de títulos y resultados](../../cypress/HU-11-ejecucion-detallada.md).
