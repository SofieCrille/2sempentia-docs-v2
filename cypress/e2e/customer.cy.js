describe('Customer E2E Workflows', () => {

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('1. Customer skal kunne logge ind og lande på sin rute', () => {
    cy.visit('/login');
    
    cy.get('input[type="email"]').type('customer@test.dk'); 
    cy.get('input[type="password"]').type('test123');
    
    cy.contains('button', 'LOG IND').click();

    cy.url().should('include', '/customer'); 
    cy.get('body').should('be.visible');
  });

  it('2. Customer må ikke kunne tilgå manager-siden', () => {
    
    cy.visit('/login');
    cy.get('input[type="email"]').type('customer@test.dk'); 
    cy.get('input[type="password"]').type('test123');
    cy.contains('button', 'LOG IND').click();
    
    cy.visit('/manager');

    cy.url().should('not.include', '/manager');
  });

});