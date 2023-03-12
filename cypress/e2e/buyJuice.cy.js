///<reference types = "cypress"/>
import HomePage from "../support/pages/HomePage"
import BasketPage from "../support/pages/BasketPage"
import SelectAddressPage from "../support/pages/SelectAddressPage"
import CreateAddressPage from "../support/pages/CreateAddressPage"
import DeliveryMethodPage from "../support/pages/DeliveryMethodPage"
import PaymentPage from "../support/pages/PaymentPage"
import OrderSummaryPage from "../support/pages/OrderSummaryPage"
import OrderCompletionPage from "../support/pages/OrderCompletionPage"
import { headlessLogin } from "../support/headlessLogin"
import { headlessSignup } from "../support/headlessSignup"
import { faker } from "@faker-js/faker"

import * as user from '../fixtures/user.json'
import * as address from '../fixtures/address.json'
import * as paymentInfo from '../fixtures/paymentInfo.json'

user.email = faker.internet.email()
user.password = faker.random.numeric(6)

address.country = faker.address.country()
address.mobileNumber = faker.phone.number('1#######')
address.zipCode = faker.address.zipCode('####')
address.address = faker.address.street()
address.city = faker.address.city()
address.state = faker.address.state()

paymentInfo.cardNumber = faker.finance.creditCardNumber('#### #### #### ####')
paymentInfo.cardExpMonth = faker.datatype.number({ min: 1, max: 12 }).toString()
paymentInfo.cardExpYear = faker.datatype.number({ min: 2080, max: 2099 }).toString()

let juiceName = ' Apple Juice (1000ml) '

before(() => {
    //Create new user and login
    headlessSignup(user)
    headlessLogin(user)
})

it(('Buy juice'), () => {

    //Open Homepage
    HomePage.visit()
    HomePage.getWelcomeDismissButton().click()

    //Apply language changes
    HomePage.assertLanguagePopupText()
    HomePage.getForcePageReloadBtn().click()

    //Add juice to the basket
    HomePage.addJuiceToTheBasket(juiceName)

    //Proceed to checkout
    BasketPage.proceedToCheckout(user, juiceName)

    //Add new address
    SelectAddressPage.assertSelectAddressPageOpened()
    SelectAddressPage.getAddNewAddressButton().click()
    CreateAddressPage.submitNewAddressForm(user, address)

    //Select created address
    SelectAddressPage.getExistedAddressRadioBtn().click()
    SelectAddressPage.getContinueButton().click()

    //Choose delivery method
    DeliveryMethodPage.assertDeliveryMethodPageOpened()
    DeliveryMethodPage.getDeliverySpeedRadioBtn().click()
    DeliveryMethodPage.getContinueButton().click()

    //Add new credit card
    PaymentPage.addNewCard(user, paymentInfo)
    PaymentPage.getSelectCardRadioButton().click()
    PaymentPage.getContinueButton().click()

    //Check order summary
    OrderSummaryPage.assertOrderSummaryPageOpened()
    OrderSummaryPage.getPlaceAndPayButton().click()

    //Check order is successfully completed
    OrderCompletionPage.assertOrderCompletionPageOpened()
})
