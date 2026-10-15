import { admin, data, deleteUrl, detail, listedCodes, mathGroup, removed, request, resultCodes, row, search, student, unchanged } from './helpers.js'

describe('HU-10 · listado, vacío y paginación', () => {
  beforeEach(admin)
  it('HU10-14 · lista código, nombres y apellidos reales de los inscritos', () => {
    data().then((d) => {
      const s = student(d, '202600902')
      detail(mathGroup(d, 'B').id_grupo)
      ;['Codigo', 'Nombres', 'Apellidos'].forEach((column) => cy.contains('.data-table th', column).should('be.visible'))
      const check = () => row(s.codigo_universitario).within(() => {
        cy.get('td[data-label="Codigo"]').should('have.text', s.codigo_universitario)
        cy.get('td[data-label="Nombres"]').should('have.text', s.nombres)
        cy.get('td[data-label="Apellidos"]').should('have.text', s.apellidos)
      })
      check()
      cy.get('.paginacion').should('not.exist')
      cy.reload()
      check()
      unchanged(d)
    })
  })
  it('HU10-15 · pagina todos los inscritos sin omisiones y conserva la búsqueda al navegar', () => {
    data().then((d) => {
      const id = mathGroup(d, 'P01').id_grupo
      const expected = d.enrollments.filter((i) => i.id_grupo === id)
        .map((i) => d.students.find((s) => s.id_estudiante === i.id_estudiante)!.codigo_universitario).sort()
      expect(expected).to.have.length(16)
      detail(id)
      search('Lucía')
      resultCodes().should('deep.eq', ['202610101', '202610102'])
      cy.get('.page-info').should('have.text', 'Pagina 1 de 2')
      cy.contains('.paginacion button', 'Anterior').should('be.disabled')
      listedCodes().then((first) => {
        expect(first).to.have.length(15)
        cy.contains('.paginacion button', 'Siguiente').click()
        cy.get('.page-info').should('have.text', 'Pagina 2 de 2')
        cy.location('search').then((query) => expect(new URLSearchParams(query).get('busqueda')).to.eq('Lucía'))
        listedCodes().then((last) => {
          expect(last).to.have.length(1)
          expect([...first, ...last].sort()).to.deep.eq(expected)
          expect(new Set([...first, ...last]).size).to.eq(expected.length)
          cy.contains('.paginacion button', 'Siguiente').should('be.disabled')
          cy.reload()
          cy.get('.page-info').should('have.text', 'Pagina 2 de 2')
          listedCodes().should('deep.eq', last)
          cy.get('.buscador input').should('have.value', 'Lucía')
          cy.contains('.paginacion button', 'Anterior').click()
          cy.get('.page-info').should('have.text', 'Pagina 1 de 2')
          listedCodes().should('deep.eq', first)
        })
      })
      unchanged(d)
    })
  })
  it('HU10-16 · grupo sin inscritos muestra estado vacío y permite buscar', () => {
    data().then((d) => {
      detail(mathGroup(d).id_grupo)
      cy.get('.empty-state').should('have.text', 'Aun no hay estudiantes inscritos en este grupo.')
      cy.get('td[data-label="Codigo"], .btn-baja, .paginacion').should('not.exist')
      cy.contains('.grupo-meta span', 'Inscritos:').should('contain', '0')
      cy.get('.buscador input').should('be.visible')
      cy.reload()
      cy.get('.empty-state').should('be.visible')
      unchanged(d)
    })
  })
  it('HU10-17 · exactamente 15 inscritos caben en una página después de una baja', () => {
    data().then((d) => {
      const id = mathGroup(d, 'P01').id_grupo
      const enrollments = d.enrollments.filter((i) => i.id_grupo === id)
      const last = enrollments.at(-1)!
      detail(id)
      request('DELETE', deleteUrl(id, last.id_inscripcion)).its('status').should('eq', 302)
      removed(d, last.id_inscripcion)
      cy.reload()
      cy.get('.paginacion').should('not.exist')
      const expected = enrollments.filter((i) => i.id_inscripcion !== last.id_inscripcion)
        .map((i) => d.students.find((s) => s.id_estudiante === i.id_estudiante)!.codigo_universitario).sort()
      listedCodes().should('deep.eq', expected).and('have.length', 15)
      cy.contains('.grupo-meta span', 'Inscritos:').should('contain', '15')
    })
  })
})
