import { User } from './generate'

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to get element by data-cy values
       *
       * @returns {typeof getByDataCy}
       * @memberof Chainable
       * @example
       *       cy.getByDataCy('selector')
       */
      getByDataCy: typeof getByDataCy

      /**
       * Custom command to sign in
       *
       * @returns {typeof signUp}
       * @memberof Chainable
       * @example
       *       cy.signUp({ username: 'will', email: 'm@gmail.com', password: '123' })
       */
      signUp: typeof signUp
    }
  }
}

function getByDataCy(
  selector: string,
  options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>
) {
  return cy.get(`[data-cy="${selector}"]`, options)
}

function signUp(user: User) {
  cy.findByPlaceholderText(/username/i).type(user.username)
  cy.findByPlaceholderText(/email/i).type(user.email)
  cy.findByPlaceholderText(/^password/i).type(user.password)
  cy.findByPlaceholderText(/confirm password/i).type(user.password)
  cy.findByRole('button', { name: /sign up now/i }).click()
}

Cypress.Commands.add('getByDataCy', getByDataCy)

Cypress.Commands.add('shouldRenderBanner', () => {
  cy.get('.slick-slider').within(() => {
    cy.findByRole('heading', { name: /cyberpunk 2077/i })
    cy.findByRole('link', { name: /buy now/i })

    cy.get('.slick-dots > :nth-child(2) > button').click()
    cy.wait(500)

    cy.findByRole('heading', { name: /horizon zero dawn/i })
    cy.findByRole('link', { name: /buy now/i })

    cy.get('.slick-dots > :nth-child(3) > button').click()

    cy.findByRole('heading', { name: /huge promotion/i })
    cy.findByRole('link', { name: /browse games/i })
  })
})

Cypress.Commands.add('shouldRenderShowcase', ({ name, highlight = false }) => {
  cy.getByDataCy(name).within(() => {
    cy.findByRole('heading', { name }).should('exist')

    cy.getByDataCy('highlight').should(highlight ? 'exist' : 'not.exist')

    if (highlight) {
      cy.getByDataCy('highlight').within(() => {
        cy.findByRole('link').should('have.attr', 'href')
      })
    }

    cy.getByDataCy('game-card', { withinSubject: null }).should('have.length.gt', 0)
  })
})

Cypress.Commands.add('getFields', (fields) => {
  fields.map(({ label }) => {
    cy.findByText(label).should('exist')
  })
})

Cypress.Commands.add('shouldBeLessThan', (value) => {
  cy.findByText(/^\$\d+(\.\d{1,2})?/)
    .invoke('text')
    .then(($el) => $el.replace('$', ''))
    .then(parseFloat)
    .should('be.lt', value)
})

Cypress.Commands.add('shouldBeGreaterThan', (value) => {
  cy.findByText(/^\$\d+(\.\d{1,2})?/)
    .invoke('text')
    .then(($el) => $el.replace('$', ''))
    .then(parseFloat)
    .should('be.gt', value)
})

Cypress.Commands.add('signUp', signUp)

Cypress.Commands.add('signIn', (email = 'e2e@wongames.com', password = '123456') => {
  cy.url().should('contain', `${Cypress.config().baseUrl}/sign-in`)
  cy.findByPlaceholderText(/email/i).type(email)
  cy.findByPlaceholderText(/^password/i).type(password)
  cy.findByRole('button', { name: /sign in now/i }).click()
})

Cypress.Commands.add('addToCartByIndex', (index) => {
  cy.getByDataCy('game-card')
    .eq(index)
    .within(() => {
      cy.findByRole('button', { name: /^add to cart/i }).click()
    })
})

Cypress.Commands.add('removeFromCartByIndex', (index) => {
  cy.getByDataCy('game-card')
    .eq(index)
    .within(() => {
      cy.findByRole('button', { name: /^remove from cart/i }).click()
    })
})

/*
eslint
  @typescript-eslint/no-namespace: "off",
*/
