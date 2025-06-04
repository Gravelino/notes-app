import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import type { RootState } from '../../store/store';
import NoteCard from '../NoteCard/NoteCard';
import './NotesList.scss';

const NotesList: React.FC = () => {
    const { t } = useTranslation();
    const { notes, loading, error } = useSelector((state: RootState) => state.notes);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="notes-list">
                <div className="loading">{t('loading')}</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="notes-list">
                <div className="error">{error}</div>
            </div>
        );
    }

    return (
        <div className="notes-list">
            {notes.length > 0 && (
                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder={t('searchPlaceholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        data-testid="search-input"
                    />
                </div>
            )}

            {filteredNotes.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state__icon">📝</div>
                    <p className="empty-state__message">
                        {notes.length === 0 ? t('emptyNotes') : 'No notes match your search.'}
                    </p>
                </div>
            ) : (
                <div className="notes-grid" data-testid="notes-grid">
                    {filteredNotes.map((note) => (
                        <NoteCard key={note.id} note={note} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotesList;