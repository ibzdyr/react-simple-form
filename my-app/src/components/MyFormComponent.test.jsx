import {render, cleanup, fireEvent} from '@testing-library/react';
import MyFormComponent from './MyFormComponent';

describe('MyFormComponent', () => {
    let getByText, getByPlaceholderText, getByDisplayValue, getByLabelText, queryByText;
    let alertSpy;

    beforeEach(() => {
        ({getByText, getByPlaceholderText, getByDisplayValue, getByLabelText, queryByText} = render(
            <MyFormComponent/>));

        alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {
        });
    });

    afterEach(() => {
        alertSpy.mockRestore();
        cleanup();
    });

    const fillForm = ({
                          name = 'John Doe',
                          email = 'john.doe@example.com',
                          agreeToTerms = true,
                          gender = 'male'
                      } = {}) => {
        fireEvent.change(getByPlaceholderText('Name'), {target: {value: name}});
        fireEvent.change(getByPlaceholderText('Email'), {target: {value: email}});
        if (agreeToTerms) {
            fireEvent.click(getByLabelText('Agree to terms'));
        }
        if (gender) {
            fireEvent.click(getByDisplayValue(gender));
        }
    }

    // Positive Test Cases
    test('Submit the form with all fields filled in correctly', () => {
        fillForm();
        fireEvent.click(getByText('Submit'));
        expect(alertSpy).toHaveBeenCalledWith('Form submitted');
    });

    test('Submit the form with a very long valid name', () => {
        const longName = 'a'.repeat(200);
        fillForm({name: longName});
        fireEvent.click(getByText('Submit'));
        expect(alertSpy).toHaveBeenCalledWith('Form submitted');
    });

    test('Submit the form with a complex valid email address', () => {
        const complexEmail = 'test.name+alias@example.co.uk';
        fillForm({email: complexEmail});
        fireEvent.click(getByText('Submit'));
        expect(alertSpy).toHaveBeenCalledWith('Form submitted');
    });

    test('Change the gender from male to female and submit the form', () => {
        fillForm({gender: "female"});
        fireEvent.click(getByText('Submit'));
        expect(alertSpy).toHaveBeenCalledWith('Form submitted');
    });
    test('Re-submit the form after an initial successful submission with all fields filled in correctly', () => {
        fillForm();
        fireEvent.click(getByText('Submit'));
        expect(alertSpy).toHaveBeenCalledWith('Form submitted');
        fireEvent.click(getByText('Submit'));
        expect(queryByText('Name must be at least 3 characters.')).toBeNull();
        expect(queryByText('Email must be valid.')).toBeNull();
        expect(queryByText('You must agree to the terms.')).toBeNull();
        expect(queryByText('You must select a gender.')).toBeNull();

        expect(alertSpy).toHaveBeenCalledWith('Form submitted');
    });
    // Negative Test Cases
    test('Submit the form with the \'Name\' field left blank', () => {
        fillForm({name: ''});
        fireEvent.click(getByText('Submit'));
        expect(getByText('Name must be at least 3 characters.')).toBeInTheDocument();
        expect(alertSpy).not.toHaveBeenCalled();
    });
    test('Submit the form with an invalid email address', () => {
        fillForm({email: 'invalid.email'});
        fireEvent.click(getByText('Submit'));
        expect(getByText('Email must be valid.')).toBeInTheDocument();
        expect(alertSpy).not.toHaveBeenCalled();
    });
    test('Submit the form without checking the \'Agree to Terms\' checkbox', () => {
        fillForm({agreeToTerms: false});
        expect(getByText('You must agree to the terms.')).toBeInTheDocument();
        expect(alertSpy).not.toHaveBeenCalled();
    });
    test('Submit the form without selecting a gender', () => {
        fireEvent.click(getByText('Submit'));
        expect(getByText('You must agree to the terms.')).toBeInTheDocument();
        expect(alertSpy).not.toHaveBeenCalled();
    });
    test('Submit the form with a name that is less than 3 characters long', () => {
        fillForm({name: 'ab'});
        fireEvent.click(getByText('Submit'));
        expect(getByText('Name must be at least 3 characters.')).toBeInTheDocument();
        expect(alertSpy).not.toHaveBeenCalled();
    });
});