

describe('dashboard', () => {

    context('quando um cliente faz o agendamento no app mobile', () => {

        const data = {
            customer: {
                name: 'Koi Targaryen',
                email: 'koi@targaryen.com',
                password: 'pwd123',
                is_provider: false
            },
            samurai: {
                name: 'Rhaegus Targaryen',
                email: 'rhaegus@samuraibs.com',
                password: 'pwd123',
                is_provider: true
            }
        }

        before(() => {
            cy.postUser(data.customer)
            cy.postUser(data.samurai)

            cy.apiLogin(data.customer)
            cy.log(`Consegui o token ${Cypress.env('apiToken')}`)
        })

        it('o mesmo deve ser exibido no dashboard', () => {
            console.log(data)
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