describe('User Flows', () => {
  // Test 1: Login flow
  it('1. Bruger skal kunne logge ind', () => {
    cy.visit('/login');
    cy.get('input[type="email"]').type('manager@test.dk');
    cy.get('input[type="password"]').type('test123');
    cy.get('button#login').click();
    cy.url().should('include', '/dashboard');
  });

  // Test 2: Beskyttelse af ruter
  it('2. Bruger skal sendes til login hvis ikke logget ind', () => {
    cy.visit('/manager/projects');
    cy.url().should('include', '/login');
  });

  // Test 3: Navigation i projekter
  it('3. Bruger skal kunne klikke på et projekt og se detaljer', () => {
    cy.visit('/dashboard');
    cy.get('.project-card').first().click();
    cy.url().should('contain', '/project/');
  });

  // Test 4: Logout
  it('4. Bruger skal kunne logge ud', () => {
    // Først log ind
    cy.visit('/login');
    cy.get('input[type="email"]').type('manager@test.dk');
    cy.get('input[type="password"]').type('test123');
    cy.get('button#login').click();
    // Så log ud
    cy.get('#logout-btn').click();
    cy.url().should('include', '/login');
  });
});