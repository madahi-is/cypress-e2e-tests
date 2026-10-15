export interface Student {
  id_estudiante: number; nombres: string; apellidos: string;
  codigo_universitario: string; documento_identidad: string; codigo_qr: string;
  foto_url: string | null;
}
export interface Dataset {
  students: Student[]; examen: number; ambiente: number;
}
declare global {
  namespace Cypress {
    interface Chainable {
      login(identifier: string, password?: string): Chainable<void>;
      panel(): Chainable<void>;
    }
  }
}
Cypress.Commands.add('login', (identifier: string, password = 'E2ePassword!2026') => {
  // Cada cambio de actor debe iniciar sin la cookie del usuario anterior.
  cy.clearAllCookies()
  cy.visit('/login')
  cy.get('#identificador').type(identifier)
  cy.get('#password').type(password, { log: false })
  cy.get('form.login-form button[type="submit"]').click()
  cy.location('pathname').should('not.eq', '/login')
})
Cypress.Commands.add('panel', () => {
  cy.login('202600901')
  cy.visit('/estudiante/panel')
  cy.get('.credential-card').should('be.visible')
})
export function qrToken() {
  return cy.get<HTMLImageElement>('img[alt="Código QR de Verificación"]')
    .invoke('attr', 'src').then((src) => {
      expect(src).to.be.a('string')
      return new URL(src!).searchParams.get('data')!
    })
}
export function csrf() {
  return cy.get('meta[name="csrf-token"]').invoke('attr', 'content')
}
export function selectByLabel(label: string, value: string) {
  cy.contains('label', label).invoke('attr', 'for').then((id) => {
    cy.get(`#${id}`).select(value)
  })
}
