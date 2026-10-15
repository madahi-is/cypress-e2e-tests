import { actors,data,page,assign,user,exam,controls,coherent,changed,request,endpoint,duplicate,errorBag,unchanged } from './helpers.js'
describe('HU-14 Asignación y duplicados', () => {
 for (const actor of actors) {
  it(`HU14-05 ${actor} asigna y persiste tras recargar sin cambios laterales`, () => { data().then((d) => {
   page(d,actor); const u = user(d); assign(u,d); coherent(d,[u]); changed(d,[[exam(d).id_examen,u.id]]).then((after) => { cy.reload(); coherent(d,[u]); unchanged(after) })
  }) })
 }
 it('HU14-06 varios miembros permanecen asignados al mismo examen', () => { data().then((d) => {
  page(d); const list = controls(d).slice(0,2); list.forEach((u,i) => { assign(u,d); coherent(d,list.slice(0,i+1)) }); changed(d,list.map((u) => [exam(d).id_examen,u.id])); cy.reload(); coherent(d,list)
 }) })
 for (const actor of [actors[0],actors[1]]) {
  it(`HU14-10 ${actor} recibe mensaje exacto de duplicado por endpoint aunque selector lo oculta`, () => { data().then((d) => {
   page(d,actor); const u = user(d); assign(u,d); coherent(d,[u]); changed(d,[[exam(d).id_examen,u.id]]).then((before) => {
    request('POST',endpoint(d),{ id_usuario:u.id }).its('status').should('eq',302)
    errorBag(d).then((errors) => { unchanged(before).then(() => expect(errors.id_usuario).to.eq(duplicate)) })
    cy.reload(); coherent(d,[u]); unchanged(before)
   })
  }) })
 }
})
