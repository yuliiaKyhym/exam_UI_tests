///<reference types = "cypress"/>
import HomePage from "../support/pages/HomePage"
import BasketPage from "../support/pages/BasketPage"
import SelectAddressPage from "../support/pages/SelectAddressPage"
import DeliveryMethodPage from "../support/pages/DeliveryMethodPage"
import PaymentPage from "../support/pages/PaymentPage"
import OrderSummaryPage from "../support/pages/OrderSummaryPage"
import OrderCompletionPage from "../support/pages/OrderCompletionPage"
import CreateAddressPage from "../support/pages/CreateAddressPage"
import { headlessLogin } from "../support/headlessLogin"
import { headlessSignup } from "../support/headlessSignup"
import { findJuice } from "../support/helperSearch"
import { faker } from "@faker-js/faker"

import * as user from '../fixtures/user.json'
import * as address from '../fixtures/address.json'
import * as paymentInfo from '../fixtures/paymentInfo.json'

user.email = faker.internet.email()
user.password = faker.random.numeric(6)

let juiceName = ' Orange Juice (1000ml) '

before(() => {
    //Create new user and login
    headlessSignup(user)
    headlessLogin(user)
})

it(('Search specific juice and buy'), () => {

    //Open Homepage
    HomePage.visit()
    HomePage.getWelcomeDismissButton().click()

    //Search 'e' between juices
    HomePage.getSearchButton().type('e{enter}')
    HomePage.assertSearchResultTitleText()
    
    //Find specific juice in search results
    findJuice(juiceName)
    HomePage.getCloseDialogButton().click({force: true})

    //Add needed juice to the basket
    HomePage.addFoundJuiceToTheBasket(juiceName)

    //Proceed to checkout
    BasketPage.getCheckoutButton().click()

    //Select address
    SelectAddressPage.assertSelectAddressPageOpened()
    SelectAddressPage.getAddNewAddressButton().click()

    //Create new address
    CreateAddressPage.submitNewAddressForm(user, address)
    SelectAddressPage.getExistedAddressRadioBtn().click()
    SelectAddressPage.getContinueButton().click()

    //Choose delivery method
    DeliveryMethodPage.assertDeliveryMethodPageOpened()
    DeliveryMethodPage.getDeliverySpeedRadioBtn().click()
    DeliveryMethodPage.getContinueButton().click()

    //Choose new credit card
    PaymentPage.addNewCard(user, paymentInfo)
    PaymentPage.getSelectCardRadioButton().click()
    PaymentPage.getContinueButton().click()

    //Check order summary
    OrderSummaryPage.assertOrderSummaryPageOpened()
    OrderSummaryPage.getPlaceAndPayButton().click()

    //Check order is successfully completed
    OrderCompletionPage.assertOrderCompletionPageOpened()
})
