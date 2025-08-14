/// <reference types="cypress" />

//context() or describe()

describe('First suit', () => {
    
    it('First test', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //Locators
        //by Tag Name
        cy.get('input')

        //by ID
        cy.get('#inputEmail1')

        //by Class name
        cy.get('.input-full-width')

        //by Attribute name
        cy.get('[placeholder]')

        //by Attribute name and value
        cy.get('[placeholder="Email"]')

        //by Class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by Tag name and Attribute with value
        cy.get('input[placeholder="Email"]')

        //by two different attributes
        cy.get('[placeholder="Email"][type="email"]')

        //by Tag name, attribute with value, ID and Class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //Recommended
        cy.get('[data-cy="imputEmail1"]')
    })

    it('Second test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="signInButton"]')

        cy.contains('Sign in')

        cy.contains('[status="warning"]','Sign in')

        cy.get('#inputEmail3')
        .parents('form')
        .find('button')
        .should('contain', 'Sign in')
        .parents('form')
        .find('nb-checkbox')
        .click()

        cy.contains('nb-card','Horizontal form')
        .find('[type="email"]')

    })

    it('then and wrap methods', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

        //selenium
        // const firstForm = cy.contains('nb-card', 'Using the Grid')
        // const secondForm = cy.contains('nb-card', 'Basic form')
        // firstForm.find('[for="inputEmail1"]').should('contain', 'Email')
        // secondForm.find('[for="inputPassword2"]').should('contain', 'Password')

        //cypress
        cy.contains('nb-card', 'Using the Grid').then( firstForm => { 
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLaberlFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLabelFirst).to.equal('Email')
            expect(passwordLaberlFirst).to.equal('Password')

            cy.contains('nb-card', 'Basic form').then( secondForm => {
                // const emailLabelSecond = secondForm.find('[for="exampleInputEmail1"]').text()
                const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
                // expect(emailLabelSecond).to.equal(emailLabelFirst)
                expect(passwordLabelSecond).to.equal(passwordLaberlFirst) //jQuery format

                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password') //Cypress methods

            })

        })
        

    })

    it('invoke command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        //2
        cy.get('[for="exampleInputEmail1"]').then( label => {
            expect(label.text()).to.equal('Email address')
        })

        //3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
            expect(text).to.equal('Email address')
        })

        //4
        cy.contains('nb-card', 'Basic form')
        .find('nb-checkbox')
        .click()
        .find('.custom-checkbox')
        .invoke('attr', 'class')
        //.should('contain', 'checked') // Cypress assertion
        .then(classValue => { // Chai
            expect(classValue).to.contain('checked')
        })

    })

    it('assert property, web datepickers', () => {
        
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
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                }
            })
            return dateAssert
        }
        
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(300) // You can select how many days ahead you want to verified.
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert) //cy.wrap(input).should('have.value', dateAssert)
            
            // cy.get('nb-calendar-day-picker').contains('14').click()
            // cy.wrap(input).invoke('prop', 'value').should('contain', 'Mar 14, 2023')
        })

    })

    it('Radio buttons and checkboxes', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons =>{
            cy.wrap(radioButtons)
            .first() //eq(0) index
            .check({force: true}) //Element with property not visible in the code - needed to force the check from Cypress
            .should('be.checked') 

            cy.wrap(radioButtons)
            .eq(1)
            .check({force: true}) //Element with property not visible in the code - needed to force the check from Cypress
            .should('be.checked')

            cy.wrap(radioButtons)
            .eq(0)
            .should('not.be.checked')

            cy.wrap(radioButtons)
            .eq(2)
            .should('be.disabled')

        })

    })

    it('check boxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        cy.get('[type="checkbox"]').check({force: true}) //Check only work with checkboxes and radiobuttons; Check only activates the item. To uncheck them you need to use click().
        cy.get('[type="checkbox"]').eq(0).click({force: true})
    })

    it('list and dropdown', () => {
        cy.visit('/')

        // cy.get('nav nb-select').click()
        // cy.get('.options-list').contains('Dark').click()
        // cy.get('nav nb-select').should('contain', 'Dark')
        // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

        cy.get('nav nb-select').then( dropdown => { 
            cy.wrap(dropdown).click() //Selects the menu with the options available to change the theme.
            cy.get('.options-list nb-option').each( (listItem, index) => { //options availabe for Theme; each() -> loop to get all of the options available in the menu and save them in to an array.
                const itemText = listItem.text().trim() //No spaces saved when the function saves the names - jQuery function. trim ().
                const colors = { //All of the theme options available saved in to a variable; Json variable.
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if (index <3 ) {
                    cy.wrap(dropdown).click()
                }
            })

        })

    })

    it('Web tables', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
        
        //edit scenario
        cy.get('tbody').contains('tr', 'Larry').then( tableRow => { //Saving the row as a parameter to be able to work with the informations available on it.
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
        })

        //add scenario
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then( tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Luiz Carlos')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Zimmer Junior')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then( tableColums =>{
            cy.wrap(tableColums).eq(2).should('contain', 'Luiz Carlos')
            cy.wrap(tableColums).eq(3).should('contain', 'Zimmer Junior')
        })

        //search scenario
        const age = [20, 30, 40, 200]

        cy.wrap(age).each( age => {

            //cy.get('thead [placeholder="Age"]').type('20')
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500) //Waiting the website to update the results with the value above.
            cy.get('tbody tr').each( tableRow => {
                if(age == 200){
                    cy.wrap(tableRow).should('contain', 'No data found')
                } else {
                    //cy.wrap(tableRow).find('td').eq(6).should('contain', 20)
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
                
            })

        })

    })

    it('Tooltips and PopUps', () =>{
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('nb-card', 'Colored Tooltips').contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    })

    it('Dialog boxes', () =>{
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //1
        // cy.get('tbody tr').eq(0).find('.nb-trash').click()
        // cy.on('window:confirm', (confirm) => {
        //     expect(confirm).to.equal('Are you sure you want to delete?') //This way, if the window is never called, the assertion is never made - not 
        // })

        //2 Best way to validate.
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').eq(0).find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })

        //3 How to select Cancel - "Cypress" confirms the dialog by dedault.
        cy.get('tbody tr').eq(0).find('.nb-trash').click()
        cy.on('window:confirm', ()=> false)

    })

})