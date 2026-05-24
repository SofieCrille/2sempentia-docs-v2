describe('Manager E2E Workflows', () => {

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('1. Manager skal kunne logge ind og se sit dashboard', () => {
    cy.visit('/login');
    cy.get('input[type="email"]').type('manager@test.dk');
    cy.get('input[type="password"]').type('test123');
    cy.contains('button', 'LOG IND').click();

    cy.url().should('include', '/manager');
    cy.get('body').should('be.visible');
  });

  it('2. Manager skal kunne logge ud igen fra indstillinger', () => {
    // 1. Log ind 
    cy.visit('/login');
    cy.get('input[type="email"]').type('manager@test.dk');
    cy.get('input[type="password"]').type('test123');
    cy.contains('button', 'LOG IND').click();
    cy.url().should('include', '/manager');

    // 2. Gå til indstillinger (SettingsView)
    cy.visit('/manager/settings'); 
    cy.contains('button', 'Log ud').click({ force: true });
    
    // 4. Bekræft at manageren lander på login-siden igen
    cy.url().should('include', '/login');
  });

});