
import { el } from './elements'
import header from '../../components/header'

class DashPage {

    constructor() {
        this.header = header
    }

    calendarShouldBeVisible() {
        cy.get(el.calendar, { timeout: 7000 })
            .should('be.visible')
    }

    selectday(day) {

        let today = new Date()
        let lastDayofMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

        if (today.getDate() === lastDayofMonth.getDate()) {
            cy.log('Hoje é o último dia do mês')

            cy.get(el.nextMonthButton)
                .should('be.visible')
                .click()
            
            // Isso aqui é um checkpoint para garantir que houve troca de calendário // Não funciona
            cy.contains(el.monthYearName, 'Abril')
                .should('be.visible')
        }
        else {
            cy.log('Hoje não é o último dia do mês')
        }
        
        cy.log(today.toDateString())
        cy.log(lastDayofMonth.toDateString())


        const target = new RegExp('^' + day + '$', 'g')
        cy.contains(el.boxDay, target)
            .click()
    }

    appointmentShouldBe(customer, hour) {
        cy.contains('div', customer.name)
            .should('be.visible')
            .parent()
            .contains(el.boxHour, hour)
            .should('be.visible')
    }
}

export default new DashPage()