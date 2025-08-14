import { onDatePickerPage } from "../support/page_objects/datepickerPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { navigateTo, onNavigationPage } from "../support/page_objects/navigationPage"
import { onSmartTablePage } from "../support/page_objects/smartTable"


describe ('Test with Pago Object', ()=> {

    beforeEach('open Application', () => {
        cy.openHomePage()
    })

    it('Navigation across the pages', ()=>{
        navigateTo.formLayoutsPage()
        navigateTo.datepickerPage()
        navigateTo.smartTablePage()
        navigateTo.toasterPage()
        navigateTo.tooltipPage()
    })

    it('should submit Inline and Basic form and select tomorrow date in the calendar', () => {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Luiz Carlos Zimmer Junior', 'lczimmerj@gmail.com')
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('lczimmerj@gmail.com', '1234567890')
        navigateTo.datepickerPage()
        onDatePickerPage.selectCommonDatepickerDateFromToday(23)
        onDatePickerPage.selectDatepickerWithRangeFromToday(7, 14)
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('Luiz Carlos', 'Zimmer Junior')
        onSmartTablePage.updateAgeByFirstName('Luiz Carlos', 26)
        onSmartTablePage.deleteRowByIndex(1)
    })

    //3
    it('basic tests with the grid inside form layouts', () => {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitUsingTheGridWithEmailAndPasswordOne('lczimmerj@gmail.com', '1234567890')
    })

    //4
    it.only('basic tests with the grid inside form layouts', () => {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitUsingTheGridWithEmailAndPasswordTwo('lczimmerj@gmail.com', '1234567890')
    })

})