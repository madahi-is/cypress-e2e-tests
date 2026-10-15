import { admin, data, deleteUrl, detail, detailUrl, drop, enrollUrl, mathGroup, physicsGroup, removed, request, row, student, unchanged } from './helpers.js'

describe('HU-10 · baja e integridad de relaciones', () => {
  beforeEach(admin)
  it('HU10-18 · baja por UI persiste sin borrar estudiante, grupo u otras inscripciones', () => {
    data().then((d) => {
      const g = mathGroup(d, 'B')
      const s = student(d, '202600902')
      const enrollment = d.enrollments.find((i) => i.id_grupo === g.id_grupo && i.id_estudiante === s.id_estudiante)!
      expect(d.enrollments.filter((i) => i.id_estudiante === s.id_estudiante)).to.have.length(2)
      detail(g.id_grupo)
      drop(s.codigo_universitario)
      cy.get('.empty-state').should('be.visible')
      removed(d, enrollment.id_inscripcion)
      cy.reload()
      cy.get('.data-table tbody').should('not.contain', s.codigo_universitario)
      cy.get('.grupo-titulo').should('contain', 'Matemática HU9')
      detail(physicsGroup(d).id_grupo)
      row(s.codigo_universitario).should('contain', 'Bruno').and('contain', 'Prueba')
    })
  })
  it('HU10-19 · DELETE directo realiza únicamente la baja elegida y coincide con la UI', () => {
    data().then((d) => {
      const g = mathGroup(d, 'B')
      const s = student(d, '202600902')
      const enrollment = d.enrollments.find((i) => i.id_grupo === g.id_grupo && i.id_estudiante === s.id_estudiante)!
      detail(g.id_grupo)
      request('DELETE', deleteUrl(g.id_grupo, enrollment.id_inscripcion)).its('status').should('eq', 302)
      removed(d, enrollment.id_inscripcion)
      cy.reload()
      cy.get('.empty-state').should('be.visible')
      cy.get('.data-table tbody').should('not.contain', s.codigo_universitario)
      detail(physicsGroup(d).id_grupo)
      row(s.codigo_universitario).should('exist')
    })
  })
  it('HU10-20 · no elimina la inscripción usando una URL de otro grupo', () => {
    data().then((d) => {
      const enrollment = d.enrollments.find((i) => i.id_grupo === mathGroup(d, 'B').id_grupo)!
      detail(mathGroup(d).id_grupo)
      request('DELETE', deleteUrl(mathGroup(d).id_grupo, enrollment.id_inscripcion)).its('status').should('eq', 404)
      unchanged(d)
    })
  })
  ;['GET', 'POST', 'DELETE'].forEach((method) => {
    it(`HU10-21 ${method} · grupo inexistente rechazado sin modificar datos`, () => {
      data().then((d) => {
        const id = Math.max(...d.groups.map((g) => g.id_grupo)) + 100
        detail(mathGroup(d).id_grupo)
        const url = method === 'GET' ? detailUrl(id) : method === 'POST' ? enrollUrl(id) : deleteUrl(id, d.enrollments[0].id_inscripcion)
        request(method, url, method === 'POST' ? { id_estudiante: student(d).id_estudiante } : undefined).its('status').should('eq', 404)
        unchanged(d)
      })
    })
  })
  it('HU10-22 · inscripción inexistente rechazada sin modificar datos', () => {
    data().then((d) => {
      const id = mathGroup(d, 'B').id_grupo
      detail(id)
      request('DELETE', deleteUrl(id, Math.max(...d.enrollments.map((i) => i.id_inscripcion)) + 100)).its('status').should('eq', 404)
      unchanged(d)
    })
  })
  it('HU10-23 · cancelar baja conserva la inscripción después de recargar', () => {
    data().then((d) => {
      detail(mathGroup(d, 'B').id_grupo)
      row('202600902').contains('button', /^Dar de baja$/).click()
      cy.get('.modal-container').should('contain', 'Bruno Prueba')
      cy.contains('.modal-container .modal-footer button', /^Cancelar$/).click()
      cy.get('.modal-container').should('not.exist')
      unchanged(d)
      cy.reload()
      row('202600902').should('exist')
    })
  })
})
