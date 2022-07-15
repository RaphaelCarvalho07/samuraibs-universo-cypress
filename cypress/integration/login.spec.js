import loginPage from '../support/pages/login'


describe('login', () => {

    context('quando usa credenciais válidas', () => {

        const user = {
            email: 'odin@samuraibs.com',
            password: 'pwd123'
        }

        it('deve logar com sucesso', () => {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
        })
    })
})