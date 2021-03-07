describe('Header of Page', () => {
  it('Header successfully loaded',  () => {
    cy.visit('/')
  })

  describe('Navbar',() => {
    it('Check Nav Brand', () => {
      cy.get('nav').within(() => {
        cy.get('a').should('have.class', 'navbar-brand').contains('React-Bootstrap').as('navbarTitle')
        cy.get('@navbarTitle').click().url().should('eq', 'http://localhost:3000/#home')
      })
    })
  
    it('Check Nav Content - Home', () => {
      cy.get('nav').within(() => {
        cy.get('.navbar-collapse').get('.navbar-nav a:first').contains('Home').as('navbarHome')
        cy.get('@navbarHome').click().url().should('eq', 'http://localhost:3000/#home')
      })
    })
  
    it('Check Nav Content - Link', () => {
      cy.get('nav').within(() => {
        cy.get('.navbar-collapse').get('.navbar-nav a:nth-child(2)').contains('Link').as('navbarLink')
        cy.get('@navbarLink').click().url().should('eq', 'http://localhost:3000/#link')
      })
    })

    it('Check Nav-Content - Dropdown', () => {
      cy.get('nav').within(() => {
        cy.get('.navbar-collapse').get('.navbar-nav div').should('have.class', 'nav-item dropdown').as('navbarDropdown')
        cy.get('@navbarDropdown').get('a').should('have.class', 'dropdown-toggle nav-link')
        cy.get('@navbarDropdown').get('.dropdown-menu').should('not.exist')
        
        cy.get('@navbarDropdown').click()
        cy.get('@navbarDropdown').get('.dropdown-menu').as('dropdown')
        cy.get('@dropdown').get('.show')
        cy.get('@dropdown').get('div .dropdown-divider')
        cy.get('@dropdown').get('.dropdown-item:first').contains('Action')
        .click().url().should('eq', 'http://localhost:3000/#action/3.1')

        cy.get('@navbarDropdown').click()
        cy.get('@dropdown').get('.dropdown-item:nth-child(2)').contains('Another action')
        .click().url().should('eq', 'http://localhost:3000/#action/3.2')

        cy.get('@navbarDropdown').click()
        cy.get('@dropdown').get('.dropdown-item:nth-child(3)').contains('Something')
        .click().url().should('eq', 'http://localhost:3000/#action/3.3')

        cy.get('@navbarDropdown').click()
        cy.get('@dropdown').get('.dropdown-item:nth-child(5)').contains('Separated link')
        .click().url().should('eq', 'http://localhost:3000/#action/3.4')
      })
    })
  })

  describe('Search Bar', () => {
    it('Check search section\'s content', () => {
      cy.get('nav .navbar-collapse form').within(() => {
        cy.get('input').should('have.class', 'mr-sm-2 form-control').should('have.value', '')
        cy.get('button').should('have.class', 'btn btn-outline-success').contains('Search')
      })
    })

    it('Check Search without text input', () => {
      cy.get('nav .navbar-collapse form button').click()
      cy.get('div .modal .show').should('not.exist')
    })

    it('Check Search with input', () => {
      cy.get('nav .navbar-collapse form input').type('a')
      cy.get('nav .navbar-collapse form button').click()
      cy.get('div').should('have.class', 'fade modal show')
      .get('div > div > div .modal-footer > button').click()
      cy.get('nav .navbar-collapse form input').clear()
    })
  })
})