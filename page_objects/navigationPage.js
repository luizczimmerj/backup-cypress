
function selectGroupName(groupName){
    cy.contains('a', groupName).then( menu => {
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then( attr => {
            if(attr.includes('left')){
                cy.wrap(menu).click()
            }
        })
    })
}

export class NavigationPage{
    formLayoutsPage(){
        selectGroupName('Form')
        cy.contains('Form Layouts').click()
    }

    datepickerPage(){
        selectGroupName('Form')
        cy.contains('Datepicker').click()
    }

    toasterPage(){
        selectGroupName('Modal & Overlays')
        cy.contains('Toastr').click()
    }

    smartTablePage(){
        selectGroupName('Tables & Data')
        cy.contains('Smart Table').click()
    }

    tooltipPage(){
        selectGroupName('Modal & Overlays')
        cy.contains('Tooltip').click()
    }

}

export const navigateTo = new NavigationPage()