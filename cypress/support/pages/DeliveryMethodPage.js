///<reference types = "cypress"/>

import BasePage from './BasePage'

class DeliveryMethodPage extends BasePage {

    getPageTitle() {
        return cy.get('h1').first()
    }

    assertDeliveryMethodPageOpened() {
        this.getPageTitle().should('have.text', 'Delivery Address')
    }

    getDeliverySpeedRadioBtn() {
        return cy.get('mat-radio-button').first()
    }

    getContinueButton() {
        return cy.get('button:contains("Continue")')
    }
}

export default new DeliveryMethodPage()