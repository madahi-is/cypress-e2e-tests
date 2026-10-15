import { admin, data, detail, detailUrl, mathGroup, request, resultCodes, search, unchanged } from './helpers.js'

describe('HU-10 · búsqueda de estudiantes existentes', () => {
  beforeEach(admin)
  const searches: [string, string, string[]][] = [
    ['código', '202610101', ['202610101']],
    ['nombre', 'Lucía', ['202610101', '202610102']],
    ['apellido', 'Mamani Quispe', ['202610101']],
  ]
  searches.forEach(([kind, term, codes]) => {
    it(`HU10-04 ${kind} · busca y conserva resultados correctos al recargar`, () => {
      data().then((d) => {
        const id = mathGroup(d).id_grupo
        const expected = codes
        detail(id)
        search(term, kind === 'apellido')
        resultCodes().should('deep.eq', expected)
        expected.forEach((code) => {
          const s = d.students.find((s) => s.codigo_universitario === code)!
          cy.contains('.resultado-item', code).find('.resultado-nombre').should('have.text', `${s.nombres} ${s.apellidos}`)
        })
        request('GET', `${detailUrl(id)}?busqueda=${encodeURIComponent(term)}`).then((r) => {
          expect(r.status).to.eq(200)
          expect(r.body.disponibles.map((s: { codigo_universitario: string }) => s.codigo_universitario).sort()).to.deep.eq(expected)
        })
        cy.reload()
        cy.get('.buscador input').should('have.value', term)
        resultCodes().should('deep.eq', expected)
        unchanged(d)
      })
    })
  })
  it('HU10-05 · término inexistente muestra búsqueda sin resultados y no cambia datos', () => {
    data().then((d) => {
      detail(mathGroup(d).id_grupo)
      search('HU10Inexistente')
      cy.get('.sin-resultados').should('have.text', 'No se encontraron estudiantes disponibles con ese dato.')
      cy.get('.resultado-item, .btn-inscribir').should('not.exist')
      unchanged(d)
    })
  })
  it('HU10-06 · limpiar búsqueda restaura el buscador y conserva el listado', () => {
    data().then((d) => {
      detail(mathGroup(d, 'B').id_grupo)
      search('Lucía')
      resultCodes().should('have.length', 2)
      cy.contains('.buscador button', 'Limpiar').click()
      cy.location('search').should('eq', '')
      cy.get('.buscador input').should('have.value', '')
      cy.get('.resultado-item, .sin-resultados').should('not.exist')
      cy.get('.data-table tbody').should('contain', '202600902')
      unchanged(d)
    })
  })
})
