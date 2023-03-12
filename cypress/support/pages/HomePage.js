///<reference types = "cypress"/>

import BasePage from '../pages/BasePage'

class HomePage extends BasePage {

    visit() {
        cy.log('Open Homepage page')
        cy.visit('/')
    }

    getYourBasketBtn() {
        return cy.get('[routerlink="/basket"]')
    }

    assertUserLoggedIn() {
        this.getYourBasketBtn().should('contain.text', 'Your Basket')
    }

    getAddToBasketButton() {
        return cy.get('[aria-label="Add to Basket"]').first()
    }

    getSearchResultTitle() {
        return cy.get('#searchValue')
    }

    assertSearchResultTitleText() {
        this.getSearchResultTitle().should('have.text', 'e')
    }

    getJuiceAddedToBasketPopup() {
        return cy.get('.mat-simple-snack-bar-content', { timeout: 20000 })
    }

    assertJuiceToBasketPopupText(juiceName) {
        this.getJuiceAddedToBasketPopup()
            .should('be.visible')
            .and('have.text', `Placed${juiceName}into basket.`)
    }

    addJuiceToTheBasket(juiceName) {
        this.getAddToBasketButton().click()
        this.assertJuiceToBasketPopupText(juiceName)
        this.getYourBasketBtn().click()
    }

    getCloseDialogButton() {
        return cy.get('[aria-label="Close Dialog"]')
    }

    addFoundJuiceToTheBasket(juiceName) {

        cy.get('.mat-grid-tile-content').then(juiceCard => {
            let neededJuiceCard = juiceCard.has(`.item-name:contains("${juiceName}")`)
            let buttonForNeededJuice = neededJuiceCard.find('span:contains("Add to Basket")')
            cy.wrap(buttonForNeededJuice).first().click()
        })

        this.assertJuiceToBasketPopupText(juiceName)
        this.getYourBasketBtn().click()
    }
}

export default new HomePage()
