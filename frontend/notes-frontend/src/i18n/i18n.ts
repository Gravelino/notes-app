import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            appTitle: 'My Notes',
            createNote: 'Create Note',
            editNote: 'Edit Note',
            addNote: 'Add Note',
            saveNote: 'Save Note',
            cancel: 'Cancel',
            delete: 'Delete',
            confirm: 'Confirm',
            title: 'Title',
            content: 'Content',
            titlePlaceholder: 'Enter note title...',
            contentPlaceholder: 'Enter note content...',
            emptyNotes: 'No notes yet. Create your first note!',
            deleteConfirmation: 'Are you sure you want to delete this note?',
            loading: 'Loading...',
            error: 'An error occurred',
            createdAt: 'Created',
            updatedAt: 'Updated',
            searchPlaceholder: 'Search notes...',
            language: 'Language',
        },
    },
    ua: {
        translation: {
            appTitle: 'Мої Нотатки',
            createNote: 'Створити Нотатку',
            editNote: 'Редагувати Нотатку',
            addNote: 'Додати Нотатку',
            saveNote: 'Зберегти Нотатку',
            cancel: 'Скасувати',
            delete: 'Видалити',
            confirm: 'Підтвердити',
            title: 'Заголовок',
            content: 'Зміст',
            titlePlaceholder: 'Введіть заголовок нотатки...',
            contentPlaceholder: 'Введіть зміст нотатки...',
            emptyNotes: 'Немає нотаток. Створіть свою першу нотатку!',
            deleteConfirmation: 'Ви впевнені, що хочете видалити цю нотатку?',
            loading: 'Завантаження...',
            error: 'Сталася помилка',
            createdAt: 'Створено',
            updatedAt: 'Оновлено',
            searchPlaceholder: 'Пошук нотаток...',
            language: 'Мова',
        },
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem('language') || 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;