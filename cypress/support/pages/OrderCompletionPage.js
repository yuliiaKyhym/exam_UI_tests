///<reference types = "cypress"/>

import BasePage from './BasePage'

class OrderCompletionPage extends BasePage {

    getPageTitle() {
        return cy.get('h1')
    }

    assertOrderCompletionPageOpened() {
        this.getPageTitle().should('have.text', 'Thank you for your purchase!')
    }

}

export default new OrderCompletionPage()