import { admin, data, filter, group, ids, request, row } from './helpers.js'

describe('HU-9 · listado, paginación y filtros', () => {
  beforeEach(admin)
  it('HU09-16 · muestra asignatura, nombre de grupo, Gestión y docente reales', () => {
    ;['Asignatura', 'Grupo', 'Gestion', 'Docente'].forEach((column) => cy.contains('.data-table th', column).should('be.visible'))
    data().then((d) => {
      row(group(d).id_grupo).within(() => {
        cy.get('td[data-label="Asignatura"]').should('have.text', 'Matemática HU9')
        cy.get('td[data-label="Grupo"]').should('have.text', 'A')
        cy.get('td[data-label="Gestion"]').should('have.text', '2026-2')
        cy.get('td[data-label="Docente"]').should('have.text', 'Docente 1 HU9')
      })
    })
  })
  it('HU09-17 · recorre todas las páginas sin omisiones ni duplicados y permite volver', () => {
    data().then((d) => {
      cy.get('.page-info').should('have.text', 'Pagina 1 de 2')
      cy.contains('.paginacion button', 'Anterior').should('be.disabled')
      ids().then((first) => {
        expect(first).to.have.length(15)
        cy.contains('.paginacion button', 'Siguiente').click()
        cy.get('.page-info').should('have.text', 'Pagina 2 de 2')
        ids().then((last) => {
          expect(last).to.have.length(d.groups.length - first.length)
          expect([...first, ...last].sort((a, b) => a - b)).to.deep.eq(d.groups.map((g) => g.id_grupo).sort((a, b) => a - b))
        })
        cy.contains('.paginacion button', 'Siguiente').should('be.disabled')
        cy.contains('.paginacion button', 'Anterior').click()
        cy.get('.page-info').should('have.text', 'Pagina 1 de 2')
        ids().should('deep.eq', first)
      })
    })
  })
  it('HU09-18 · filtra solo por Asignatura y conserva el filtro al recargar', () => {
    data().then((d) => {
      const subject = d.subjects.find((s) => s.nombre_asignatura === 'Física HU9')!.id_asignatura
      filter('Asignatura').select(String(subject))
      cy.location('search').should('contain', `id_asignatura=${subject}`)
      ids().should('deep.eq', d.groups.filter((g) => g.id_asignatura === subject).map((g) => g.id_grupo))
      cy.reload()
      filter('Asignatura').should('have.value', String(subject))
      cy.get('td[data-label="Asignatura"]').each(($td) => expect($td.text()).to.eq('Física HU9'))
    })
  })
  it('HU09-19 · filtra solo por Gestión y conserva el filtro al recargar', () => {
    data().then((d) => {
      filter('Gestion').select('2026-1')
      cy.location('search').should('contain', 'gestion=2026-1')
      ids().should('deep.eq', d.groups.filter((g) => g.gestion === '2026-1').map((g) => g.id_grupo))
      cy.reload()
      filter('Gestion').should('have.value', '2026-1')
      cy.get('td[data-label="Gestion"]').each(($td) => expect($td.text()).to.eq('2026-1'))
    })
  })
  it('HU09-20 · aplica ambos filtros y los mantiene entre páginas', () => {
    data().then((d) => {
      const subject = group(d).id_asignatura
      filter('Asignatura').select(String(subject))
      cy.location('search').should('contain', `id_asignatura=${subject}`)
      filter('Gestion').select('2026-2')
      cy.location('search').should('contain', 'gestion=2026-2')
      cy.get('.page-info').should('have.text', 'Pagina 1 de 2')
      ids().then((first) => {
        expect(first).to.have.length(15)
        cy.contains('.paginacion button', 'Siguiente').click()
        cy.get('.page-info').should('have.text', 'Pagina 2 de 2')
        cy.location('search').should('contain', `id_asignatura=${subject}`).and('contain', 'gestion=2026-2')
        ids().then((last) => {
          expect(last).to.have.length(1)
          expect([...first, ...last].sort((a, b) => a - b)).to.deep.eq(d.groups
            .filter((g) => g.id_asignatura === subject && g.gestion === '2026-2')
            .map((g) => g.id_grupo).sort((a, b) => a - b))
        })
        cy.reload()
        filter('Asignatura').should('have.value', String(subject))
        filter('Gestion').should('have.value', '2026-2')
        cy.get('td[data-label="Asignatura"]').should('have.text', 'Matemática HU9')
        cy.get('td[data-label="Gestion"]').should('have.text', '2026-2')
      })
    })
  })
  it('HU09-21 · combinación sin coincidencias muestra lista vacía', () => {
    filter('Asignatura').select('Física HU9')
    cy.get('td[data-label="Asignatura"]').should('have.text', 'Física HU9')
    filter('Gestion').select('2026-1')
    cy.get('.empty-state').should('have.text', 'No hay grupos registrados.')
    cy.get('a.btn-ver, .paginacion').should('not.exist')
  })
  it('HU09-22 · limpiar restaura ambos filtros y el listado completo', () => {
    filter('Asignatura').select('Física HU9')
    cy.get('td[data-label="Asignatura"]').should('have.text', 'Física HU9')
    filter('Gestion').select('2026-2')
    cy.location('search').should('contain', 'gestion=2026-2')
    cy.contains('.filtros button', 'Limpiar').click()
    cy.location('search').should('eq', '')
    filter('Asignatura').should('have.value', '')
    filter('Gestion').should('have.value', '')
    cy.get('.page-info').should('have.text', 'Pagina 1 de 2')
    ids().should('have.length', 15)
    data().then((d) => request('GET', '/grupos').its('body.grupos.total').should('eq', d.groups.length))
  })
  ;['asignatura inexistente', 'asignatura texto', 'gestion larga'].forEach((invalid) => {
    it(`HU09-23 ${invalid} · rechaza filtros inválidos en servidor`, () => {
      data().then((d) => {
        const query = invalid === 'gestion larga' ? `gestion=${'2'.repeat(21)}` :
          `id_asignatura=${invalid === 'asignatura texto' ? 'texto' : Math.max(...d.subjects.map((s) => s.id_asignatura)) + 100}`
        request('GET', `/grupos?${query}`).then((r) => {
          expect(r.status).to.eq(422)
          expect(r.body.errors).to.have.property(invalid === 'gestion larga' ? 'gestion' : 'id_asignatura')
        })
      })
    })
  })
})
