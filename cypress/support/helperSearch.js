///<reference types = "cypress"/>

export function findJuice(juiceName) {
    cy.get('mat-grid-tile').then(juice => {
        let neededJuice
        if ((neededJuice = juice.find(`.item-name:contains("${juiceName}")`)).length > 0) {
            cy.wrap(neededJuice).click()
        }
        else {
            cy.get('.mat-paginator-range-actions').then(pages => {
                let neededPage = pages.find('[aria-label="Next page"]')
                if (((neededPage).length > 0) && (neededPage.is('[disabled="true"]')) === false) {
                    cy.wrap(neededPage)
                        .click({ force: true })
                    findJuice(juiceName)
                } else {
                    cy.log('There is no such product')
                }
            })
        }
    })
}