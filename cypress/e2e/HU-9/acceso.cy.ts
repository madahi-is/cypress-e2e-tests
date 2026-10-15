import { data, group, payload, request, unchanged } from './helpers.js'

describe('HU-9 · acceso exclusivo', () => {
  it('HU09-01 · administrador accede desde menú y al detalle de inscritos', () => {
    cy.login('admin.e2e@example.test')
    cy.get('.sidebar-nav a[href="/grupos"]').should('be.visible').click()
    cy.get('.panel-title').should('have.text', 'GRUPOS')
    cy.contains('button', 'Nuevo grupo').should('be.visible')
    data().then((d) => {
      cy.get(`a[href="/grupos/${group(d, 'B').id_grupo}"]`).click()
      cy.get('.grupo-titulo').should('contain', 'Matemática HU9').and('contain', 'B')
      cy.get('.data-table').should('contain', '202600902')
    })
  })
  const roles = [
    ['docente', 'docente1.e2e@example.test'],
    ['control', 'control.e2e@example.test'],
    ['estudiante', '202600901'],
  ]
  roles.forEach(([role, login]) => {
    it(`HU09-02 ${role} · sin menú, URL ni ninguna escritura de grupos/inscripciones`, () => {
      cy.login(login)
      cy.get('.sidebar-nav a[href="/grupos"]').should('not.exist')
      data().then((d) => {
        const id = group(d, 'B').id_grupo
        const enrollment = d.enrollments.find((i) => i.id_grupo === id)!
        // Antes de visitar el 403 se conservan las metas CSRF de la página autenticada.
        const operations: [string, string, Cypress.RequestBody?][] = [
          ['GET', '/grupos'], ['GET', `/grupos/${id}`], ['POST', '/grupos', payload(d)],
          ['PATCH', `/grupos/${id}`, { id_usuario: payload(d).id_usuario }], ['DELETE', `/grupos/${id}`],
          ['POST', `/grupos/${id}/inscripciones`, { id_estudiante: d.students[0].id_estudiante }],
          ['DELETE', `/grupos/${id}/inscripciones/${enrollment.id_inscripcion}`],
        ]
        operations.forEach(([method, url, body]) => request(method, url, body).its('status').should('eq', 403))
        unchanged(d)
        // Navegación real por URL, además de las peticiones JSON anteriores.
        cy.visit('/grupos', { failOnStatusCode: false })
        cy.get('.panel-title').should('not.exist')
        cy.get('body').should('contain', '403')
        cy.visit(`/grupos/${id}`, { failOnStatusCode: false })
        cy.get('.grupo-titulo').should('not.exist')
        cy.get('body').should('contain', '403')
      })
    })
  })
  it('HU09-03 · anónimo no accede al módulo ni escribe datos', () => {
    cy.visit('/login')
    cy.get('a[href="/grupos"]').should('not.exist')
    data().then((d) => {
      const id = group(d, 'B').id_grupo
      const enrollment = d.enrollments.find((i) => i.id_grupo === id)!
      const operations: [string, string, Cypress.RequestBody?][] = [
        ['GET', '/grupos'], ['GET', `/grupos/${id}`], ['POST', '/grupos', payload(d)],
        ['PATCH', `/grupos/${id}`, { id_usuario: payload(d).id_usuario }], ['DELETE', `/grupos/${id}`],
        ['POST', `/grupos/${id}/inscripciones`, { id_estudiante: d.students[0].id_estudiante }],
        ['DELETE', `/grupos/${id}/inscripciones/${enrollment.id_inscripcion}`],
      ]
      operations.forEach(([method, url, body]) => request(method, url, body).its('status').should('eq', 401))
      unchanged(d)
      cy.visit('/grupos')
      cy.location('pathname').should('eq', '/login')
      cy.visit(`/grupos/${id}`)
      cy.location('pathname').should('eq', '/login')
    })
  })
})
