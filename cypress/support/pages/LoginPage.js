///<reference types = "cypress"/>

import BasePage from '../pages/BasePage'
import { faker } from '@faker-js/faker'

class LoginPage extends BasePage {

    visit() {
        cy.visit('/login#/login')
    }
    
    getEmailField() {
        return cy.get('#email')
    }

    getPasswordField() {
        return cy.get('#password')
    }

    getLoginButton() {
        return cy.get('#loginButton')
    }

    assertErrorMessageInvalidUser() {
        cy.get('.error').should('contain.text', 'Invalid email or password.')
    }

    submitLoginFormValidUser(user) {
        this.getEmailField().type(user.email)
        this.getPasswordField().type(user.password)
        this.getLoginButton().click()
    }

    submitLoginFormUnregisteredUser(user) {
        this.getEmailField()
            .type(faker.random.word() + user.randomEmail) //random word to make email unregistered
        this.getPasswordField().type(user.randomPassword)
        this.getLoginButton().click()
        this.assertErrorMessageInvalidUser()
    }

    submitLoginFormInvalidEmail(user) {
        this.getEmailField().type(user.randomEmail)
        this.getPasswordField().type(user.password)
        this.getLoginButton().click()
        this.assertErrorMessageInvalidUser()
    }

    submitLoginFormInvalidPassword(user) {
        this.getEmailField().type(user.email)
        this.getPasswordField().type(user.randomPassword)
        this.getLoginButton().click()
        this.assertErrorMessageInvalidUser()
    }

    getRegistrationConfirmPopup() {
        return cy.get('.mat-simple-snack-bar-content')
    }

    assertAccountCreatedPopupText() {
        this.getRegistrationConfirmPopup()
            .should('have.text', 'Registration completed successfully. You can now log in.')
    }

}

export default new LoginPage()