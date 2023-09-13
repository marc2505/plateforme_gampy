describe('Connexion', () => {
  it('Connects with thomasdeslandres86@gmail.com', () => {
    cy.visit('https://keums.com')
    cy.get('[href="/login"]').click()
    cy.get('#formBasicEmail').type('thomasdeslandres86@gmail.com')
    cy.get('#formBasicPassword').type('thomas12@')
    cy.get('.text-center > .btn').click()
    cy.wait(1000)
    cy.get('#dropdown-basic').click()
    cy.url().should(
        'eq', 'https://keums.com/home'
    )
    cy.get('.mx-auto > [href="/home"]').should(
        'have.text',
        'Se déconnecter'
    )
    cy.get('.dropdown > .text-center > div').should(
        'have.text',
        'thomas deslandres'
    )
    // cy.get('[href="/signup"]').click()
    // cy.get(':nth-child(1) > .mb-3 > div > .form-control').type('Test nom')
    // cy.get(':nth-child(1) > :nth-child(2) > div > .form-control').type('Test prénom')
    // cy.get(':nth-child(2) > .mb-3 > div > .form-control').type('Test pseudo')
    // cy.get(':nth-child(2) > :nth-child(2) > div > .form-control').type('test@test.test')
    // cy.get(':nth-child(3) > .mb-3 > div > .form-control').type('test12@')
    // cy.get(':nth-child(3) > :nth-child(2) > div > .form-control').type('test12@')
    // cy.get('#formGridCheckbox').click()
    // cy.get('.text-center > .btn').click()

  })
})