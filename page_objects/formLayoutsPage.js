
function selectOptionOne() {
    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( optionOne => {
        cy.wrap(optionOne).eq(0).check({force: true})
    })
}

function selectOptionTwo() {
    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( optionTwo => {
        cy.wrap(optionTwo).eq(1).check({force: true})
    })
}

export class FormLayoutsPage {

    submitInlineFormWithNameAndEmail(name, email) {
        cy.contains('nb-card', 'Inline form').find('form').then( form => {
            cy.wrap(form).find('[placeholder="Jane Doe"]').type(name)
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[type="checkbox"]').check({force: true})
            //cy.wrap(form).find('[type="submit"]').click()
            //HTML TAG "FORM" -> Cypress has a function for it: submit()
            cy.wrap(form).submit()
        })
    }

    submitUsingTheGridWithEmailAndPasswordOne(email, password) {
       cy.contains('nb-card', 'Using the Grid').find('form').then( form => {
        cy.wrap(form).find('[placeholder="Email"]').type(email)
        cy.wrap(form).find('[placeholder="Password"]').type(password)
        selectOptionOne()
        cy.wrap(form).submit()
       })
    }

    submitUsingTheGridWithEmailAndPasswordTwo(email, password) {
        cy.contains('nb-card', 'Using the Grid').find('form').then( form => {
         cy.wrap(form).find('[placeholder="Email"]').type(email)
         cy.wrap(form).find('[placeholder="Password"]').type(password)
         selectOptionTwo()
         cy.wrap(form).submit()
        })
     }

    submitBasicFormWithEmailAndPassword(email, password) {
        cy.contains('nb-card', 'Basic form').find('form').then( form => {
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[placeholder="Password"]').type(password)
            cy.wrap(form).find('[type="checkbox"]').check({force: true})
            //cy.wrap(form).find('[type="submit"]').click()
            //HTML TAG "FORM" -> Cypress has a function for it: submit()
            cy.wrap(form).submit()
        })
    }



}

export const onFormLayoutsPage = new FormLayoutsPage()