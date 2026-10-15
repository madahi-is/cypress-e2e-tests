import { actor, data, payload, persisted, pivot, request, state, student, unchanged } from './helpers.js'

const roles = ['personal de control de ingreso', 'docente', 'administrador']
describe('HU-11 · permisos', () => {
  roles.forEach((role) => {
    it(`HU11-01 ${role} · tiene acceso al módulo por el menú`, () => {
      data().then((d) => {
        cy.login(actor(d, role).email)
        cy.get('.sidebar-nav a[href="/registro-ingreso"]').should('be.visible').click()
        cy.get('.titulo-principal').should('have.text', 'Registro de Ingreso')
        unchanged(d)
      })
    })
    it(`HU11-02 ${role} · URL y endpoints permiten verificar y guardar con el actor correcto`, () => {
      data().then((d) => {
        cy.login(actor(d, role).email)
        cy.visit('/registro-ingreso')
        cy.get('.titulo-principal').should('be.visible')
        request('/registro-ingreso/validar', { id_examen: pivot(d).id_examen, dato_estudiante: student(d).codigo_universitario })
          .then((r) => { expect(r.status).to.eq(200); expect(r.body.id_estudiante).to.eq(student(d).id_estudiante) })
        unchanged(d)
        state().then((before) => {
          request('/registro-ingreso', payload(d)).its('status').should('eq', 200)
          state().then((after) => persisted(d, before, after, pivot(d), 'Ana', role))
        })
      })
    })
  })
  it('HU11-03 · estudiante no accede por menú, URL ni endpoints', () => {
    cy.login('202600901')
    data().then((d) => {
      cy.get('a[href="/registro-ingreso"]').should('not.exist')
      cy.request({ url: '/registro-ingreso', failOnStatusCode: false }).its('status').should('eq', 403)
      request('/registro-ingreso/validar', { id_examen: pivot(d).id_examen, dato_estudiante: student(d).codigo_universitario }).its('status').should('eq', 403)
      request('/registro-ingreso', payload(d)).its('status').should('eq', 403)
      unchanged(d)
      cy.visit('/registro-ingreso', { failOnStatusCode: false })
      cy.get('body').should('contain', '403')
      cy.get('.registro-wrapper').should('not.exist')
    })
  })
  it('HU11-04 · visitante no accede ni registra ingresos', () => {
    cy.visit('/login')
    data().then((d) => {
      cy.request({ url: '/registro-ingreso', headers: { Accept: 'application/json' }, failOnStatusCode: false }).its('status').should('eq', 401)
      request('/registro-ingreso/validar', { id_examen: pivot(d).id_examen, dato_estudiante: student(d).codigo_universitario }).its('status').should('eq', 401)
      request('/registro-ingreso', payload(d)).its('status').should('eq', 401)
      unchanged(d)
      cy.visit('/registro-ingreso')
      cy.location('pathname').should('eq', '/login')
      cy.get('.registro-wrapper').should('not.exist')
    })
  })
})
