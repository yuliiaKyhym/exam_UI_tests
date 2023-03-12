///<reference types = "cypress"/>

import CustomerFeedbackPage from "../support/pages/CustomerFeedbackPage"
import { headlessLogin } from "../support/headlessLogin"
import { headlessSignup } from "../support/headlessSignup"
import { faker } from "@faker-js/faker"
import * as user from '../fixtures/user.json'

user.email = faker.internet.email()
user.password = faker.random.numeric(6)

before(() => {
    //Create new user and login
    headlessSignup(user)
    headlessLogin(user)
})

it(('Send feedback'), () => {

    //Open Customer Feedback page
    CustomerFeedbackPage.visit()

    //Apply language changes
    CustomerFeedbackPage.getWelcomeDismissButton().click()
    CustomerFeedbackPage.assertLanguagePopupText()
    CustomerFeedbackPage.getForcePageReloadBtn().click()

    //Send feedback
    CustomerFeedbackPage.submitFeedbackForm()

})
