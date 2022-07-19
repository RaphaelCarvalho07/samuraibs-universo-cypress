import signupPage from '../support/pages/signup'


describe('cadastro', () => {

    before(function () {
        cy.fixture('signup').then(function (signup) {
            this.sucess = signup.sucess
            this.email_dup = signup.email_dup
            this.email_inv = signup.email_inv
            this.short_password = signup.short_password
        })
    })

    context('quando é um novo usuário', () => {
        // Técnica usada em aplicações mais modernas, usando Intercept
        // cy.intercept('POST', '/users', {
        //     statusCode: 200
        // }).as('postUser')
        // cy.wait('@postUser')

        before(function () {
            cy.task('removeUser', this.sucess.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('deve cadastrar com sucesso', function () {
            signupPage.go()
            signupPage.form(this.sucess)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })

    })

    context('quando o email já existe', () => {
        before(function () {
            cy.postUser(this.email_dup)
        })

        it('não deve cadastrar o usuário', function () {
            signupPage.go()
            signupPage.form(this.email_dup)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
        })
    })

    context('quando o email é inválido', () => {

        it('deve exibir mensagem de alerta', function () {
            signupPage.go()
            signupPage.form(this.email_inv)
            signupPage.submit()
            signupPage.alert.haveText('Informe um email válido')
        })
    })

    // context.only('quando a senha é muito curta', () => {

    //     const passwords = ['1', '2a', 'ab3', 'abc4', 'abc#5']

    //     beforeEach(function () {
    //         signupPage.go()
    //     })

    //     passwords.forEach(function (p) {
    //         this.short_password.password = p

    //         it(`não deve cadastrar com a senha: ${p}`, function () {
    //             signupPage.form(this.short_password)
    //             signupPage.submit()
    //         })
    //     })

    //     afterEach(() => {
    //         signupPage.alert.haveText('Pelo menos 6 caracteres')
    //     })
    // })

    context.only('quando a senha é muito curta', () => {
        const passwords = ['1', '2a', 'ab3', 'abc4', 'abc#5']

        before(function () {
            signupPage.go()
        })

        passwords.forEach(function (p) {
            it(`não deve cadastrar com senha: ${p}`, function () {
                this.short_password.password = p

                signupPage.form(this.short_password)
                signupPage.submit()
            })
        })

        afterEach(() => {
            signupPage.alert.haveText('Pelo menos 6 caracteres')
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
                signupPage.alert.haveText(alert)
            })
        })
    })
})

