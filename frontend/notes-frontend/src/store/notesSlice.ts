import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import * as notesApi from '../api/notesApi';

export interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateNoteRequest {
    title: string;
    content: string;
}

export interface UpdateNoteRequest {
    title: string;
    content: string;
}

interface NotesState {
    notes: Note[];
    loading: boolean;
    error: string | null;
}

const initialState: NotesState = {
    notes: [],
    loading: false,
    error: null,
};

export const fetchNotes = createAsyncThunk(
    'notes/fetchNotes',
    async () => {
        const response = await notesApi.getAllNotes();
        return response;
    }
);

export const createNote = createAsyncThunk(
    'notes/createNote',
    async (noteData: CreateNoteRequest) => {
        const id = await notesApi.createNote(noteData);
        const newNote = await notesApi.getNoteById(id);
        return newNote;
    }
);

export const updateNote = createAsyncThunk(
    'notes/updateNote',
    async ({ id, data }: { id: string; data: UpdateNoteRequest }) => {
        await notesApi.updateNote(id, data);
        const updatedNote = await notesApi.getNoteById(id);
        return updatedNote;
    }
);

export const deleteNote = createAsyncThunk(
    'notes/deleteNote',
    async (id: string) => {
        await notesApi.deleteNote(id);
        return id;
    }
);

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotes.fulfilled, (state, action: PayloadAction<Note[]>) => {
                state.loading = false;
                state.notes = action.payload;
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch notes';
            })
            .addCase(createNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNote.fulfilled, (state, action: PayloadAction<Note>) => {
                state.loading = false;
                state.notes.unshift(action.payload);
            })
            .addCase(createNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create note';
            })
            .addCase(updateNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateNote.fulfilled, (state, action: PayloadAction<Note>) => {
                state.loading = false;
                const index = state.notes.findIndex(note => note.id === action.payload.id);
                if (index !== -1) {
                    state.notes[index] = action.payload;
                }
            })
            .addCase(updateNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update note';
            })
            .addCase(deleteNote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteNote.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.notes = state.notes.filter(note => note.id !== action.payload);
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete note';
            });
    },
});

export default notesSlice.reducer;