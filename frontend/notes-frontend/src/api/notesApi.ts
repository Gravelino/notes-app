import axios from 'axios';
import type{  Note, CreateNoteRequest, UpdateNoteRequest } from '../store/notesSlice';

const API_BASE_URL: string = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getAllNotes = async (): Promise<Note[]> => {
    const response = await api.get<Note[]>('/notes');
    return response.data;
};

export const getNoteById = async (id: string): Promise<Note> => {
    const response = await api.get<Note>(`/notes/${id}`);
    return response.data;
};

export const createNote = async (note: CreateNoteRequest): Promise<string> => {
    const response = await api.post<string>('/notes', note);
    return response.data;
};

export const updateNote = async (id: string, note: UpdateNoteRequest): Promise<void> => {
    await api.put(`/notes/${id}`, note);
};

export const deleteNote = async (id: string): Promise<void> => {
    await api.delete(`/notes/${id}`);
};