describe('photo', () => {
    it('creating, viewing and deleting a photo', () => {
      //visit the home page
      cy.visit('http://localhost:3000/');

      //click the calendar
      cy.contains('Calendar').click();

      //click add photo on the 20th
      cy.findByRole('20').within(() => {
        cy.findByRole('phobut').click();
      })

      //enter a file with the wrong type and check the warning appears
      cy.get('input[type=file]').selectFile('cypress/e2e/fatcat.webp');
      cy.findByRole('savbut').click();
      cy.contains('Please use an image of either type jpg, jpeg or png.');


      //check tthere is no photo
      cy.findByRole('20').within(() => {
        cy.contains('Photo').should('not.exist');
      })

      //enter a good file + click save + check calendar
      cy.get('input[type=file]').selectFile('cypress/e2e/mingles.jpg');
      cy.findByRole('savbut').click();
  
      //click the photo button + check photo
      cy.findByRole('20').within(() => {
        cy.contains('Photo').click();
      })

      cy.findByRole('formimg').should('have.attr', 'src').should('include', '20-8-2024-mingles.jpg');
  
      //click delete, click YES
      cy.findByRole('delbut').click();
      cy.findByRole('surebut').click();
  
      //should now be gone
      cy.findByRole('20').within(() => {
       cy.contains('Photo').should('not.exist');
      })

    })
  })