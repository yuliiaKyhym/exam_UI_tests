///<reference types = "cypress"/>

import BasePage from './BasePage'

class SelectAddressPage extends BasePage {

    getPageTitle() {
        return cy.get('h1')
    }

    assertSelectAddressPageOpened() {
        this.getPageTitle().should('have.text', 'Select an address')
    }

    getExistedAddressRadioBtn() {
        return cy.get('mat-radio-button').first()
    }

    getAddNewAddressButton() {
        return cy.get('[routerlink="/address/create"]')
    }

    getContinueButton() {
        return cy.get('button:contains("Continue")')
    }
}

export default new SelectAddressPage()