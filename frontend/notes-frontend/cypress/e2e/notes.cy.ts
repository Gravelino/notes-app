describe('Notes App E2E Tests', () => {
    beforeEach(() => {
        cy.mockNotesApi();
        cy.visit('/');
    });

    it('should display the app title and create note button', () => {
        cy.contains('My Notes').should('be.visible');
        cy.get('[data-testid="create-note-btn"]').should('be.visible');
    });

    it('should create a new note successfully', () => {
        const noteTitle = 'Test Note Title';
        const noteContent = 'This is a test note content for e2e testing.';

        cy.get('[data-testid="create-note-btn"]').click();

        cy.get('[data-testid="note-modal"]').should('be.visible');

        cy.get('[data-testid="title-input"]').type(noteTitle);
        cy.get('[data-testid="content-input"]').type(noteContent);

        cy.get('[data-testid="save-btn"]').click();

        cy.wait('@createNote');

        cy.get('[data-testid="note-modal"]').should('not.exist');

        cy.get('[data-testid="notes-grid"]').should('contain', noteTitle);
    });

    it('should edit an existing note', () => {
        const updatedTitle = 'Updated Title';
        const updatedContent = 'Updated content';

        cy.wait('@getNotes');

        cy.get('[data-testid="note-card"]').first().trigger('mouseover');
        cy.get('[data-testid="note-card"]').first().find('[data-testid="edit-btn"]').should('be.visible').click();

        cy.get('[data-testid="note-modal"]').should('be.visible');

        cy.get('[data-testid="title-input"]').clear().type(updatedTitle);
        cy.get('[data-testid="content-input"]').clear().type(updatedContent);
        cy.get('[data-testid="save-btn"]').click();

        cy.wait('@updateNote');

        cy.get('[data-testid="notes-grid"]').should('contain', updatedTitle);
    });

    it('should search notes', () => {
        cy.wait('@getNotes');

        cy.get('[data-testid="search-input"]').type('React');

        cy.get('[data-testid="notes-grid"]').should('contain', 'React Notes');
        cy.get('[data-testid="notes-grid"]').should('not.contain', 'Cypress Testing');

        cy.get('[data-testid="search-input"]').clear();

        cy.get('[data-testid="notes-grid"]').should('contain', 'React Notes');
        cy.get('[data-testid="notes-grid"]').should('contain', 'Cypress Testing');
    });
});
