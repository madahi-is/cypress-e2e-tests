import { csrf, type Student } from '../../support/commands.js'
export const types = ['Expulsión', 'Problema de identificación', 'Cambio de ambiente', 'Otro']
export const roles = ['personal de control de ingreso', 'docente', 'administrador']
export const required = 'Debe rellenar este campo para proceder'
export interface Incident { id_incidencia: number; id_examen: number; id_estudiante: number | null; id_usuario: number; tipo_incidencia: string; descripcion_motivo: string; fecha_hora: string; fecha_epoch: number; fecha_dia: string }
export interface Data {
 server_epoch: number; records: Incident[]; entries: unknown[]; students: Student[];
 exams: { id_examen: number; title: string; fecha: string }[];
 users: { id: number; email: string; username: string; role: string }[];
 routes: { uri: string; methods: string[]; name: string }[];
}
export interface Payload { id_examen: number | string; id_estudiante: number | null; tipo_incidencia: string; descripcion_motivo: string }
export const data = () => cy.get<Data>('@data')
export const state = () => cy.task<Data>('database', 'state-hu12')
export const actor = (d: Data, role = roles[0]) => d.users.find((u) => u.role === role)!
export const student = (d: Data, name = 'Ana') => d.students.find((s) => s.nombres === name)!
export const exam = (d: Data, second = false) => d.exams.find((e) => e.title === (second ? 'Segundo examen HU12' : 'Incidencias HU12'))!
export const payload = (d: Data, withStudent = true, type = 'Otro'): Payload => ({ id_examen: exam(d).id_examen, id_estudiante: withStudent ? student(d).id_estudiante : null, tipo_incidencia: type, descripcion_motivo: 'Reporte real HU12' })
export const login = (d: Data, role = roles[0]) => cy.login(actor(d, role).email)
export function page(d: Data, role = roles[0]) { login(d, role); cy.visit('/incidencias'); cy.get('.panel-title').should('contain', 'GESTIÓN DE INCIDENCIAS') }
export function open() { cy.get('.btn-reportar').click(); cy.get('.modal-container').should('be.visible') }
export function select(label: string) { return cy.contains('.modal-container label', label).invoke('attr', 'for').then((id) => cy.get<HTMLSelectElement>(`#${id}`)) }
export const search = () => cy.get('.modal-container input[placeholder="Buscar por código, documento o nombre..."]')
export const description = () => cy.get('.modal-container textarea[placeholder="Describe la incidencia en detalle..."]')
export function fill(p: Payload) {
 select('EXAMEN *').select(String(p.id_examen)); select('TIPO DE INCIDENCIA *').select(p.tipo_incidencia)
 cy.get('.modal-container .select-html').select(p.id_estudiante === null ? '' : String(p.id_estudiante))
 description().clear().type(p.descripcion_motivo, { parseSpecialCharSequences: false })
}
let serial = 0
export function save(success = true) {
 const alias = `hu12Save${++serial}`; cy.intercept('POST', '**/incidencias').as(alias)
 cy.get('.modal-container .btn-guardar').click(); cy.wait(`@${alias}`).then((r) => expect(r.response?.statusCode).to.be.oneOf([302, 303]))
 if (success) cy.get('.modal-container').should('not.exist')
 else cy.get('.modal-container').should('be.visible')
}
export function request(method: string, url = '/incidencias', body?: Cypress.RequestBody) {
 return csrf().then((token) => cy.request({ method, url, body, headers: { 'X-CSRF-TOKEN': token!, Accept: 'application/json', Referer: `${Cypress.config('baseUrl')}/incidencias` }, failOnStatusCode: false, followRedirect: false }))
}
export const snapshot = ({ server_epoch: _time, ...rest }: Data) => rest
export const unchanged = (d: Data) => state().then((after) => expect(snapshot(after)).to.deep.eq(snapshot(d)))
export function persisted(d: Data, before: Data, after: Data, p: Payload, role = roles[0]) {
 expect(after.records).to.have.length(before.records.length + 1)
 const r = after.records.find((r) => !before.records.some((old) => old.id_incidencia === r.id_incidencia))!
 expect(r).to.include({ id_examen: Number(p.id_examen), id_estudiante: p.id_estudiante, id_usuario: actor(d, role).id, tipo_incidencia: p.tipo_incidencia, descripcion_motivo: p.descripcion_motivo })
 expect(r.fecha_epoch, 'reloj PHP entre lecturas, precisión segundos').to.be.at.least(before.server_epoch).and.at.most(after.server_epoch)
 expect(after.records.filter((i) => i.id_incidencia !== r.id_incidencia)).to.deep.eq(before.records)
 expect(snapshot({ ...after, records: d.records })).to.deep.eq(snapshot(d))
 return r
}
export function submit(d: Data, p: Payload, role = roles[0]) {
 return state().then((before) => { save(); return state().then((after) => persisted(d, before, after, p, role)) })
}
export const card = (desc: string) => cy.contains('.card-descripcion', desc).closest('.incidencia-card')
export function listed(d: Data, r: Incident) {
 card(r.descripcion_motivo).within(() => {
  const e = d.exams.find((e) => e.id_examen === r.id_examen)!
  cy.get('.card-examen').should('contain', e.title).and('contain', e.fecha)
  cy.get('.badge-tipo').invoke('text').should('satisfy', (s: string) => s.trim() === r.tipo_incidencia)
  cy.get('.card-descripcion').invoke('text').should('satisfy', (s: string) => s.trim() === r.descripcion_motivo)
  if (r.id_estudiante === null) cy.get('.card-estudiante-null').should('contain', 'Incidencia general (No asociada a un estudiante)')
  else { const s = d.students.find((s) => s.id_estudiante === r.id_estudiante)!; cy.get('.card-estudiante').should('contain', `${s.codigo_universitario} – ${s.apellidos}, ${s.nombres}`) }
  cy.window().then((win) => { const formatted = new win.Date(r.fecha_hora).toLocaleString('es-BO', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }); cy.get('.card-footer').should('contain', `Registrado: ${formatted}`).and('contain', `Por: ${d.users.find((u) => u.id === r.id_usuario)!.username}`) })
 })
}
export interface Filters { id_examen?: number; tipo_incidencia?: string; desde?: string; hasta?: string }
export function expected(d: Data, f: Filters = {}) {
 return d.records.filter((r) => (!f.id_examen || r.id_examen === f.id_examen) && (!f.tipo_incidencia || r.tipo_incidencia === f.tipo_incidencia) && (!f.desde || r.fecha_dia >= f.desde) && (!f.hasta || r.fecha_dia <= f.hasta)).sort((a,b) => b.fecha_epoch - a.fecha_epoch || b.id_incidencia - a.id_incidencia)
}
export function exact(rows: Incident[]) {
 if (!rows.length) { cy.get('.incidencia-card').should('not.exist'); cy.get('.empty-state').should('be.visible'); return }
 cy.get('.card-descripcion').should('have.length', rows.length).then(($els) => expect([...$els].map((e) => e.textContent!.trim())).to.deep.eq(rows.map((r) => r.descripcion_motivo)))
}
export const filterExam = () => cy.get('.filters-container select').eq(0)
export const filterType = () => cy.get('.filters-container select').eq(1)
export const date = (title: string) => cy.get(`.filters-container input[title="${title}"]`)
export function observe(action: () => void) {
 const alias = `hu12List${++serial}`; cy.intercept('GET', '**/incidencias*').as(alias); action(); cy.wait(`@${alias}`).its('response.statusCode').should('eq', 200)
}
export function filters(f: Filters) {
 if (f.id_examen !== undefined) observe(() => { filterExam().select(String(f.id_examen)) })
 if (f.tipo_incidencia !== undefined) observe(() => { filterType().select(f.tipo_incidencia!) })
 if (f.desde !== undefined) observe(() => { date('Desde').type(f.desde!).blur() })
 if (f.hasta !== undefined) observe(() => { date('Hasta').type(f.hasta!).blur() })
}
export function next() { observe(() => { cy.contains('.pagination button', 'Siguiente').should('be.enabled').click() }) }
export function error(field: string) {
 const container = field === 'id_examen' ? select('EXAMEN *').closest('.form-group') : field === 'tipo_incidencia' ? select('TIPO DE INCIDENCIA *').closest('.form-group') : description().closest('.form-group')
 container.find('.error-msg').should('be.visible').and('have.text', required)
}
export function fits() {
 cy.document().then((doc) => expect(doc.documentElement.scrollWidth).to.be.at.most(doc.defaultView!.innerWidth))
 cy.get('body').then(($body) => { if ($body.find('.modal-container').length) cy.get<HTMLElement>('.modal-container').then(($m) => expect($m[0].scrollWidth).to.be.at.most($m[0].clientWidth)) })
}
