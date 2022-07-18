import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'
import alert from '../support/components/alert'

describe('login', () => {

    context('com credenciais válidas', () => {

        const user = {
            name: 'Odin Carvalho',
            email: 'odin@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(() => {
            cy.postUser(user)
        })

        it('deve logar com sucesso', () => {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            dashPage.header.userLoggedIn(user.name)
        })
    })

    context('com senha incorreta', () => {

        before(() => {
            cy.postUser(user).then(() => {
                user.password = 'pwd123'
            })
        })

        let user = {
            name: 'Milady Carvalho',
            email: 'milady@samuraibs.com',
            password: 'abc123',
            is_provider: true
        }
        const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

        it('deve notificar falha de credenciais', () => {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            loginPage.toast.shouldHaveText(message)
        })
    })

    context.only('quando o formato do email é inválido', () => {

        const emails = [
            'koi.com.br',
            'yahoo.com',
            '@gmail.com',
            '@',
            'koi$',
            '111',
            '&*^&^&*',
            'xpto123'
        ]

        emails.forEach((email) => {
            const user = { email: email, password: 'pwd123' }

            it(`não deve logar com o email ${email}`, () => {
                loginPage.go()
                loginPage.form(user)
                loginPage.submit()

                loginPage.alertError.shouldHaveText('Informe um email válido')
            })
        })

    })
})