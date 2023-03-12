///<reference types = "cypress"/>

export default class BasePage {

    getAccountButton() {
        return cy.get('#navbarAccount')
    }

    getLoginButton() {
        return cy.get('#navbarLoginButton')
    }

    getWelcomeDismissButton() {
        return cy.get('[aria-label="Close Welcome Banner"]')
    }

    getLanguageChangedPopup() {
        return cy.get('.mat-simple-snack-bar-content')
    }
    
    getForcePageReloadBtn() {
        return cy.get(".mat-button-wrapper:contains('Force page reload')")
    }

    assertLanguagePopupText() {
        this.getLanguageChangedPopup()
            .should('have.text', 'Language has been changed to English')
    }

    openLoginPage() {
        this.getAccountButton().click()
        this.getLoginButton().click()
    }

    getSearchButton(){
        return cy.get('#searchQuery')
    }
}
