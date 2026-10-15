import { roles, data, login, actor, payload, request, state, persisted, unchanged } from './helpers.js'
describe('HU-12 Acceso', () => {
 for (const role of roles) {
  it(`HU12-01 ${role} accede desde navegación`, () => {
   data().then((d) => { login(d, role); cy.get('.sidebar-nav a[href="/incidencias"]').should('be.visible').click(); cy.location('pathname').should('eq', '/incidencias'); cy.get('.panel-title').should('contain', 'GESTIÓN DE INCIDENCIAS'); unchanged(d) })
  })
  it(`HU12-02 ${role} accede por URL y registra por endpoint`, () => {
   data().then((d) => { login(d, role); cy.visit('/incidencias'); request('GET').its('status').should('eq', 200)
    state().then((before) => { const p = payload(d); request('POST', '/incidencias', p).its('status').should('eq', 302); state().then((after) => persisted(d, before, after, p, role)) })
   })
  })
 }
 it('HU12-03 estudiante rechazado por navegación, URL y registro', () => {
  data().then((d) => { cy.login('202600901'); cy.get('a[href="/incidencias"]').should('not.exist'); request('GET').its('status').should('eq', 403); request('POST', '/incidencias', payload(d)).its('status').should('eq', 403); unchanged(d); cy.visit('/incidencias', { failOnStatusCode: false }); cy.get('.panel-title').should('not.exist'); cy.get('body').should('contain', '403') })
 })
 it('HU12-04 visitante no accede ni registra', () => {
  data().then((d) => { cy.visit('/login'); cy.get('a[href="/incidencias"]').should('not.exist'); request('GET').its('status').should('eq', 401); request('POST', '/incidencias', payload(d)).its('status').should('eq', 401); unchanged(d); cy.visit('/incidencias'); cy.location('pathname').should('eq', '/login') })
 })
})
