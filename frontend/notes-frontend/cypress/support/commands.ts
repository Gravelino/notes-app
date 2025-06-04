/// <reference types="cypress" />

interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: string;
}

let mockNotes: Note[] = [];

Cypress.Commands.add('mockNotesApi', () => {
    cy.fixture('notes.json').then((initialNotes: Note[]) => {
        mockNotes = [...initialNotes];

        cy.intercept('GET', 'http://localhost:8080/api/notes', (req) => {
            req.reply({
                statusCode: 200,
                body: mockNotes
            });
        }).as('getNotes');

        cy.intercept('GET', 'http://localhost:8080/api/notes/*', (req) => {
            const id = req.url.split('/').pop();
            const note = mockNotes.find(n => n.id === id);

            if (note) {
                req.reply({
                    statusCode: 200,
                    body: note
                });
            } else {
                req.reply({
                    statusCode: 404,
                    body: { message: 'Note not found' }
                });
            }
        }).as('getNote');

        cy.intercept('POST', 'http://localhost:8080/api/notes', (req) => {
            const newNote = req.body;
            const newId = (Math.max(...mockNotes.map(n => parseInt(n.id)), 0) + 1).toString();

            const createdNote = {
                ...newNote,
                id: newId,
                createdAt: new Date().toISOString()
            };

            mockNotes.push(createdNote);

            req.reply({
                statusCode: 201,
                body: newId
            });
        }).as('createNote');

        cy.intercept('PUT', 'http://localhost:8080/api/notes/*', (req) => {
            const id = req.url.split('/').pop();
            const updatedNoteData = req.body;

            const noteIndex = mockNotes.findIndex(n => n.id === id);

            if (noteIndex !== -1) {
                mockNotes[noteIndex] = {
                    ...mockNotes[noteIndex],
                    ...updatedNoteData
                };

                req.reply({
                    statusCode: 200,
                    body: {}
                });
            } else {
                req.reply({
                    statusCode: 404,
                    body: { message: 'Note not found' }
                });
            }
        }).as('updateNote');

        cy.intercept('DELETE', 'http://localhost:8080/api/notes/*', (req) => {
            const id = req.url.split('/').pop();
            const noteIndex = mockNotes.findIndex(n => n.id === id);

            if (noteIndex !== -1) {
                mockNotes.splice(noteIndex, 1);

                req.reply({
                    statusCode: 204
                });
            } else {
                req.reply({
                    statusCode: 404,
                    body: { message: 'Note not found' }
                });
            }
        }).as('deleteNote');
    });
});

declare global {
    interface Cypress {
        Chainable: {
            mockNotesApi(): Cypress.Chainable<void>
        }
    }
}