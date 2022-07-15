
import { el } from './elements'

class Header {

    userLoggedIn(userName) {
        cy.get(el.userName, { timeout: 7000 })
            .should('be.visible')
            .should('have.text', userName)
    }
}

export default new Header()