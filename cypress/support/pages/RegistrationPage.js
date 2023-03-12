///<reference types = "cypress"/>

import BasePage from '../pages/BasePage'
import { faker } from '@faker-js/faker'

class RegistrationPage extends BasePage {

    visit() {
        cy.log('Open User Registration page')
        cy.visit('/login#/register')
    }

    assertUserRegistrationPageOpened() {
        cy.get('h1').should('have.text', 'User Registration')
    }
    
    getEmailField() {
        return cy.get('#emailControl')
    }

    getPasswordField() {
        return cy.get('#passwordControl')
    }

    getRepeatPasswordField() {
        return cy.get('#repeatPasswordControl')
    }

    getSecurityQuestionDropdown() {
        return cy.get('#mat-select-0')
    }

    getFirstSecurityQuestion() {
        return cy.get('.mat-option-text').first()
    }

    getAnswerField() {
        return cy.get('#securityAnswerControl')
    }

    getRegisterButton() {
        return cy.get('#registerButton')
    }

    assertUniqueEmailError() {
        cy.get('.error').should('have.text', 'Email must be unique')
    }

    assertPasswNotMatchError() {
        cy.get('mat-error').should('have.text', ' Passwords do not match ')
    }

    createNewAccount(user) {
        this.getEmailField().type(user.randomEmail)
        this.getPasswordField().type(user.randomPassword)
        this.getRepeatPasswordField().type(user.randomPassword)
        this.getSecurityQuestionDropdown().click()
        this.getFirstSecurityQuestion().click()
        this.getAnswerField().type(user.answer)
        this.getRegisterButton().click()
    }

    createNewAccountWithUsedEmail(user) {
        this.createNewAccount(user)
        this.assertUniqueEmailError()
    }

    createNewAccountWithNotMatchingPassw(user) {
        this.getEmailField().type(user.randomEmail)
        this.getPasswordField().type(user.randomPassword)
        this.getRepeatPasswordField()
            .type(faker.random.numeric(3) + user.randomPassword) //random num to make passw different
        this.getSecurityQuestionDropdown().click()
        this.getFirstSecurityQuestion().click()
        this.getAnswerField().type(user.answer)
        this.getRegisterButton().click({force:true})
        this.assertPasswNotMatchError()
    }

}

export default new RegistrationPage()