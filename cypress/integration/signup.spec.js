import signupPage from '../support/pages/signup'


describe('cadastro', () => {

    context('quando é um novo usuário', () => {

        const user = {
            name: 'Raphael Carvalho',
            email: 'koi@samuraibs.com',
            password: 'pwd123'
        }

        // Técnica usada em aplicações mais modernas, usando Intercept
        // cy.intercept('POST', '/users', {
        //     statusCode: 200
        // }).as('postUser')


        // cy.wait('@postUser')

        before(() => {
            cy.task('removeUser', user.email)
                .then((result) => {
                    console.log(result)
                })
        })

        it('deve cadastrar com sucesso', () => {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })

    })

    context('quando o email já existe', () => {

        const user = {
            name: 'Bina Carvalho',
            email: 'bina@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(() => {
            cy.postUser(user)
        })

        it('não deve cadastrar o usuário', () => {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
        })
    })

    context('quando o email é inválido', () => {

        const user = {
            name: 'Raphilske Carvalho',
            email: 'raphilske.gmail.com',
            password: 'pwd123'
        }

        it('deve exibir mensagem de alerta', () => {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alertHaveText('Informe um email válido')
        })
    })

    context('quando a senha é muito curta', () => {

        const passwords = ['1', '2a', 'ab3', 'abc4', 'abc#5']

        beforeEach(() => {
            signupPage.go()
        })

        passwords.forEach((p) => {
            const user = { name: 'Jason Friday', email: 'jason@gmail.com', password: p }

            it(`não deve cadastrar com a senha: ${p}`, () => {
                signupPage.form(user)
                signupPage.submit()
            })
        })

        afterEach(() => {
            signupPage.alertHaveText('Pelo menos 6 caracteres')
        })
    })

    context('quando não preencho nenhum dos campos', () => {

        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(() => {
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach((alert) => {
            it(`deve exibir ${alert.toLowerCase()}`, () => {
                signupPage.alertHaveText(alert)
            })
        })
    })
})

