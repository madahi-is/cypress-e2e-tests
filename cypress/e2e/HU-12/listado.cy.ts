import { data, page, open, fill, payload, submit, listed, unchanged, expected, exact, filters, exam, next, observe, filterExam, filterType, date, request } from './helpers.js'
describe('HU-12 Listado y filtros', () => {
 for (const withStudent of [true, false]) {
  it(`HU12-16 listado completo y recarga ${withStudent ? 'con' : 'sin'} estudiante`, () => {
   data().then((d) => { page(d); open(); const p = payload(d, withStudent); fill(p); submit(d,p).then((r) => { listed(d,r); cy.reload(); listed(d,r); unchanged({ ...d, records: [...d.records,r] }) }) })
  })
 }
 it('HU12-18 navega entre páginas sin perder ni repetir incidencias', () => {
  data().then((d) => { page(d); const rows = expected(d); exact(rows.slice(0,15)); next(); cy.location('search').should('contain', 'page=2'); exact(rows.slice(15)); observe(() => { cy.contains('.pagination button', 'Anterior').click() }); exact(rows.slice(0,15)); unchanged(d) })
 })
 for (const kind of ['examen','tipo','rango']) {
  it(`HU12-19 filtro individual por ${kind}`, () => {
   data().then((d) => { page(d); const f = kind === 'examen' ? { id_examen: exam(d,true).id_examen } : kind === 'tipo' ? { tipo_incidencia: 'Expulsión' } : { desde: '2026-03-12', hasta: '2026-03-12' }; filters(f); exact(expected(d,f).slice(0,15)); unchanged(d) })
  })
 }
 it('HU12-20 filtros combinados restringen conjuntamente el resultado', () => {
  data().then((d) => { page(d); const f = { id_examen: exam(d,true).id_examen, tipo_incidencia: 'Expulsión', desde: '2026-03-11', hasta: '2026-03-11' }; filters(f); exact(expected(d,f)); unchanged(d) })
 })
 it('HU12-21 limpiar filtros recupera listado sin restricciones', () => {
  data().then((d) => { page(d); filters({ id_examen: exam(d,true).id_examen, tipo_incidencia: 'Expulsión', desde: '2026-03-11', hasta: '2026-03-12' })
   observe(() => { filterExam().select('') }); observe(() => { filterType().select('') }); observe(() => { date('Hasta').clear().blur() }); observe(() => { date('Desde').clear().blur() })
   exact(expected(d).slice(0,15)); cy.location('search').should('eq',''); unchanged(d)
  })
 })
 it('HU12-22 rango sin coincidencias muestra estado vacío', () => {
  data().then((d) => { page(d); filters({ desde:'2000-01-01', hasta:'2000-01-02' }); exact([]); unchanged(d) })
 })
 it('HU12-23 caracteriza extremos inclusivos del rango implementado (pendiente de confirmación HU)', () => {
  data().then((d) => { page(d); const f = { desde:'2026-03-11', hasta:'2026-03-11' }; filters(f); const rows = expected(d,f); exact(rows.slice(0,15))
   request('GET','/incidencias?desde=2026-03-11&hasta=2026-03-11').then((r) => { expect(r.status).to.eq(200); expect(r.body.incidencias.total).to.eq(rows.length) })
   request('GET','/incidencias?desde=2026-03-11&hasta=2026-03-11&page=2').then((r) => { expect(r.status).to.eq(200); expect(r.body.incidencias.data.map((i: { id_incidencia: number }) => i.id_incidencia)).to.deep.eq(rows.slice(15).map((i) => i.id_incidencia)) }); unchanged(d)
  })
 })
 it('HU12-24 paginación mantiene filtros activos en backend y navegación UI', () => {
  data().then((d) => { page(d); const f = { id_examen: exam(d).id_examen, tipo_incidencia:'Otro', desde:'2026-03-11', hasta:'2026-03-11' }; filters(f); const rows = expected(d,f); expect(rows.length).to.be.greaterThan(15); exact(rows.slice(0,15))
   request('GET', `/incidencias?id_examen=${f.id_examen}&tipo_incidencia=Otro&desde=${f.desde}&hasta=${f.hasta}`).then((r) => { expect(r.status).to.eq(200); const url = new URL(r.body.incidencias.next_page_url); expect(url.searchParams.get('id_examen')).to.eq(String(f.id_examen)); expect(url.searchParams.get('tipo_incidencia')).to.eq('Otro'); expect(url.searchParams.get('desde')).to.eq(f.desde); expect(url.searchParams.get('hasta')).to.eq(f.hasta) })
   next(); exact(rows.slice(15)); filterExam().should('have.value', String(f.id_examen)); filterType().should('have.value','Otro'); date('Desde').should('have.value',f.desde); date('Hasta').should('have.value',f.hasta)
   cy.location('search').then((q) => { const p = new URLSearchParams(q); expect(p.get('page')).to.eq('2'); expect(p.get('id_examen')).to.eq(String(f.id_examen)); expect(p.get('tipo_incidencia')).to.eq('Otro'); expect(p.get('desde')).to.eq(f.desde); expect(p.get('hasta')).to.eq(f.hasta) }); unchanged(d)
  })
 })
})
