namespace App {

    // Validation
    export interface Validatable {
        value: string | number;
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
    }

    export function validate(validatableInput: Validatable) {
        let isValid = true;
        // is required : must have length > 0
        if (validatableInput.required) {
            isValid = isValid && validatableInput.value.toString().trim().length !== 0;
        }
        // minLength applies to string if minLength is set
        if (
            validatableInput.minLength != null &&
            typeof validatableInput.value === 'string'
        ) {
            isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
        }
        // maxLength applies to string if maxLength is set
        if (
            validatableInput.maxLength != null &&
            typeof validatableInput.value === 'string'
        ) {
            isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
        }
        // min applies to numeric values
        if (
            validatableInput.min != null &&
            typeof validatableInput.value === 'number'
        ) {
            isValid = isValid && validatableInput.value >= validatableInput.min;
        }
        // max applies to numeric values
        if (
            validatableInput.max != null &&
            typeof validatableInput.value === 'number'
        ) {
            isValid = isValid && validatableInput.value <= validatableInput.max;
        }
        return isValid;
    }

}