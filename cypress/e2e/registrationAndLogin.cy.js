///<reference types = "cypress"/>
import LoginPage from "../support/pages/LoginPage"
import HomePage from "../support/pages/HomePage"
import RegistrationPage from "../support/pages/RegistrationPage"
import { headlessLogin } from "../support/headlessLogin"
import { faker } from "@faker-js/faker"
import { headlessSignup } from "../support/headlessSignup"
import * as user from '../fixtures/user.json'

user.randomEmail = faker.internet.email()
user.randomPassword = faker.internet.password(6)
user.answer = faker.commerce.department()

it(('Successful registration'), () => {

  //Open User Registration page
  RegistrationPage.visit()
  RegistrationPage.getWelcomeDismissButton().click()

  //Create new account
  RegistrationPage.createNewAccount(user)

  //Check that account is created
  LoginPage.assertAccountCreatedPopupText()
})

it(('Registration with already registered email address'), () => {

  user.email = faker.internet.email()
  headlessSignup(user)

  //Open User Registration page
  RegistrationPage.visit()
  RegistrationPage.getWelcomeDismissButton().click()

  //Create new account with already registered email
  RegistrationPage.createNewAccountWithUsedEmail(user)

  //Check that user stays on User Registration page
  RegistrationPage.assertUserRegistrationPageOpened()
})

it(('Registration entering not matching passwords'), () => {

  //Open User Registration page
  RegistrationPage.visit()
  RegistrationPage.getWelcomeDismissButton().click()

  //Create new account with already registered email
  RegistrationPage.createNewAccountWithNotMatchingPassw(user)

  //Check that user stays on User Registration page
  RegistrationPage.assertUserRegistrationPageOpened()
})

it(('Login with valid user'), () => {

  //Sign up
  user.email = faker.internet.email()
  headlessSignup(user)

  //Open Login page 
  LoginPage.visit()
  LoginPage.getWelcomeDismissButton().click()

  //Submit Login form with registered user
  LoginPage.submitLoginFormValidUser(user)
  HomePage.assertUserLoggedIn()
})

it(('Login with unregistered user'), () => {

  //Open Login page 
  LoginPage.visit()
  LoginPage.getWelcomeDismissButton().click()

  //Submit Login form with unregistered user
  LoginPage.submitLoginFormUnregisteredUser(user)
})

it(('Login with registered user using invalid email'), () => {

  //Sign up
  user.email = faker.internet.email()
  headlessSignup(user)

  //Open Login page 
  LoginPage.visit()
  LoginPage.getWelcomeDismissButton().click()

  //Submit Login form with invalid email
  LoginPage.submitLoginFormInvalidEmail(user)
})

it(('Login with registered user using invalid password'), () => {

  //Sign up
  user.email = faker.internet.email()
  headlessSignup(user)

  //Open Login page 
  LoginPage.visit()
  LoginPage.getWelcomeDismissButton().click()

  //Submit Login form with invalid password
  LoginPage.submitLoginFormInvalidPassword(user)
})

it(('Headless login'), () => {

  //Sign up 
  user.email = faker.internet.email()
  headlessSignup(user)

  //Login via API
  headlessLogin(user)

  //Open homepage and check that user is logged in
  HomePage.visit()
  HomePage.assertUserLoggedIn()
})


