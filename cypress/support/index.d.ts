/// <reference types="cypress" />

type User = {
  username: string
  email: string
  password: string
}

type ShowcaseAttributes = {
  name: string
  highlight?: boolean
}

type FieldsAttributes = {
  label: string
  name: string | number
}

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to sign in
     * @example cy.signUp({ username: 'will', email: 'm@gmail.com', password: '123' })
     */
    signUp(user: User): void

    /**
     * Custom command to sign in
     * @example cy.signUp({ username: 'will', email: 'm@gmail.com', password: '123' })
     */
    signIn(email?: string, password?: string): void

    /**
     * Custom command to get element by data-cy values
     * @example cy.getByDataCy('selector')
     */
    getByDataCy(
      selector: string,
      options?: Partial<
        Cypress.Loggable &
          Cypress.Timeoutable &
          Cypress.Withinable &
          Cypress.Shadow
      >
    ): Chainable<JQuery<Element>>

    /**
     * Custom command to get fields by label
     * @example cy.getFields([{ label: 'foo', name: 'foo' }])
     */
    getFields(fields: FieldsAttributes[]): void

    /**
     * Custom command to check banner in page
     * @example cy.shouldRenderBanner()
     */
    shouldRenderBanner(): void

    /**
     * Custom command to check if value is less than price
     * @example cy.shouldBeLessThan(100)
     */
    shouldBeLessThan(value: number): void

    /**
     * Custom command to check if value is greater than price
     * @example cy.shouldBeGreaterThan(50)
     */
    shouldBeGreaterThan(value: number): void
  }
}
