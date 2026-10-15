import { types, data, page, open, select, search, description, fill, payload, student, submit, unchanged, save, error, request, required, state, persisted } from './helpers.js'
describe('HU-12 Formulario y registro', () => {
 for (const type of types) {
  it(`HU12-05 registra ${type} con estudiante sin ingreso previo`, () => {
   data().then((d) => { expect(d.entries).to.have.length(0); page(d); open()
    select('EXAMEN *').find('option').then(($o) => expect([...$o].map((o) => o.value).filter(Boolean).sort()).to.deep.eq(d.exams.map((e) => String(e.id_examen)).sort()))
    select('TIPO DE INCIDENCIA *').find('option').then(($o) => expect([...$o].map((o) => o.value).filter(Boolean)).to.deep.eq(types))
    const p = payload(d, true, type); fill(p); submit(d, p)
   })
  })
 }
 it('HU12-06 registra incidencia sin estudiante y sin error obligatorio para él', () => {
  data().then((d) => { page(d); open(); const p = payload(d, false); fill(p); cy.get('.select-html').should('have.value', ''); submit(d, p); cy.get('.card-estudiante-null').should('contain', 'Incidencia general') })
 })
 for (const mechanism of ['código', 'documento', 'nombre']) {
  it(`HU12-07 búsqueda por ${mechanism} asocia el estudiante correcto`, () => {
   data().then((d) => { page(d); open(); const s = student(d); const p = payload(d); fill(p)
    search().type(mechanism === 'código' ? s.codigo_universitario : mechanism === 'documento' ? s.documento_identidad : s.nombres)
    cy.get('.select-html').should('have.value', '').find('option').then(($o) => expect([...$o].map((o) => o.value).filter(Boolean)).to.deep.eq([String(s.id_estudiante)]))
    cy.get('.select-html').select(String(s.id_estudiante)); submit(d, p)
   })
  })
 }
 it('HU12-08 búsqueda desconocida no ofrece estudiantes ni registra', () => {
  data().then((d) => { page(d); open(); search().type('HU12-no-existe'); cy.get('.select-html').should('have.value', '').find('option').should('have.length', 1).and('contain', 'Ninguno'); unchanged(d) })
 })
 it('HU12-09 cambiar búsqueda limpia la asociación anterior', () => {
  data().then((d) => { page(d); open(); search().type('Ana'); cy.get('.select-html').select(String(student(d).id_estudiante)); search().clear().type('Bruno'); cy.get('.select-html').should('have.value', '').find('option').then(($o) => expect([...$o].map((o) => o.value).filter(Boolean)).to.deep.eq([String(student(d, 'Bruno').id_estudiante)])); unchanged(d) })
 })
 for (const field of ['id_examen', 'tipo_incidencia', 'descripcion_motivo']) {
  it(`HU12-10 ${field} vacío muestra mensaje obligatorio en UI`, () => {
   data().then((d) => { page(d); open(); fill(payload(d))
    if (field === 'id_examen') select('EXAMEN *').select('')
    else if (field === 'tipo_incidencia') select('TIPO DE INCIDENCIA *').select('')
    else description().clear()
    save(false); unchanged(d); error(field); cy.get('.bg-light-gray .error-msg').should('not.exist')
   })
  })
  it(`HU12-11 endpoint rechaza ${field} vacío sin persistir`, () => {
   data().then((d) => { page(d); const body: Record<string, unknown> = { ...payload(d), [field]: '' }
    request('POST', '/incidencias', body).then((r) => { expect(r.status).to.eq(422); unchanged(d).then(() => expect(r.body.errors[field]).to.deep.eq([required])) })
   })
  })
 }
 it('HU12-12 UI rechaza descripción compuesta solo por espacios', () => {
  data().then((d) => { page(d); open(); fill({ ...payload(d), descripcion_motivo: '   ' }); save(false); unchanged(d); error('descripcion_motivo') })
 })
 it('HU12-12 endpoint rechaza descripción compuesta solo por espacios', () => {
  data().then((d) => { page(d); request('POST', '/incidencias', { ...payload(d), descripcion_motivo: '   ' }).then((r) => { expect(r.status).to.eq(422); unchanged(d).then(() => expect(r.body.errors.descripcion_motivo).to.deep.eq([required])) }) })
 })
 it('HU12-13 cancelar el formulario no crea incidencia', () => {
  data().then((d) => { page(d); open(); fill(payload(d)); cy.get('.btn-cancelar').click(); cy.get('.modal-container').should('not.exist'); unchanged(d); open(); description().should('have.value', '') })
 })
 it('HU12-14 el cliente no suplanta reportante ni fija fecha del servidor', () => {
  data().then((d) => { page(d); state().then((before) => { const p = payload(d); request('POST', '/incidencias', { ...p, id_usuario: d.users.find((u) => u.role === 'administrador')!.id, fecha_hora: '2000-01-01 00:00:00' }).its('status').should('eq', 302); state().then((after) => persisted(d, before, after, p)) }) })
 })
 it('HU12-15 formulario no tiene controles para fecha, hora o reportante', () => {
  data().then((d) => { page(d); open(); cy.get('.modal-container input').should('have.length', 1).and('have.attr', 'placeholder', 'Buscar por código, documento o nombre...'); cy.get('.modal-container select').should('have.length', 3); cy.get('.modal-container textarea').should('have.length', 1); cy.get('.modal-container input[type="date"], .modal-container input[type="time"], .modal-container input[type="datetime-local"]').should('not.exist'); unchanged(d) })
 })
})
