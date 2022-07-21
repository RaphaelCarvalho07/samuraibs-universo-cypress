

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
            cy.postUser(data.customer),
            cy.postUser(data.samurai)
        })

        it('o mesmo deve ser exibido no dashboard', () => {
            console.log(data)
        })
    })
})