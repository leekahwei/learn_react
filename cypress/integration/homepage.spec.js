describe('Home Page', () => {
  it('Page successfully loads',  () => {
    cy.visit('/')
  })

  describe('Valid Form Input', () => {
    it('field inputs', () => {
      cy.get('form').within(() => {
        cy.get('div:first > input').type('Hello')
        cy.get('div > select').select('3')
        cy.get('div:nth-child(3) > div > div:nth-child(2) > input').check()
        cy.get('div > textarea').type('Hello World')
        cy.get('div:nth-child(5) > div > input').check()
      })
    })

    it('Submit submission', () => {
      cy.get('div.container > div.row > div.col > div > button').click()
      cy.get('div.swal-overlay > div.swal-modal').within(() => {
        cy.get('div.swal-title').contains('Confirm Submission?')
        cy.get('div.swal-text').contains('Are you sure you wish to submit these details?')
        cy.get('div.swal-button-container > button').contains('OK').click()
      })
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000)
      cy.get('div.swal-overlay > div.swal-modal').within(() => {
        cy.get('div.swal-title').contains('Submission Success!')
        cy.get('div.swal-text').contains('You\'ve successfully submitted the details')
        cy.get('div.swal-button-container > button').contains('OK').click()
      })
      cy.url().should('eq', 'http://localhost:3000/')
    })
  })

  describe('Invalid Form Input', () => {
    it('Couldn\'t click submit button when checkbox not checked', () => {
      cy.get('form').within(() => {
        cy.get('div:first > input').clear()
        cy.get('div > textarea').clear()
        cy.get('div:nth-child(5) > div > input').uncheck()
      })
      cy.get('div.container > div.row > div.col > div > button').should('be.disabled')
    })

    it('Checkbox checked, but fields are empty', () => {
      cy.get('form').within(() => {
        cy.get('div:first > input').clear()
        cy.get('div > textarea').clear()
        cy.get('div:nth-child(5) > div > input').check()
      })
      cy.get('div.container > div.row > div.col > div > button').click()
      cy.get('div.swal-overlay > div.swal-modal').within(() => {
        cy.get('div.swal-title').contains('Details incomplete!')
        cy.get('div.swal-text').contains('Some fields are incomplete, please make sure all fields are filled properly')
        cy.get('div.swal-button-container > button').contains('OK').click()
      })
    })
  })
})