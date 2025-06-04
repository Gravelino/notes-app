import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Note } from './notesSlice';

interface UiState {
    isModalOpen: boolean;
    editingNote: Note | null;
    language: string;
}

const initialState: UiState = {
    isModalOpen: false,
    editingNote: null,
    language: localStorage.getItem('language') || 'en',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openModal: (state) => {
            state.isModalOpen = true;
            state.editingNote = null;
        },
        openEditModal: (state, action: PayloadAction<Note>) => {
            state.isModalOpen = true;
            state.editingNote = action.payload;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
            state.editingNote = null;
        },
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
            localStorage.setItem('language', action.payload);
        },
    },
});

export const { openModal, openEditModal, closeModal, setLanguage } = uiSlice.actions;
export default uiSlice.reducer;