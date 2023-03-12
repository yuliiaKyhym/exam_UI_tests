///<reference types = "cypress"/>

import BasePage from './BasePage'

class CreateAddressPage extends BasePage {

    getPageTitle() {
        return cy.get('h1')
    }

    assertCreateAddressPageOpened() {
        this.getPageTitle().should('have.text', 'Add new address')
    }

    getCountryField() {
      
      return cy.get('[placeholder="Please provide a country."]')  //  return cy.get('#mat-input-1') 
    }

    getNameField() {
        return cy.get('[placeholder="Please provide a name."]') //return cy.get('#mat-input-2')
    }

    getMobileField() {
        return cy.get('[placeholder="Please provide a mobile number."]')
    }

    getZipcodeField() {
        return cy.get('[placeholder="Please provide a ZIP code."]')
    }

    getAddressField() {
        return cy.get('#address')
    }

    getCityField() {
        return cy.get('[placeholder="Please provide a city."]')
    }

    getStateField() {
        return cy.get('[placeholder="Please provide a state."]')
    }

    getSubmitButton() {
        return cy.get('#submitButton')
    }

    assertAddressCreated(address) {
        cy.get('simple-snack-bar')
            .should('have.text', `The address at ${address.city} has been successfully added to your addresses.X`)
    }

    getContinueButton() {
        return cy.get('button:contains("Continue")')
    }

    submitNewAddressForm(user, address) {
        this.getCountryField().type(address.country)
        this.getNameField().type(user.name)
        this.getMobileField().type(address.mobileNumber)
        this.getZipcodeField().type(address.zipCode)
        this.getAddressField().type(address.address)
        this.getCityField().type(address.city)
        this.getStateField().type(address.state)
        this.getSubmitButton().click()
        this.assertAddressCreated(address)
    }
}

export default new CreateAddressPage()