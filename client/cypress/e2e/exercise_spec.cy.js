describe('exercise', () => {
  it('creating, viewing, editing and deleting an exercise', () => {
    //visit the home page and click calendar
    cy.visit('http://localhost:3000/')
    cy.contains('Calendar').click()

    //click add on the 20th
    cy.findByRole('20').within(() => {
      cy.findByRole('addbut').click()
    })

    //enter a 100kg bench for one set of 2 and click save
    cy.get('select').select('Benchpress')
    cy.findByPlaceholderText('Enter weight').clear()
    cy.findByPlaceholderText('Enter weight').type('100')
    cy.findByPlaceholderText('Enter sets').clear()
    cy.findByPlaceholderText('Enter sets').type('1')
    cy.findByPlaceholderText('Enter reps').clear()
    cy.findByPlaceholderText('Enter reps').type('2')
    cy.findByRole('savbut').click()

    //click the new benchpress button and check data
    cy.findByRole('20').within(() => {
      cy.contains('Benchpress').click()
    })
    cy.get('select').should('have.value','2')
    cy.findByPlaceholderText('Enter weight').should('have.value','100')
    cy.findByPlaceholderText('Enter sets').should('have.value','1')
    cy.findByPlaceholderText('Enter reps').should('have.value','2')

    //click edit, change it to 50kg and click save
    cy.findByRole('editbut').click()
    cy.findByPlaceholderText('Enter weight').clear()
    cy.findByPlaceholderText('Enter weight').type('50')
    cy.findByRole('savbut').click()

    //click bench button and check data
    cy.findByRole('20').within(() => {
      cy.contains('Benchpress').click()
    })
    cy.findByPlaceholderText('Enter weight').should('have.value','50')

    //click delete, click YES
    cy.findByRole('delbut').click()
    cy.findByRole('surebut').click()

    //should now be gone
    cy.findByRole('20').within(() => {
      cy.contains('Benchpress').should('not.exist');
    })

  })
})