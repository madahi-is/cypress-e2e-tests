import type { Dataset } from '../../support/commands.js'

describe('HU-15 · baja del estudiante', () => {
  it('HU15-10 · la baja revoca el acceso de la sesión existente y futuros logins', () => {
    cy.login('202600902')
    cy.visit('/estudiante/panel')
    cy.get('.student-name').should('contain', 'Bruno Prueba')
    cy.getCookies().then((studentCookies) => {
      cy.clearCookies()
      cy.login('admin.e2e@example.test')
      cy.visit('/estudiantes')
      cy.contains('tbody tr', '202600902').within(() => {
        cy.contains('button', 'Eliminar').click()
      })
      cy.intercept('DELETE', '/estudiantes/*').as('delete')
      cy.contains('button', 'Sí, eliminar').click()
      cy.wait('@delete').its('response.statusCode').should('eq', 303)
      cy.contains('tbody tr', '202600902').should('not.exist')
      cy.task('database', 'state').then((state) => {
        expect((state as Dataset).students.map((student) => student.codigo_universitario))
          .not.to.include('202600902')
      })
      cy.clearCookies()
      studentCookies.forEach((cookie) => {
        cy.setCookie(cookie.name, cookie.value, { domain: cookie.domain, path: cookie.path,
          httpOnly: cookie.httpOnly, secure: cookie.secure, sameSite: cookie.sameSite })
      })
      cy.visit('/estudiante/panel')
      cy.location('pathname').should('eq', '/login')
      cy.get('#identificador').type('202600902')
      cy.get('#password').type('E2ePassword!2026', { log: false })
      cy.get('form.login-form button[type="submit"]').click()
      cy.contains('[role="alert"]', 'Credenciales inválidas.').should('be.visible')
      cy.location('pathname').should('eq', '/login')
    })
  })
})
