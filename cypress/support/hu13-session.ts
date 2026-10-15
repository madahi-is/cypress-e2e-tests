// Cookie jar independiente: no utiliza ni cambia las cookies del navegador Cypress.
export async function independentCheckin(baseUrl: string, input: { id_estudiante: number; id_examen: number; id_examen_ambiente: number; dato: string }) {
  const origin = new URL(baseUrl)
  if (origin.protocol !== 'http:' || !((origin.hostname === 'web' && !origin.port) || (origin.hostname === 'localhost' && origin.port === '8082'))) throw new Error('HU-13 solo permite la instancia HTTP E2E')
  for (const id of [input.id_estudiante, input.id_examen, input.id_examen_ambiente]) if (!Number.isSafeInteger(id) || id <= 0) throw new Error('Identificador inválido')
  const cookies = new Map<string, string>()
  async function call(path: string, init: RequestInit = {}) {
    const headers = new Headers(init.headers)
    if (cookies.size) headers.set('Cookie', [...cookies].map(([k,v]) => `${k}=${v}`).join('; '))
    const r = await fetch(new URL(path, origin), { ...init, headers, redirect: 'manual' })
    if (r.headers.get('x-e2e-database') !== 'app_e2e') throw new Error('Instancia HTTP no aislada')
    for (const cookie of r.headers.getSetCookie()) {
      const pair = cookie.split(';')[0]; const separator = pair.indexOf('='); cookies.set(pair.slice(0,separator),pair.slice(separator+1))
    }
    return r
  }
  const token = (html: string) => {
    const t = html.match(/<meta\s+name="csrf-token"\s+content="([^"]+)"/)
    if (!t) throw new Error('CSRF no encontrado en la página real')
    return t[1]
  }
  const guest = await call('/login')
  if (guest.status !== 200) throw new Error('Login E2E no disponible')
  const auth = await call('/login', { method:'POST', body:new URLSearchParams({ _token:token(await guest.text()), identificador:'segundo.control.hu13@example.test', password:'E2ePassword!2026' }) })
  if (![302,303].includes(auth.status)) throw new Error(`Autenticación independiente: ${auth.status}`)
  const page = await call('/registro-ingreso')
  if (page.status !== 200) throw new Error(`Sesión independiente rechazada: ${page.status}`)
  const headers = { 'Content-Type':'application/json', Accept:'application/json', 'X-CSRF-TOKEN':token(await page.text()) }
  const validate = await call('/registro-ingreso/validar',{ method:'POST',headers,body:JSON.stringify({ id_examen:input.id_examen,dato_estudiante:input.dato }) })
  const identity = await validate.json() as { id_estudiante?: number }
  if (validate.status !== 200 || identity.id_estudiante !== input.id_estudiante) throw new Error(`Verificación independiente rechazada: ${validate.status}`)
  const saved = await call('/registro-ingreso',{ method:'POST',headers,body:JSON.stringify({ id_estudiante:input.id_estudiante,id_examen_ambiente:input.id_examen_ambiente }) })
  const result = await saved.json() as { success?: boolean }
  if (saved.status !== 200 || result.success !== true) throw new Error(`Check-in independiente rechazado: ${saved.status}`)
  return { status:saved.status, email:'segundo.control.hu13@example.test' }
}
