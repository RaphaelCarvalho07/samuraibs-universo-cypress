
import { el } from './elements'

class Toast {
    shouldHaveText(expectText) {
        // cy.get(el.toast, { timeout: 7000 })
        cy.get(el.toast)
            .should('be.visible')
            // .should('have.css', 'opacity', '1', { timeout: 1500 })
            .should('have.css', 'opacity', '1')
            .find('p')
            .should('have.text', expectText)
    }
}

export default new Toast()