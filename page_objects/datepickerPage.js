
function selectDayFromCurrent(day){ //Recieves the parameter when the function is called. (ex.: 300, line 165 - from today)
    let date = new Date()
    date.setDate(date.getDate() + day) //Today + 2 day ahead
    let futureDay = date.getDate()
    //let futureMonth = date.getMonth() // Return the number related to that month (ex.: JANUARY = 1, etc)
    let futureMonth = date.toLocaleString('en-US', {month: 'short'}) //Follows the date language from the current machine; Return the abrevitation to that month (ex.: JANUARY = Jan);
    let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()
    cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
        if( !dateAttribute.includes(futureMonth)){
            cy.get('[data-name="chevron-right"]').click()
            //cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
            selectDayFromCurrent(day) //While loop in JavScript - function calling yourself until meets the condition above.
        } else {
            cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
        }
    })
    return dateAssert
}

export class DatepickerPage {

    selectCommonDatepickerDateFromToday(dayFromToday) {
        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(dayFromToday) // You can select how many days ahead you want to verified.
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert) //cy.wrap(input).should('have.value', dateAssert)
            
            // cy.get('nb-calendar-day-picker').contains('14').click()
            // cy.wrap(input).invoke('prop', 'value').should('contain', 'Mar 14, 2023')
        })
    }

    selectDatepickerWithRangeFromToday(firstDay, secondDay){
        cy.contains('nb-card', 'Datepicker With Range').find('input').then(input => {
            cy.wrap(input).click()
            let dateAssertFirst = selectDayFromCurrent(firstDay) // You can select how many days ahead you want to verified.
            let dateAssertSecond = selectDayFromCurrent(secondDay)
            const finalDate = dateAssertFirst+' - '+dateAssertSecond
            
            cy.wrap(input).invoke('prop', 'value').should('contain', finalDate) //cy.wrap(input).should('have.value', dateAssert)
            
            // cy.get('nb-calendar-day-picker').contains('14').click()
            // cy.wrap(input).invoke('prop', 'value').should('contain', 'Mar 14, 2023')
        })
    }

}

export const onDatePickerPage = new DatepickerPage()
