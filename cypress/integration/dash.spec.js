import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('dashboard', () => {

    context('quando um cliente faz o agendamento no app mobile', () => {

        const data = {
            customer: {
                name: 'Koi Targaryen',
                email: 'koi@targaryen.com',
                password: 'pwd123',
                is_provider: false
            },
            provider: {
                name: 'Rhaegus Targaryen',
                email: 'rhaegus@samuraibs.com',
                password: 'pwd123',
                is_provider: true
            },
            appointmentHour: '14:00'
        }

        before(() => {
            cy.postUser(data.provider)
            cy.postUser(data.customer)

            cy.apiLogin(data.customer)
            cy.setProviderId(data.provider.email)
            cy.createAppointment(data.appointmentHour)
        })

        it('o mesmo deve ser exibido no dashboard', () => {

            loginPage.go()
            loginPage.form(data.provider)
            loginPage.submit()

            dashPage.calendarShouldBeVisible()

            const day = Cypress.env('appointmentDay')
            dashPage.selectday(day)
            dashPage.appointmentShouldBe(data.customer, data.appointmentHour)
        })
    })
})

Cypress.Commands.add('apiLogin', (user) => {

    const payload = {
        email: user.email,
        password: user.password
    }

    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/sessions',
        body: payload
    }).then((response) => {
        expect(response.status).to.eq(200)
        Cypress.env('apiToken', response.body.token)
    })
})

Cypress.Commands.add('setProviderId', (providerEmail) => {
    cy.request({
        method: 'GET',
        url: 'http://localhost:3333/providers',
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

import moment from 'moment'

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
        url: 'http://localhost:3333/appointments',
        body: payload,
        headers: {
            authorization: `Bearer ${Cypress.env('apiToken')}`
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
})