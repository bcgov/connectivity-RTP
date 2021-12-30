describe('Form Validation', () => {
  it('fills input values and traverses the form', () => {
    cy.visit('/');

    cy.contains('Begin New Application').click();

    cy.contains('Continue').click();

    cy.get('input[name="Applicant organization (legal name):"]').type('Shadow Org');
    cy.get('input[name="Street number:"]').type('123');
    cy.get('input[name="Street name:"]').type('Main st.');
    cy.get('input[name="City:"]').type('Victoria');
    cy.get('input[name="Postal code:"]').type('V8E7A1');

    cy.contains('Continue').click();

    cy.get('input[name="Primary contact (for this application):"]').type('Jane Doe');
    cy.get('input[name="Position/title:"]').type('Applications specialist');
    cy.get('input[name="Email:"]').type('fake@email.com');
    cy.get('input[name="Telephone:"]').type('(555)555-1234');

    cy.contains('Cancel').click();

    cy.location('pathname').should('eq', '/');
  });
});