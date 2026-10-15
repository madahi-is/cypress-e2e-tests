import { type Hu11Data, type Entry, snapshot } from '../HU-11/helpers.js'
export interface Data extends Hu11Data { poll_interval_ms: number }
export const roles = ['personal de control de ingreso','docente','administrador']
export const data = () => cy.get<Data>('@data')
export const state = () => cy.task<Data>('database','state-hu13')
export const exam = (d: Data, title = 'Principal HU13') => d.exams.find((e) => e.title === title)!
export const student = (d: Data, name = 'Ana') => d.students.find((s) => s.nombres === name)!
export function pivot(d: Data, title = 'Principal HU13', room = 'Norte HU13') {
 const id = exam(d,title).id_examen
 return d.pivots.find((p) => p.id_examen === id && (title !== 'Principal HU13' || p.id_ambiente === d.rooms.find((r) => r.nombre_ambiente === room)!.id_ambiente))!
}
export function login(d: Data, role = roles[0]) { return cy.login(d.users.find((u) => u.role === role)!.email) }
export function page(d: Data, title?: string, role = roles[0]) { login(d,role); cy.visit(title ? `/panel-asistencia?id_examen=${exam(d,title).id_examen}` : '/panel-asistencia'); cy.get('.panel-title').should('have.text','PANEL DE ASISTENCIA') }
let serial = 0
export function select(d: Data, title = 'Principal HU13') {
 const alias = `hu13Select${++serial}`; cy.intercept('GET','**/panel-asistencia*').as(alias)
 cy.get('.selector select').select(String(exam(d,title).id_examen)); cy.wait(`@${alias}`).its('response.statusCode').should('eq',200)
}
export function query(d: Data, title = 'Principal HU13', partial = false) {
 return cy.request({ url:`/panel-asistencia?id_examen=${exam(d,title).id_examen}`, headers:partial ? { 'X-Inertia':'true', 'X-Inertia-Partial-Component':'Control/PanelAsistencia', 'X-Inertia-Partial-Data':'ambientes,pendientes,resumen', Accept:'text/html, application/xhtml+xml' } : { Accept:'application/json' }, failOnStatusCode:false,followRedirect:false })
}
export const unchanged = (d: Data) => state().then((s) => expect(snapshot(s)).to.deep.eq(snapshot(d)))
export const search = () => cy.get('.pendientes-card input[placeholder="Buscar por nombre o codigo universitario"]')
export function codes(selector: string, expected: string[]) {
 cy.get('body').should(($body) => expect([...$body.find(selector)].map((e) => e.textContent!.trim()).sort()).to.deep.eq([...expected].sort()))
}
export function summary(h: number, i: number, p: number) {
 for (const [label,value] of [['Habilitados', String(h)],['Ingresaron', `${i}/${h}`],['Pendientes',String(p)]]) cy.contains('.resumen-card .resumen-label',label).closest('.resumen-card').find('.resumen-valor').should('have.text',value)
 expect(i+p,'conjunto válido sin inhabilitación posterior').to.eq(h)
}
export function lists(d: Data, s: Data, title = 'Principal HU13') {
 const id = exam(d,title).id_examen
 const enabled = d.habilitations.filter((h) => h.id_examen === id && h.estado_habilitado).map((h) => h.id_estudiante)
 const entries = s.records.filter((r) => r.id_examen === id)
 const registered = entries.map((r) => r.id_estudiante)
 codes('.ambientes-grid .item-codigo',registered.map((id) => d.students.find((s) => s.id_estudiante === id)!.codigo_universitario))
 codes('.pendientes-card .item-codigo',enabled.filter((id) => !registered.includes(id)).map((id) => d.students.find((s) => s.id_estudiante === id)!.codigo_universitario))
 summary(enabled.length,registered.length,enabled.length-registered.length)
}
export function entry(d: Data, r: Entry) {
 const room = d.rooms.find((a) => a.id_ambiente === r.id_ambiente)!
 cy.contains('.ambiente-card .ambiente-nombre',room.nombre_ambiente).closest('.ambiente-card').within(() => {
  const s = d.students.find((s) => s.id_estudiante === r.id_estudiante)!
  cy.contains('.item-codigo',s.codigo_universitario).closest('.lista-item').within(() => {
   cy.get('.item-nombre').should('have.text',`${s.nombres} ${s.apellidos}`)
   cy.window().then((win) => { const hour = new win.Date(r.fecha_hora_ingreso).toLocaleTimeString('es-BO',{ hour:'2-digit',minute:'2-digit' }); cy.get('.item-hora').should('have.text',hour) })
  })
 })
}
export function checkin(d: Data, name = 'Ana', p = pivot(d)) {
 return state().then((before) => {
  const s = student(d,name)
  cy.task('hu13Checkin',{ id_estudiante:s.id_estudiante,id_examen:p.id_examen,id_examen_ambiente:p.id_examen_ambiente,dato:s.codigo_universitario },{ log:false }).then((r) => expect(r).to.deep.eq({ status:200,email:'segundo.control.hu13@example.test' }))
  return state().then((after) => {
   expect(after.records).to.have.length(before.records.length+1)
   const r = after.records.find((r) => !before.records.some((old) => old.id_registro === r.id_registro))!
   expect(r).to.include({ id_estudiante:s.id_estudiante,id_examen:p.id_examen,id_ambiente:p.id_ambiente,id_examen_ambiente:p.id_examen_ambiente,id_usuario:d.users.find((u) => u.email === 'segundo.control.hu13@example.test')!.id })
   expect(r.ingreso_epoch).to.be.at.least(before.server_epoch).and.at.most(after.server_epoch)
   expect(after.records.filter((i) => i.id_registro !== r.id_registro)).to.deep.eq(before.records)
   expect(snapshot({ ...after,records:d.records })).to.deep.eq(snapshot(d))
   return after
  })
 })
}
export function poll() {
 const alias = `hu13Poll${++serial}`
 let armed = false
 cy.intercept('GET','**/panel-asistencia*',(req) => { if (armed && req.headers['x-inertia-partial-data']) req.alias = alias })
 return () => {
  // Solo solicitudes iniciadas después de confirmar el commit; excluye polling en vuelo.
  cy.then(() => { armed = true })
  return cy.wait(`@${alias}`).then((r) => { expect(r.response?.statusCode).to.eq(200); return r.response!.body.props as { resumen:{ ingresaron:number; pendientes:number }; pendientes:{ id_estudiante:number }[] } })
 }
}
export function denied(d: Data, status: number) {
 query(d).its('status').should('eq',status); query(d,'Principal HU13',true).its('status').should('eq',status); unchanged(d)
}
