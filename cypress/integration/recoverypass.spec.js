import fpPage from '../support/pages/forgotpass'


describe('resgaste de senha', () => {

    before(function () {
        cy.fixture('recovery').then(function (recovery) {
            this.data = recovery
        })
    })

    context('quando o usuário esquece a senha', function () {

        before(function () {
            cy.postUser(this.data)
        })

        it('deve conseguir resgatar por email', function () {
            fpPage.go()
            fpPage.form(this.data.email)
            fpPage.submit()

            const message = 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.'

            fpPage.toast.shouldHaveText(message)
        })
    })

    context.only('quando o usuário solicita recuperação de senha', function () {

        before(function () {
            cy.postUser(this.data)
            cy.recoveryPass(this.data.email)
        })

        it('deve conseguir cadastrar uma nova senha', function () {
            
            console.log(Cypress.env('recoveryToken'))
        })
    })
})