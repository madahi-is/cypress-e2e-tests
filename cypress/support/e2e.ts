import './commands.js'

beforeEach(() => {
  const spec = Cypress.spec.relative.replaceAll('\\', '/')
  const action = spec.includes('/HU-15/') && !spec.endsWith('/desactivacion.cy.ts') ? 'reset-hu15' : spec.includes('/HU-14/') ? 'reset-hu14' : spec.includes('/HU-13/') ? 'reset-hu13' : spec.includes('/HU-12/') ? (spec.endsWith('/vacio.cy.ts') ? 'reset-hu12-empty' : 'reset-hu12') : spec.includes('/HU-11/') ? 'reset-hu11' : spec.includes('/HU-10/') ? 'reset-hu10' : spec.includes('/HU-9/') ? 'reset-hu9' : 'reset'
  cy.task('database', action).then((data) => {
    cy.wrap(data).as('data')
    // Impide ejecutar pruebas de escritura contra la instancia de desarrollo.
    cy.request('/login').then((response) => {
      expect(response.headers['x-e2e-database'], 'instancia exclusiva app_e2e').to.eq('app_e2e')
    })
  })
})
