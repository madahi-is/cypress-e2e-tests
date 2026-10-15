import { added, admin, data, detail, duplicate, enrollUrl, mathGroup, otherGroup, physicsGroup, rejected, request, result, row, search, student, unchanged } from './helpers.js'

describe('HU-10 · inscripción y restricciones', () => {
  beforeEach(admin)
  it('HU10-07 · inscripción por UI persiste después de recargar', () => {
    data().then((d) => {
      const g = mathGroup(d)
      const s = student(d)
      detail(g.id_grupo)
      search(s.codigo_universitario)
      result(s.codigo_universitario).contains('button', /^Inscribir$/).click()
      row(s.codigo_universitario).should('contain', 'Lucía').and('contain', 'Mamani Quispe')
      added(d, [[g.id_grupo, s.id_estudiante]])
      cy.reload()
      row(s.codigo_universitario).should('be.visible')
      cy.get('.resultado-item').should('not.exist')
    })
  })
  it('HU10-08 · POST autenticado válido persiste y coincide con el listado UI', () => {
    data().then((d) => {
      const g = mathGroup(d)
      const s = student(d)
      detail(g.id_grupo)
      request('POST', enrollUrl(g.id_grupo), { id_estudiante: s.id_estudiante }).its('status').should('eq', 302)
      added(d, [[g.id_grupo, s.id_estudiante]])
      cy.reload()
      row(s.codigo_universitario).should('contain', 'Lucía').and('contain', 'Mamani Quispe')
    })
  })
  it('HU10-09 · UI excluye al inscrito; endpoint rechaza duplicado con mensaje exacto', () => {
    data().then((d) => {
      const g = mathGroup(d, 'B')
      const s = student(d, '202600902')
      detail(g.id_grupo)
      row(s.codigo_universitario).should('exist')
      search(s.codigo_universitario)
      cy.get('.resultado-item, .btn-inscribir').should('not.exist')
      cy.get('.sin-resultados').should('be.visible')
      rejected(d, g.id_grupo, s.id_estudiante, duplicate)
    })
  })
  it('HU10-10 · UI rechaza otro grupo de la misma Asignatura y Gestión con mensaje exacto', () => {
    data().then((d) => {
      const s = student(d, '202600902')
      detail(mathGroup(d).id_grupo)
      search(s.codigo_universitario)
      result(s.codigo_universitario).contains('button', /^Inscribir$/).click()
      // Primero verifica que hubo rechazo real sin mutación; después el texto HU literal.
      cy.get('.toast.error span').should('be.visible').invoke('text').then((message) => {
        cy.get('.data-table tbody').should('not.contain', s.codigo_universitario)
        unchanged(d).then(() => expect(message, 'mensaje exacto HU-10').to.eq(otherGroup))
      })
    })
  })
  it('HU10-11 · endpoint rechaza otro grupo de la misma Asignatura y Gestión con mensaje exacto', () => {
    data().then((d) => {
      const target = mathGroup(d)
      const source = mathGroup(d, 'B')
      expect(target.id_asignatura).to.eq(source.id_asignatura)
      expect(target.gestion).to.eq(source.gestion)
      expect(target.id_grupo).not.to.eq(source.id_grupo)
      detail(target.id_grupo)
      rejected(d, target.id_grupo, student(d, '202600902').id_estudiante, otherGroup)
    })
  })
  it('HU10-12 · permite inscribir simultáneamente en distintas asignaturas de la misma Gestión', () => {
    data().then((d) => {
      const math = mathGroup(d)
      const physics = physicsGroup(d)
      const s = student(d)
      expect(math.id_asignatura).not.to.eq(physics.id_asignatura)
      expect(math.gestion).to.eq(physics.gestion)
      detail(math.id_grupo)
      search(s.codigo_universitario)
      result(s.codigo_universitario).contains('button', /^Inscribir$/).click()
      row(s.codigo_universitario).should('exist')
      added(d, [[math.id_grupo, s.id_estudiante]])
      detail(physics.id_grupo)
      search(s.codigo_universitario)
      result(s.codigo_universitario).contains('button', /^Inscribir$/).click()
      row(s.codigo_universitario).should('exist')
      added(d, [[math.id_grupo, s.id_estudiante], [physics.id_grupo, s.id_estudiante]])
      cy.reload()
      row(s.codigo_universitario).should('exist')
      detail(math.id_grupo)
      row(s.codigo_universitario).should('exist')
    })
  })
  ;['ausente', 'inexistente', 'no entero'].forEach((invalid) => {
    it(`HU10-13 ${invalid} · servidor valida el estudiante sin alterar inscripciones`, () => {
      data().then((d) => {
        const g = mathGroup(d)
        const body = invalid === 'ausente' ? {} : { id_estudiante: invalid === 'no entero' ? 'texto' : Math.max(...d.students.map((s) => s.id_estudiante)) + 100 }
        detail(g.id_grupo)
        request('POST', enrollUrl(g.id_grupo), body).then((r) => {
          expect(r.status).to.eq(422)
          expect(r.body.errors).to.have.property('id_estudiante')
        })
        unchanged(d)
      })
    })
  })
})
