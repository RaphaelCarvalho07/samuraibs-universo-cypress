
import { el } from './elements'
import toast from '../../components/toast'
import alert from '../../components/alert'

class SignupPage {

    constructor() {
        this.toast = toast
        this.alert = alert
    }

    go() {
        cy.visit('/signup')
    }

    form(user) {
        cy.get(el.name)
            .clear()
            .type(user.name)
        cy.get(el.email)
            .clear()
            .type(user.email)
        cy.get(el.password)
            .clear()
            .type(user.password)
    }

    submit() {
        cy.contains(el.signupButton).click()
    }
}

export default new SignupPage()