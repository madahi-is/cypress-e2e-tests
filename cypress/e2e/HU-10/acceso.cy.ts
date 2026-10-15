import { admin, data, deleteUrl, detailUrl, enrollUrl, mathGroup, request, row, student, unchanged } from './helpers.js'

describe('HU-10 · acceso exclusivo al detalle y operaciones', () => {
  it('HU10-01 · administrador llega desde Grupos al detalle y sus acciones', () => {
    admin()
    cy.get('.sidebar-nav a[href="/grupos"]').should('be.visible').click()
    data().then((d) => {
      const g = mathGroup(d, 'B')
      cy.get(`a[href="${detailUrl(g.id_grupo)}"]`).should('have.text', 'Ver inscritos').click()
      cy.get('.grupo-titulo').should('contain', 'Matemática HU9').and('contain', 'B')
      cy.get('.buscador input').should('be.visible')
      cy.contains('.buscador button', 'Buscar').should('be.visible')
      row('202600902').contains('button', 'Dar de baja').should('be.visible')
      request('GET', detailUrl(g.id_grupo)).then((r) => {
        expect(r.status).to.eq(200)
        expect(r.body.inscritos.data.map((i: { id_estudiante: number }) => i.id_estudiante)).to.deep.eq([student(d, '202600902').id_estudiante])
      })
      unchanged(d)
    })
  })
  ;[
    ['docente responsable', 'docente1.e2e@example.test'],
    ['control', 'control.e2e@example.test'],
    ['estudiante del grupo', '202600902'],
  ].forEach(([role, identifier]) => {
    it(`HU10-02 ${role} · UI, URL y acciones directas denegadas`, () => {
      cy.login(identifier)
      data().then((d) => {
        const g = mathGroup(d, 'B')
        const enrollment = d.enrollments.find((i) => i.id_grupo === g.id_grupo)!
        cy.get('.sidebar-nav a[href="/grupos"]').should('not.exist')
        cy.get(`a[href="${detailUrl(g.id_grupo)}"]`).should('not.exist')
        request('GET', `${detailUrl(g.id_grupo)}?busqueda=Bruno`).its('status').should('eq', 403)
        request('POST', enrollUrl(mathGroup(d).id_grupo), { id_estudiante: student(d, '202600902').id_estudiante }).its('status').should('eq', 403)
        request('DELETE', deleteUrl(g.id_grupo, enrollment.id_inscripcion)).its('status').should('eq', 403)
        unchanged(d)
        cy.visit(detailUrl(g.id_grupo), { failOnStatusCode: false })
        cy.get('body').should('contain', '403')
        cy.get('.grupo-titulo, .buscador, .btn-inscribir, .btn-baja').should('not.exist')
      })
    })
  })
  it('HU10-03 · sin sesión no accede al detalle ni inscribe o da de baja', () => {
    cy.visit('/login')
    data().then((d) => {
      const g = mathGroup(d, 'B')
      const enrollment = d.enrollments.find((i) => i.id_grupo === g.id_grupo)!
      cy.get(`a[href="${detailUrl(g.id_grupo)}"]`).should('not.exist')
      request('GET', detailUrl(g.id_grupo)).its('status').should('eq', 401)
      request('POST', enrollUrl(mathGroup(d).id_grupo), { id_estudiante: student(d).id_estudiante }).its('status').should('eq', 401)
      request('DELETE', deleteUrl(g.id_grupo, enrollment.id_inscripcion)).its('status').should('eq', 401)
      unchanged(d)
      cy.visit(detailUrl(g.id_grupo))
      cy.location('pathname').should('eq', '/login')
      cy.get('.grupo-titulo, .buscador, .btn-inscribir, .btn-baja').should('not.exist')
    })
  })
})
