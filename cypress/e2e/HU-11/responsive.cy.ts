import { control, data, start, student, verify, photo, state, confirm, persisted, pivot, widthFits, input } from './helpers.js'
describe('HU-11 Responsive', () => {
  for (const [device, width, height] of [['móvil', 390, 844], ['tablet', 768, 1024]] as const) {
    it(`HU11-22 flujo completo usable en ${device}`, () => {
      cy.viewport(width, height)
      data().then((d) => { control(); widthFits(); start(d); input().should('be.visible').and('be.enabled'); widthFits()
        verify(student(d).codigo_universitario); photo(d); cy.contains('.confirmacion-box button', 'Confirmar ingreso').should('be.visible').and('be.enabled'); widthFits()
        state().then((before) => { confirm(); state().then((after) => persisted(d, before, after, pivot(d))) }); input().should('be.visible'); widthFits()
      })
    })
  }
})
