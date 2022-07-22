

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
            }
        }

        before(() => {
            cy.postUser(data.provider)
            cy.postUser(data.customer)

            cy.apiLogin(data.customer)
            cy.log(`Consegui o token ${Cypress.env('apiToken')}`)

            cy.setProviderId(data.provider.email)
        })

        it('o mesmo deve ser exibido no dashboard', () => {
            cy.log(`O ID do Rhaegus é ${Cypress.env('providerId')}`)
            cy.createAppointment()
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

Cypress.Commands.add('createAppointment', () => {
        
    let now = new Date()

    now.setDate(now.getDate() + 1)

    const day = moment(now).format('YYYY-MM-DD 14:00:00')

    cy.log(day)
})