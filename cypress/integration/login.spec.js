import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('login', () => {

    context('quando usa credenciais válidas', () => {

        const user = {
            name: 'Odin Carvalho',
            email: 'odin@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(() => {
            cy.task('removeUser', user.email)
                .then((result) => {
                    console.log(result)
                })
            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('deve logar com sucesso', () => {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            dashPage.header.userLoggedIn(user.name)
        })
    })
})