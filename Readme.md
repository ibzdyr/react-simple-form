﻿# React simple form
 Test Description
This test suite focuses on validating the functionality of the MyFormComponent within our application. The tests simulate user interaction with the form and checks whether it behaves as expected. This includes:

Checking the form submission with all fields filled correctly
Submitting the form with a very long valid name
Submitting the form with a complex valid email address
Changing the gender from male to female and submitting the form
Re-submitting the form after an initial successful submission
We also conduct negative test cases to ensure the application responds appropriately to user errors. This includes:

Submitting the form with the 'Name' field left blank
Submitting the form with an invalid email address
Submitting the form without checking the 'Agree to Terms' checkbox
Submitting the form without selecting a gender
Submitting the form with a name that is less than 3 characters long
Running Tests Locally
To run these tests locally, follow these steps:

Ensure you have Node.js installed on your system.

Install the required project dependencies:

npm install
