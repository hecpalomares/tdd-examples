(function () {
    'use strict';
    
    const validationRules = new Map([
                ['alphabetical', /^[a-z]+$/i],
                ['numeric', /^[0-9]+$/i],
                ['alphanumeric', /^[\w]+$/i]
            ]);

    // Implementation of core functionality
    function createValidationQueries (inputs) {
        console.log(inputs);
        return Array.from(inputs).map(input => ({
            name: input.name,
            type: input.dataset.validation,
            value: input.value
        }));
    }

    function validateItem(validation, validationRules) {
        if(!validationRules.has(validation.type)) {
            return false;
        }

        return validationRules.get(validation.type).test(validation.value);
    }

    function validateForm(form) {
        const result = {
            get isValid() {
                return this.errors.length === 0;
            },
            errors: []
        };

       

        let validations = createValidationQueries(form.querySelectorAll('input'));

        for (let validation of createValidationQueries(form.querySelectorAll('input'))) {
            
             let isValid = validateItem(validation, validationRules);

            if (!isValid) {
                result.errors.push(new Error(`${validation.value} is not a valid ${validation.name} value`));
            }
            
        }
        
        return result;
    }
    
    // Tests Setup
    mocha.setup('bdd');
    const { expect } = chai;
    
    describe('Validation our Forms', function () {
        let form;
        
        beforeEach(function () {
            form = document.querySelector('.test-form').cloneNode(true);
        });

        describe('the validateItem function', function() {
            it('should return true when the passed item is deemed valid against the supplied validation rules', function() {
                const validation = {
                    type: 'alphabetical',
                    value: 'Hector'
                };

                const isValid = validateItem(validation, validationRules);
                expect(isValid).to.be.true;
            });

             it('should return false when the passed item is deemed invalid', function() {
                const validation = {
                    type: 'alphabetical',
                    value: '25'
                };

                const isValid = validateItem(validation, validationRules);
                expect(isValid).to.be.false;
            });

              it('should return false when the validation type is not found', function() {
                const validation = {
                    type: 'email',
                    value: 'Hector'
                };

                const isValid = validateItem(validation, validationRules);
                expect(isValid).to.be.false;
            });

        });

        describe('the createValidationQueries function', function() {
            it('should map input elements with a data-validation attribute to an array of validation objects', function() {
                const name = form.querySelector('input[name="first-name"]');
                const age = form.querySelector('input[name="age"]');
                const id = form.querySelector('input[name="id"]');

                name.value = "Hector";
                age.value = 25;
                id.value = 'RZT0123UI';

                const validations = createValidationQueries([name, age, id]);

                expect(validations.length).to.equal(3);

                expect(validations[0].name).to.equal('first-name');
                expect(validations[0].type).to.equal('alphabetical');
                expect(validations[0].value).to.equal('Hector');

                expect(validations[1].name).to.equal('age');
                expect(validations[1].type).to.equal('numeric');
                expect(validations[1].value).to.equal('25');

                expect(validations[2].name).to.equal('id');
                expect(validations[2].type).to.equal('alphanumeric');
                expect(validations[2].value).to.equal('RZT0123UI');
            });
         });
        
        describe('the validateForm function', function () {
            it('should validate a form with all of the possible validation types', function() {
                const name = form.querySelector('input[name="first-name"]');
                const age = form.querySelector('input[name="age"]');
                const id = form.querySelector('input[name="id"]');

                name.value = "Hector";
                age.value = 25;
                id.value = "RZT0123UI";

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

            it('should return multiple errors if more than one field is invalid', function () {
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