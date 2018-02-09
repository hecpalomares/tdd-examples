(function () {
    'use strict';
    
    // Implementation of core functionality
    function validateForm(form) {
        const result = {
            get isValid() {
                return this.errors.length === 0;    // Setting getter to return if a form isValid if there errors array is equal to 0.
            },
            errors: []
        };

        const inputs = Array.from(form.querySelectorAll('input'));

        for(let input of inputs) {
            if(input.dataset.validation === 'alphabetical') {
                let isValid = /^[a-z]+$/i.test(input.value);

                if (!isValid) {
                    result.errors.push(new Error(`${input.value} is not a valid ${input.name} value`)); // If data input is not valid, push a new Error into the array
                }

            } else if (input.dataset.validation === 'numeric') {
                let isValid = /^[0-9]+$/.test(input.value);

                if (!isValid) {
                    result.errors.push(new Error(`${input.value} is not a valid ${input.name} value`)); // If data input is not valid, push a new Error into the array
                }

            } else if (input.dataset.validation === 'alphanumeric') {
                let isValid = /^\w+$/.test(input.value);

                if (!isValid) {
                    result.errors.push(new Error(`${input.value} is not a valid ${input.name} value`)); // If data input is not valid, push a new Error into the array
                }
            } 
        }

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
                const id = form.querySelector('input[name="id"]');

                name.value = "Hector";
                age.value = 25;
                id.value = 'RZT0123UI';
            
                const result = validateForm(form);
                expect(result.isValid).to.be.true;
                expect(result.errors.length).to.equal(0);
            });

            it('should return an error when a name is invalid', function () {
                const name = form.querySelector('input[name="first-name"]');
                const age = form.querySelector('input[name="age"]');
                const id = form.querySelector('input[name="id"]');

                name.value = "!!!";
                age.value = 25;
                id.value = 'RZT0123UI';

                const result = validateForm(form);

                expect(result.isValid).to.be.false;
                expect(result.errors[0]).to.be.instanceof(Error);
                expect(result.errors[0].message).to.be.equal('!!! is not a valid first-name value');
            });

            it('should return an error when a age is invalid', function () {
                const name = form.querySelector('input[name="first-name"]');
                const age = form.querySelector('input[name="age"]');
                const id = form.querySelector('input[name="id"]');

                name.value = "Hector";
                age.value = 'WhatsMyAgeAgain?';
                id.value = 'RZT0123UI';

                const result = validateForm(form);

                expect(result.isValid).to.be.false;
                expect(result.errors[0]).to.be.instanceof(Error);
                expect(result.errors[0].message).to.be.equal('WhatsMyAgeAgain? is not a valid age value');
            });

            it('should return an error when a id is invalid', function () {
                const name = form.querySelector('input[name="first-name"]');
                const age = form.querySelector('input[name="age"]');
                const id = form.querySelector('input[name="id"]');

                name.value = "Hector";
                age.value = 25;
                id.value = '%%RZT0!!!123UI$$$';

                const result = validateForm(form);

                expect(result.isValid).to.be.false;
                expect(result.errors[0]).to.be.instanceof(Error);
                expect(result.errors[0].message).to.be.equal('%%RZT0!!!123UI$$$ is not a valid id value');
            });

            it('should return multiple errors if more than one field is invalud', function () {
                const name = form.querySelector('input[name="first-name"]');
                const age = form.querySelector('input[name="age"]');
                const id = form.querySelector('input[name="id"]');

                name.value = 12;
                age.value = "N/A";
                id.value = '??%%$$';

                const result = validateForm(form);

                expect(result.isValid).to.be.false;

                expect(result.errors[0]).to.be.instanceof(Error);
                expect(result.errors[0].message).to.be.equal('12 is not a valid first-name value');

                expect(result.errors[1]).to.be.instanceof(Error);
                expect(result.errors[1].message).to.be.equal('N/A is not a valid age value');

                expect(result.errors[2]).to.be.instanceof(Error);
                expect(result.errors[2].message).to.be.equal('??%%$$ is not a valid id value');
            });


        });
    });
    
    mocha.run();
}());