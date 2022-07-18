import {el} from './elements'

class Alert {
    shouldHaveText(expectText) {
        cy.contains(el.alertError, expectText)
            .should('be.visible')
    }
}

export default new Alert()