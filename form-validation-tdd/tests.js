(function () {
    'use strict';
    
    // Implementation of core functionality
    function validateForm(form) {
        const result = {
            errors: []
        };

        const inputs = Array.from(form.querySelectorAll('input'));
        let isValid = true;

        for(let input of inputs) {
            if(input.dataset.validation === 'alphabetical') {
                isValid = isValid && /^[a-z]+$/i.test(input.value);
            } else if (input.dataset.validation === 'numeric') {
                isValid = isValid && /^[0-9]+$/.test(input.value);
            } else if (input.dataset.validation === 'alphanumeric') {
                isValid = isValid && /^\w+$/.test(input.value);
            } 
        }

        result.isValid = isValid;
        return result;
    }
    
    // Tests Setup
    mocha.setup('bdd');
    const { expect } = chai;
    
    describe('the form validator', function () {
        let form;
        
        beforeEach(function () {
            form = document.querySelector('.test-form').cloneNode(true);
        });
        
        describe('the validateForm function', function () {
            it('should validate a form with all of the possible validation types', function() {
                const name = form.querySelector('input[name="first-name"]');
                const age = form.querySelector('input[name="age"]');

                name.value = "Hector";
                age.value = 25;
            
                const result = validateForm(form);
                expect(result.isValid).to.be.true;
                expect(result.errors.length).to.equal(0);
            });
        });
    });
    
    mocha.run();
}());