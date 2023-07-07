import { render, cleanup, fireEvent } from '@testing-library/react';
import MyFormComponent from './MyFormComponent';

describe('MyFormComponent', () => {
    let getByText, queryByText, getByPlaceholderText, getByDisplayValue, getByLabelText;
    let alertSpy;

    beforeEach(() => {
        ({ getByText, queryByText, getByPlaceholderText, getByDisplayValue, getByLabelText } = render(<MyFormComponent />));

        alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

        fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
        fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
        fireEvent.click(getByLabelText('Agree to terms'));
        fireEvent.click(getByDisplayValue('male'));
    });

    afterEach(() => {
        alertSpy.mockRestore();
        cleanup();
    });

    // Positive Test Cases
    test('Submit the form with all fields filled in correctly', () => {
        fireEvent.click(getByText('Submit'));
        expect(alertSpy).toHaveBeenCalledWith('Form submitted');
    });

    test('Submit the form with a very long valid name', () => {
        const longName = 'a'.repeat(200);
        fireEvent.change(getByPlaceholderText('Name'), { target: { value: longName } });
        fireEvent.click(getByText('Submit'));
        expect(alertSpy).toHaveBeenCalledWith('Form submitted');
    });

    test('Submit the form with a complex valid email address', () => {
        const complexEmail = 'test.name+alias@example.co.uk';
        fireEvent.change(getByPlaceholderText('Email'), { target: { value: complexEmail } });
        fireEvent.click(getByText('Submit'));
        expect(alertSpy).toHaveBeenCalledWith('Form submitted');
    });

    test('Change the gender from male to female and submit the form', () => {
        fireEvent.click(getByDisplayValue('female'));
        fireEvent.click(getByText('Submit'));
        expect(alertSpy).toHaveBeenCalledWith('Form submitted');
    });
    test('Re-submit the form after an initial successful submission with all fields filled in correctly', () => {
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
        fireEvent.change(getByPlaceholderText('Name'), { target: { value: '' } });
        fireEvent.click(getByText('Submit'));
        expect(getByText('Name must be at least 3 characters.')).toBeInTheDocument();
        expect(alertSpy).not.toHaveBeenCalled();
    });
    test('Submit the form with an invalid email address', () => {
        fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'invalid.email' } });
        fireEvent.click(getByText('Submit'));
        expect(getByText('Email must be valid.')).toBeInTheDocument();
        expect(alertSpy).not.toHaveBeenCalled();
    });
    test('Submit the form without checking the \'Agree to Terms\' checkbox', () => {
        fireEvent.click(getByLabelText('Agree to terms'));
        expect(getByText('You must agree to the terms.')).toBeInTheDocument();
        expect(alertSpy).not.toHaveBeenCalled();
    });
    test('Submit the form without selecting a gender',  () => {
        fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
        fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
        fireEvent.click(getByLabelText('Agree to terms'));
        fireEvent.click(getByDisplayValue('male'));
        fireEvent.click(getByText('Submit'));
        expect(getByText('You must agree to the terms.')).toBeInTheDocument();
        expect(alertSpy).not.toHaveBeenCalled();
    });
    test('Submit the form with a name that is less than 3 characters long', () => {
        fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'ab' } });
        fireEvent.click(getByText('Submit'));
        expect(getByText('Name must be at least 3 characters.')).toBeInTheDocument();
        expect(alertSpy).not.toHaveBeenCalled();
    });
});