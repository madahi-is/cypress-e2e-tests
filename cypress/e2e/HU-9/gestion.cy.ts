import { admin, blocked, data, expectBlocked, field, group, remove, request, row, state, unchanged } from './helpers.js'

describe('HU-9 · reasignación, eliminación e inscripciones', () => {
  beforeEach(admin)
  it('HU09-24 · reasigna docente y persiste sin alterar grupo ni relaciones', () => {
    data().then((d) => {
      const g = group(d, 'C')
      const teacher = d.users.find((u) => u.username === 'docente2.e2e')!
      row(g.id_grupo).contains('button', 'Reasignar docente').click()
      field('Docente').select(String(teacher.id))
      cy.contains('.modal-footer button', 'Guardar cambios').click()
      cy.get('.modal-container').should('not.exist')
      row(g.id_grupo).find('td[data-label="Docente"]').should('have.text', teacher.name)
      const expected = { ...d, groups: d.groups.map((item) => item.id_grupo === g.id_grupo ? { ...item, id_usuario: teacher.id } : item) }
      unchanged(expected)
      cy.reload()
      row(g.id_grupo).find('td[data-label="Docente"]').should('have.text', teacher.name)
      cy.visit(`/grupos/${g.id_grupo}`)
      cy.get('.grupo-meta').should('contain', teacher.name)
    })
  })
  it('HU09-25 UI · exige seleccionar docente al reasignar', () => {
    data().then((d) => {
      row(group(d).id_grupo).contains('button', 'Reasignar docente').click()
      field('Docente').select('')
      cy.contains('.modal-footer button', 'Guardar cambios').click()
      cy.get('.error-msg').should('have.text', 'Debe seleccionar un docente')
      unchanged(d)
    })
  })
  ;['ausente', 'inexistente', 'texto'].forEach((invalid) => {
    it(`HU09-25 ${invalid} · rechaza reasignación inválida sin cambios`, () => {
      data().then((d) => {
        const body = invalid === 'ausente' ? {} : { id_usuario: invalid === 'texto' ? 'texto' : Math.max(...d.users.map((u) => u.id)) + 100 }
        request('PATCH', `/grupos/${group(d).id_grupo}`, body).then((r) => {
          expect(r.status).to.eq(422)
          expect(r.body.errors).to.have.property('id_usuario')
        })
        unchanged(d)
      })
    })
  })
  it('HU09-26 · elimina un grupo libre y persiste la baja', () => {
    data().then((d) => {
      const id = group(d).id_grupo
      expect(d.enrollments.some((i) => i.id_grupo === id)).to.eq(false)
      expect(d.examGroups.some((i) => i.id_grupo === id)).to.eq(false)
      remove(id)
      cy.get('.modal-container').should('not.exist')
      unchanged({ ...d, groups: d.groups.filter((g) => g.id_grupo !== id) })
      cy.reload()
      cy.get(`a[href="/grupos/${id}"]`).should('not.exist')
      request('GET', `/grupos/${id}`).its('status').should('eq', 404)
    })
  })
  it('HU09-27 · UI bloquea eliminar grupo con inscrito y muestra mensaje exacto', () => {
    data().then((d) => expectBlocked(d, group(d, 'B').id_grupo))
  })
  it('HU09-28 · UI protege grupo cuyos inscritos se relacionan con examen', () => {
    data().then((d) => {
      const id = group(d, 'C').id_grupo
      const i = d.enrollments.find((item) => item.id_grupo === id)!
      const eg = d.examGroups.find((item) => item.id_grupo === id)!
      expect(d.habilitations.some((h) => h.id_estudiante === i.id_estudiante && h.id_examen === eg.id_examen)).to.eq(true)
      expectBlocked(d, id)
    })
  })
  ;['B', 'C'].forEach((name) => {
    it(`HU09-29 ${name} · DELETE directo preserva inscripciones y exámenes asociados`, () => {
      data().then((d) => {
        const id = group(d, name).id_grupo
        request('DELETE', `/grupos/${id}`).its('status').should('eq', 302)
        // Sigue la redirección como cliente real de Inertia para leer el flash del backend.
        cy.request({ url: '/grupos', headers: { 'X-Inertia': 'true' } }).then((r) => {
          expect(r.body.props.flash.error).to.eq(blocked)
        })
        unchanged(d)
      })
    })
  })
  it('HU09-30 · inscribir bloquea eliminación; dar de baja permite eliminar grupo libre', () => {
    data().then((d) => {
      const id = group(d).id_grupo
      cy.visit(`/grupos/${id}`)
      cy.get('.buscador input').type('202609903')
      cy.contains('.buscador button', 'Buscar').click()
      cy.contains('.resultado-item', '202609903').contains('button', 'Inscribir').click()
      cy.get('.data-table tbody').should('contain', '202609903')
      cy.reload()
      cy.get('.data-table tbody').should('contain', '202609903')
      state().then((enrolled) => {
        expect(enrolled.enrollments).to.have.length(d.enrollments.length + 1)
        cy.visit('/grupos')
        expectBlocked(enrolled, id)
        cy.visit(`/grupos/${id}`)
        cy.contains('.data-table tbody tr', '202609903').contains('button', 'Dar de baja').click()
        cy.contains('.modal-footer button', 'Dar de baja').click()
        cy.get('.modal-container').should('not.exist')
        cy.get('.empty-state').should('be.visible')
        unchanged(d)
        cy.visit('/grupos')
        remove(id)
        cy.get('.modal-container').should('not.exist')
        unchanged({ ...d, groups: d.groups.filter((g) => g.id_grupo !== id) })
      })
    })
  })
})
