import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchNotes } from './store/notesSlice';
import type { AppDispatch } from './store/store';
import Header from './components/Header/Header';
import NotesList from './components/NotesList/NotesList';
import NoteModal from './components/NoteModal/NoteModal';
import './App.scss';

const App: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { i18n } = useTranslation();

    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch]);

    useEffect(() => {
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <NotesList />
            </main>
            <NoteModal />
        </div>
    );
};

export default App;