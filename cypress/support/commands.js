// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import moment from 'moment'

import { apiServer } from '../../cypress.json'

import loginPage from './pages/login'
import dashPage from './pages/dash'


// App Actions
Cypress.Commands.add('uiLogin', (user) => {
    loginPage.go()
    loginPage.form(user)
    loginPage.submit()
    dashPage.header.userLoggedIn(user.name)
})

Cypress.Commands.add('postUser', (user) => {
    cy.task('removeUser', user.email)
        .then((result) => {
            console.log(result)
        })

    cy.request({
        method: 'POST',
        url: `${apiServer}/users`,
        body: user
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
})

Cypress.Commands.add('recoveryPass', (email) => {

    cy.request({
        method: 'POST',
        url: `${apiServer}/password/forgot`,
        body: { email: email }
    }).then((response) => {
        expect(response.status).to.eql(204)

        cy.task('findToken', email)
            .then(function (result) {
                Cypress.env('recoveryToken', result.token)
            })
    })
})

Cypress.Commands.add('apiLogin', (user, setLocalStorage = false) => {

    const payload = {
        email: user.email,
        password: user.password
    }

    cy.request({
        method: 'POST',
        url: `${apiServer}/sessions`,
        body: payload
    }).then((response) => {
        expect(response.status).to.eq(200)
        Cypress.env('apiToken', response.body.token)

        if (setLocalStorage) {
            const { token, user } = response.body

            window.localStorage.setItem('@Samurai:token', token)
            window.localStorage.setItem('@Samurai:user', JSON.stringify(user))
        }      

    })
    
    if(setLocalStorage) cy.visit('/dashboard')
})

Cypress.Commands.add('setProviderId', (providerEmail) => {
    cy.request({
        method: 'GET',
        url: `${apiServer}/providers`,
        headers: {
            authorization: `Bearer ${Cypress.env('apiToken')}`
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
        // const providerList = response.body[0]
        // Cypress.env('providerId', response.body[0].id)

        const providerList = response.body

        providerList.forEach((provider) => {
            if (provider.email === providerEmail) {
                // cy.log(provider.id)
                // cy.log(provider.email)
                // cy.log(providerEmail)
                Cypress.env('providerId', provider.id)
            }
        })
    })
})

Cypress.Commands.add('createAppointment', (hour) => {

    let now = new Date()

    now.setDate(now.getDate() + 1)

    Cypress.env('appointmentDay', now.getDate())

    const date = moment(now).format(`YYYY-MM-DD ${hour}:00`)

    const payload = {
        provider_id: Cypress.env('providerId'),
        date: date
    }

    cy.request({
        method: 'POST',
        url: `${apiServer}/appointments`,
        body: payload,
        headers: {
            authorization: `Bearer ${Cypress.env('apiToken')}`
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
})