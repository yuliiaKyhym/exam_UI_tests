///<reference types = "cypress"/>

import BasePage from './BasePage'

class PaymentPage extends BasePage {

    getPageTitle() {
        return cy.get('h1')
    }

    assertPaymentPageOpened() {
        this.getPageTitle().should('have.text', 'My Payment Options')
    }

    getSelectCardRadioButton() {
        return cy.get('mat-radio-button').first()
    }

    getAddNewCardButton() {
        return cy.get('mat-panel-title:contains("Add new card")')
    }

    getNameField() {
        return cy.get('input[type="text"]').eq(1)
    }

    getCardNumberField() {
        return cy.get('input[type="number"]')
    }

    getExpiryMonthField() {
        return cy.get('mat-form-field select ').first()
    }

    getExpiryYearField() {
        return cy.get('mat-form-field select ').last()
    }

    getSubmitCardButton() {
        return cy.get('#submitButton')
    }

    getConfirmationPopup() {
        return cy.get('.mat-simple-snackbar.ng-star-inserted', { timeout: 8000 })
    }

    assertCardAddedPopupText(paymentInfo) {
        let lastCardDigits = paymentInfo.cardNumber.substring(15, 19)
        this.getConfirmationPopup()
            .should('have.text', `Your card ending with ${lastCardDigits} has been saved for your convenience.X`)
    }

    getContinueButton() {
        return cy.get('button:contains("Continue")')
    }

    addNewCard(user, paymentInfo) {
        this.getAddNewCardButton().click()
        this.getNameField().type(user.name)
        this.getCardNumberField().type(paymentInfo.cardNumber)
        this.getExpiryMonthField().select(paymentInfo.cardExpMonth)
        this.getExpiryYearField().select(paymentInfo.cardExpYear)
        this.getSubmitCardButton().click()
        this.assertCardAddedPopupText(paymentInfo)
    }
}

export default new PaymentPage()