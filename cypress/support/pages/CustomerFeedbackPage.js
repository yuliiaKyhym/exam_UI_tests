///<reference types = "cypress"/>

import { faker } from '@faker-js/faker'
import { evaluate } from 'mathjs'
import BasePage from './BasePage'

class CustomerFeedbackPage extends BasePage {

    visit() {
        cy.visit('/#/contact')
    }

    getPageTitle() {
        return cy.get('h1')
    }

    assertFeedbackPageOpened() {
        this.getPageTitle().should('have.text', 'Customer Feedback')
    }

    getAuthorField() {
        return cy.get('#mat-input-12')
    }

    getCommentFieild() {
        return cy.get('#comment')
    }

    getRatingSlider() {
        return cy.get('#rating')
    }

    getResultField() {
        return cy.get('#captchaControl')
    }

    solveCaptcha() {
        cy.get('code').then((expression => {
            let expValue = expression.text()
            let answ = evaluate(expValue)
            console.log(answ)

            this.getResultField().type(answ)
        }))
    }

    getSubmitButton() {
        return cy.get('#submitButton')
    }

    getFeedBackConfirmPopup() {
        return cy.get('simple-snack-bar')
    }

    assertFeedbackPopupText() {
        this.getFeedBackConfirmPopup().should('have.text', 'Thank you for your feedback.X')
    }

    submitFeedbackForm() {
        this.getCommentFieild().type(faker.random.words(10))
        this.getRatingSlider().type('{rightArrow}{rightArrow}{leftArrow}')
        this.solveCaptcha()
        this.getSubmitButton().click()
        this.assertFeedbackPopupText()
    }
}

export default new CustomerFeedbackPage()