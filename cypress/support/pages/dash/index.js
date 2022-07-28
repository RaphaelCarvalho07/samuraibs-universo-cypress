
import { el } from './elements'
import header from '../../components/header'

class DashPage {

    constructor() {
        this.header = header
    }

    calendarShouldBeVisible() {
        // cy.get(el.calendar, { timeout: 7000 })
        cy.get(el.calendar)
            .should('be.visible')
    }

    selectday(appointmentDate) {

        let today = new Date()
        let lastDayofMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

        if (today.getDate() === lastDayofMonth.getDate()) {
            cy.log('Hoje é o último dia do mês')

            cy.get(el.nextMonthButton)
                .should('be.visible')
                .click()

            // Isso aqui é um checkpoint para garantir que houve troca de calendário // Não funciona
            let monthName
            switch (appointmentDate.getMonth()) {
                case 0:
                    monthName = 'Janeiro'
                    break;
                case 1:
                    monthName = 'Fevereiro'
                    break;
                case 2:
                    monthName = 'Março'
                    break;
                case 3:
                    monthName = 'Abril'
                    break;
                case 4:
                    monthName = 'Maio'
                    break;
                case 5:
                    monthName = 'Junho'
                    break
                case 6:
                    monthName = 'Julho'
                    break;
                case 7:
                    monthName = 'Agosto'
                    break;
                case 8:
                    monthName = 'Setembro'
                    break;
                case 9:
                    monthName = 'Outubro'
                    break;
                case 10:
                    monthName = 'Novembro'
                    break;
                case 11:
                    monthName = 'Dezembro'
                    break;

                default:
                    break;
            }


            cy.contains(el.monthYearName, monthName)
                .should('be.visible')
        }
        else {
            cy.log('Hoje não é o último dia do mês')
        }

        cy.log(today.toDateString())
        cy.log(lastDayofMonth.toDateString())

        const target = new RegExp(`^${appointmentDate.getDate()}$`, 'g')
        // const target = new RegExp('^' + day + '$', 'g')
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