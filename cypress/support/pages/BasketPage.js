///<reference types = "cypress"/>

import BasePage from '../pages/BasePage'

class BasketPage extends BasePage {

    getPageTitle() {
        return cy.get('h1')
    }

    assertBasketPageOpened(user) {
        this.getPageTitle().should('contain.text', `Your Basket (${user.email})`)
    }

    getJuiceName() {
        return cy.get('.mat-cell.cdk-cell.cdk-column-product')
    }

    assertJuiceName(juiceName) {
        this.getJuiceName().should('have.text', juiceName)
    }

    getJuiceAmount() {
        return cy.get('[style="font-size: initial;"]')
    }

    assertOneJuiceInBasket() {
        this.getJuiceAmount().should('have.text', ' 1')
    }

    getCheckoutButton() {
        return cy.get('#checkoutButton')
    }

    proceedToCheckout(user, juiceName) {
        this.assertBasketPageOpened(user)
        this.assertJuiceName(juiceName)
        this.assertOneJuiceInBasket()
        this.getCheckoutButton().click()
    }
}

export default new BasketPage()