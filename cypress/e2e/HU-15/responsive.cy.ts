import { data, panel, student, fits, image, upload, changedPhoto, regenerate, changedQr, qrToken } from './helpers.js';
describe('HU-15 Responsive independiente de decoder', () => {
  for (const [device, w, h] of [['móvil', 390, 844], ['tablet', 768, 1024]] as const) {
    it(`HU15-30 ${device} identidad, QR y controles accesibles sin desbordamiento`, () => {
      cy.viewport(w, h);
      data().then((d) => {
        panel();
        fits();
        cy.get('.student-name').should('be.visible').and('contain', student(d).nombres);
        cy.get('.student-code-badge').should('be.visible').and('contain', student(d).codigo_universitario);
        image('.qr-image');
        cy.get('.btn-regenerar, button[aria-label="Cambiar fotografía"]').each(($el) => cy.wrap($el).scrollIntoView().should('be.visible').and('be.enabled'));
      });
    });
    it(`HU15-30 ${device} CI visible de forma independiente`, () => {
      cy.viewport(w, h);
      data().then((d) => {
        panel();
        cy.contains('.credential-card', student(d).documento_identidad).should('be.visible');
      });
    });
    it(`HU15-31 ${device} selección y subida de foto funcionan`, () => {
      cy.viewport(w, h);
      data().then((d) => {
        panel();
        cy.get('button[aria-label="Cambiar fotografía"]').scrollIntoView().should('be.visible').click();
        upload();
        changedPhoto(d).then((s) => {
          cy.reload();
          cy.get('.avatar-img').should('have.attr', 'src', student(s).foto_url!);
          fits();
        });
      });
    });
    it(`HU15-32 ${device} regeneración funciona y persiste`, () => {
      cy.viewport(w, h);
      data().then((d) => {
        panel();
        cy.get('.btn-regenerar').scrollIntoView().should('be.visible').and('be.enabled');
        regenerate();
        changedQr(d).then((after) => {
          qrToken().should('eq', student(after).codigo_qr);
          cy.reload();
          qrToken().should('eq', student(after).codigo_qr);
        });
        fits();
      });
    });
  }
});
