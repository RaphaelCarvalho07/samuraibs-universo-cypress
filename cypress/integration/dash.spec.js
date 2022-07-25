import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

import {customer, provider, appointment} from '../support/factories/dash'

describe('dashboard', () => {

    context('quando um cliente faz o agendamento no app mobile', () => {

            before(() => {
            cy.postUser(provider)
            cy.postUser(customer)

            cy.apiLogin(customer)
            cy.setProviderId(provider.email)
            cy.createAppointment(appointment.hour)
        })

        it('o mesmo deve ser exibido no dashboard', () => {

            loginPage.go()
            loginPage.form(provider)
            loginPage.submit()

            dashPage.calendarShouldBeVisible()

            const day = Cypress.env('appointmentDay')
            dashPage.selectday(day)
            dashPage.appointmentShouldBe(customer, appointment.hour)
        })
    })
})