// Імпортуємо команди
import './commands';

Cypress.Screenshot.defaults({
    screenshotOnRunFailure: false
});

Cypress.on('uncaught:exception', () => {
    return false;
});