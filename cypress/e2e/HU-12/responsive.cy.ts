import { data, page, filters, expected, exact, open, select, description, search, fill, payload, save, error, submit, listed, fits } from './helpers.js'
describe('HU-12 Responsive', () => {
 for (const [device,width,height] of [['móvil',390,844],['tablet',768,1024]] as const) {
  it(`HU12-28 listado, filtros y formulario utilizables en ${device}`, () => {
   cy.viewport(width,height)
   data().then((d) => { page(d); fits(); cy.get('.filters-container select, .filters-container input').each(($el) => cy.wrap($el).scrollIntoView().should('be.visible').and('be.enabled'))
    filters({ tipo_incidencia:'Expulsión' }); exact(expected(d,{ tipo_incidencia:'Expulsión' })); fits(); cy.get('.incidencia-card').each(($el) => cy.wrap($el).scrollIntoView().should('be.visible'))
    open(); fits(); select('EXAMEN *').scrollIntoView().should('be.visible'); select('TIPO DE INCIDENCIA *').scrollIntoView().should('be.visible'); search().scrollIntoView().should('be.visible'); description().scrollIntoView().should('be.visible')
    save(false); error('id_examen'); error('tipo_incidencia'); error('descripcion_motivo'); fits()
    const p = payload(d,true,'Expulsión'); fill(p); cy.get('.btn-guardar').scrollIntoView().should('be.visible').and('be.enabled'); submit(d,p).then((r) => { listed(d,r); fits() })
   })
  })
 }
})
