import { data, panel, student, upload, changedPhoto, image, unchanged, directPhoto, logout, validate, request } from './helpers.js';
import { select as controlSelect, verify } from '../HU-11/helpers.js';
describe('HU-15 Fotografía', () => {
  for (const extension of ['jpg', 'png'])
    it(`HU15-08 subir ${extension.toUpperCase()} persiste foto y referencia tras recarga`, () => {
      data().then((d) => {
        panel();
        upload(`perfil.${extension}`);
        changedPhoto(d).then((s) => {
          cy.reload();
          image('.avatar-img');
          cy.get('.avatar-img').should('have.attr', 'src', student(s).foto_url!);
          unchanged(s);
        });
      });
    });
  it('HU15-27 foto persistida se muestra en identificación de control (API y UI)', () => {
    data().then((d) => {
      cy.login('control.e2e@example.test');
      validate(d.examen, student(d).codigo_universitario, 200, student(d).id_estudiante).then((body) => expect(body.foto_url).to.eq(student(d).foto_url));
      cy.visit('/registro-ingreso');
      controlSelect('EXAMEN ACTIVO').select(String(d.examen));
      controlSelect('AMBIENTE').select(String(d.pivots.find((p) => p.id_examen === d.examen && p.id_ambiente === d.ambiente)!.id_examen_ambiente));
      cy.contains('.registro-wrapper button', 'INICIAR REGISTRO').click();
      verify(student(d).codigo_universitario);
      cy.get('.foto-perfil').should('have.attr', 'src', student(d).foto_url!);
      image('.foto-perfil');
      unchanged(d);
    });
  });
  for (const kind of ['formato', 'tamaño'])
    it(`HU15-09 UI rechaza ${kind} y conserva foto previa y archivos`, () => {
      data().then((d) => {
        panel();
        let calls = 0;
        cy.intercept('POST', '**/estudiante/foto', () => {
          calls++;
        });
        cy.get('input[type="file"]').selectFile(`cypress/fixtures/archivos/${kind === 'formato' ? 'no-imagen.txt' : 'grande.png'}`, { force: true });
        cy.get('.file-error-msg').should('contain', kind === 'formato' ? 'Formato no soportado' : '2 MB');
        cy.then(() => expect(calls).to.eq(0));
        unchanged(d);
      });
    });
  it('HU15-28 backend rechaza formato inválido sin guardar ni perder foto previa', () => {
    data().then((d) => {
      panel();
      directPhoto('no-imagen.txt').then((r) => {
        unchanged(d).then(() => {
          expect(r.status).to.eq(422);
          expect(r.body).to.have.property('errors');
        });
      });
    });
  });
  it('HU15-24 carga con id ajeno no modifica foto del otro estudiante', () => {
    data().then((d) => {
      panel();
      directPhoto('perfil.png', { id_estudiante: String(student(d, 'Bruno').id_estudiante) });
      changedPhoto(d);
    });
  });
  it('HU15-25 visitante no puede cargar fotografía', () => {
    data().then((d) => {
      cy.visit('/login');
      directPhoto('perfil.png').then((r) => expect(r.status).to.eq(401));
      unchanged(d);
    });
  });
  for (const [label, accepted] of [['limite-menos', true], ['limite-exacto', true], ['limite-mas', false]] as const)
    it(`HU15-29 caracteriza frontera frontend ${label} (política servidor pendiente)`, () => {
      data().then((d) => {
        panel();
        if (accepted) {
          upload(`${label}.png`);
        }
        else {
          cy.get('input[type="file"]').selectFile(`cypress/fixtures/archivos/${label}.png`, { force: true });
          cy.get('.file-error-msg').should('contain', '2 MB');
          unchanged(d);
        }
      });
    });
});
