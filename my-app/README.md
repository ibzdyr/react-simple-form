# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

## Test Description

This test suite focuses on validating the functionality of the `MyFormComponent` within our application. The tests simulate user interaction with the form and checks whether it behaves as expected. This includes:

1. Checking the form submission with all fields filled correctly
2. Submitting the form with a very long valid name
3. Submitting the form with a complex valid email address
4. Changing the gender from male to female and submitting the form
5. Re-submitting the form after an initial successful submission

We also conduct negative test cases to ensure the application responds appropriately to user errors. This includes:

1. Submitting the form with the 'Name' field left blank
2. Submitting the form with an invalid email address
3. Submitting the form without checking the 'Agree to Terms' checkbox
4. Submitting the form without selecting a gender
5. Submitting the form with a name that is less than 3 characters long

## Running Tests Locally

To run these tests locally, follow these steps:

1. Ensure you have [Node.js](https://nodejs.org/en/download/) installed on your system.

2. Install the required project dependencies:

### `npm install`