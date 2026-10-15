import { csrf } from '../../support/commands.js'
export const actors = ['admin.e2e','docente1.hu14','docente2.hu14']
export const duplicate = 'Este usuario ya está asignado a este examen'
export const required = 'Debe seleccionar un usuario para asignar'
export interface Assignment { id_examen_personal: number; id_examen: number; id_usuario: number }
export interface User { id: number; name: string; username: string; email: string; role: string; id_rol: number }
export interface Data {
 assignments: Assignment[];
 exams: { id_examen: number; title: string; fecha: string; hora_inicio: string }[];
 users: User[];
 [key: string]: unknown;
}
export const data = () => cy.get<Data>('@data')
export const state = () => cy.task<Data>('database','state-hu14')
export const exam = (d: Data, second = false) => d.exams.find((e) => e.title === (second ? 'Segundo HU14' : 'Compartido HU14'))!
export const user = (d: Data, username = 'control.e2e') => d.users.find((u) => u.username === username)!
export const controls = (d: Data) => d.users.filter((u) => u.role === 'personal de control de ingreso')
export const url = (d: Data, second = false) => `/examenes/${exam(d,second).id_examen}/habilitaciones`
export const endpoint = (d: Data, second = false) => `/examenes/${exam(d,second).id_examen}/personal-control`
export const login = (d: Data, actor = actors[0]) => cy.login(user(d,actor).email)
export function detail(d: Data, second = false) { cy.visit(url(d,second)); cy.get('.exam-title').should('have.text',exam(d,second).title); cy.get('.personal-seccion').should('be.visible') }
export function page(d: Data, actor = actors[0], second = false) { login(d,actor); detail(d,second) }
export function request(method: string, target: string, body?: Cypress.RequestBody) {
 return csrf().then((token) => cy.location('href').then((referer) => cy.request({ method,url:target,body,headers:{ Accept:'application/json','X-CSRF-TOKEN':token!,Referer:referer },failOnStatusCode:false,followRedirect:false })))
}
export const unchanged = (d: Data) => state().should('deep.eq',d)
export function changed(d: Data, pairs: [number,number][]) {
 return state().then((s) => {
  const key = (e: number,u: number) => `${e}:${u}`
  expect(s.assignments.map((p) => key(p.id_examen,p.id_usuario)).sort()).to.deep.eq(pairs.map(([e,u]) => key(e,u)).sort())
  expect(new Set(s.assignments.map((p) => key(p.id_examen,p.id_usuario))).size).to.eq(s.assignments.length)
  // Las relaciones que permanecen conservan su identidad primaria.
  for (const old of d.assignments.filter((p) => pairs.some(([e,u]) => p.id_examen === e && p.id_usuario === u))) expect(s.assignments.find((p) => p.id_examen_personal === old.id_examen_personal)).to.deep.eq(old)
  expect({ ...s,assignments:d.assignments }).to.deep.eq(d)
  return s
 })
}
export function coherent(d: Data, assigned: User[], second = false) {
 cy.get('.personal-contador').should('have.text',`${assigned.length} asignado(s)`)
 cy.get('.personal-seccion').should(($section) => {
  expect([...$section.find('.personal-nombre')].map((el) => el.textContent!.trim()).sort()).to.deep.eq(assigned.map((u) => u.name).sort())
  expect([...$section.find('.personal-usuario')].map((el) => el.textContent!.trim()).sort()).to.deep.eq(assigned.map((u) => u.username).sort())
 })
 cy.get<HTMLOptionElement>('.personal-select option').then(($o) => expect([...$o].map((o) => o.value).filter(Boolean).sort()).to.deep.eq(controls(d).filter((u) => !assigned.some((a) => a.id === u.id)).map((u) => String(u.id)).sort()))
 cy.get('.exam-title').should('have.text',exam(d,second).title)
}
let serial = 0
export function assign(u: User, d: Data, second = false) {
 const alias = `hu14Assign${++serial}`; cy.intercept('POST',`**${endpoint(d,second)}`).as(alias)
 cy.get('.personal-select').select(String(u.id)); cy.get('.personal-btn').click()
 cy.wait(`@${alias}`).then((r) => expect(r.response?.statusCode).to.be.oneOf([302,303]))
 cy.contains('.personal-item .personal-nombre',u.name).should('be.visible'); cy.get('.personal-select').should('have.value','')
}
export function remove(u: User, d: Data, second = false) {
 const alias = `hu14Remove${++serial}`; cy.intercept('DELETE',`**${endpoint(d,second)}/${u.id}`).as(alias)
 cy.contains('.personal-item .personal-nombre',u.name).closest('.personal-item').find('.personal-quitar').click()
 cy.wait(`@${alias}`).then((r) => expect(r.response?.statusCode).to.be.oneOf([302,303]))
 cy.get('.personal-lista').should('not.contain',u.name)
}
export function directAssign(d: Data, u: User, second = false) { return request('POST',endpoint(d,second),{ id_usuario:u.id }).its('status').should('eq',302) }
export function errorBag(d: Data) {
 // Usa la versión real del documento para respetar el protocolo Inertia.
 return cy.get('#app').invoke('attr','data-page').then((page) => {
  const version = JSON.parse(page!).version as string | null
  return cy.request({ url:url(d),headers:{ 'X-Inertia':'true','X-Inertia-Version':version || '',Accept:'text/html, application/xhtml+xml' } }).then((r) => { expect(r.status).to.eq(200); return r.body.props.errors as Record<string,string> })
 })
}
