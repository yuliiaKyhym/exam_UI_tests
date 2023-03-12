///<reference types = "cypress"/>

import BasePage from './BasePage'

class OrderSummaryPage extends BasePage {

    getPageTitle() {
        return cy.get('.order-summary')
    }

    assertOrderSummaryPageOpened() {
        this.getPageTitle().should('have.text', 'Order Summary')
    }

    getPlaceAndPayButton() {
        return cy.get('#checkoutButton')
    }

}

export default new OrderSummaryPage()