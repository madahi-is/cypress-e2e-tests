import { actors,data,page,assign,directAssign,user,exam,remove,coherent,changed,detail,unchanged } from './helpers.js'
describe('HU-14 Desasignación y exámenes distintos', () => {
 for (const actor of [actors[0],actors[1]]) {
  it(`HU14-11 ${actor} quita solo la relación y preserva usuario, rol y otras asignaciones`, () => { data().then((d) => {
   page(d,actor); const u = user(d); const other = user(d,'control2.hu14'); assign(u,d); assign(other,d); directAssign(d,u,true)
   changed(d,[[exam(d).id_examen,u.id],[exam(d).id_examen,other.id],[exam(d,true).id_examen,u.id]]).then((before) => {
    remove(u,d); coherent(d,[other]); changed(before,[[exam(d).id_examen,other.id],[exam(d,true).id_examen,u.id]]).then((after) => {
     cy.reload(); coherent(d,[other]); detail(d,true); coherent(d,[u],true); unchanged(after)
     cy.login(u.email); cy.visit('/registro-ingreso'); cy.get('.titulo-principal').should('have.text','Registro de Ingreso'); unchanged(after)
    })
   })
  }) })
 }
 it('HU14-12 quitar y volver a asignar no duplica relaciones', () => { data().then((d) => {
  page(d); const u = user(d); assign(u,d); changed(d,[[exam(d).id_examen,u.id]]).then((before) => {
   remove(u,d); coherent(d,[]); changed(before,[]).then((empty) => { assign(u,d); coherent(d,[u]); changed(empty,[[exam(d).id_examen,u.id]]); cy.reload(); coherent(d,[u]) })
  })
 }) })
 it('HU14-13 mismo miembro en exámenes con fechas/horas distintas y detalles aislados', () => { data().then((d) => {
  expect(exam(d).fecha).not.to.eq(exam(d,true).fecha); expect(exam(d).hora_inicio).not.to.eq(exam(d,true).hora_inicio)
  page(d); const u = user(d); const v = user(d,'control2.hu14'); const w = user(d,'control3.hu14'); assign(u,d); assign(v,d); detail(d,true); assign(u,d,true); assign(w,d,true)
  changed(d,[[exam(d).id_examen,u.id],[exam(d).id_examen,v.id],[exam(d,true).id_examen,u.id],[exam(d,true).id_examen,w.id]]).then((before) => {
   coherent(d,[u,w],true); detail(d); coherent(d,[u,v]); remove(u,d); coherent(d,[v]); changed(before,[[exam(d).id_examen,v.id],[exam(d,true).id_examen,u.id],[exam(d,true).id_examen,w.id]]).then((after) => { detail(d,true); coherent(d,[u,w],true); unchanged(after) })
  })
 }) })
})
