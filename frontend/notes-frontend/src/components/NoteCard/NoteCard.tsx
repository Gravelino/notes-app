import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import type { AppDispatch } from '../../store/store';
import { deleteNote } from '../../store/notesSlice';
import { openEditModal } from '../../store/uiSlice';
import type { Note } from '../../store/notesSlice';
import './NoteCard.scss';

interface NoteCardProps {
    note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleEdit = () => {
        dispatch(openEditModal(note));
    };

    const handleDelete = () => {
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        dispatch(deleteNote(note.id));
        setShowDeleteConfirm(false);
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <div className="note-card" data-testid="note-card">
            <div className="note-card__content" onClick={handleEdit}>
                <h3 className="note-card__title" data-testid="note-title">
                    {truncateText(note.title, 50)}
                </h3>
                <p className="note-card__text" data-testid="note-content">
                    {truncateText(note.content, 150)}
                </p>
                <div className="note-card__meta">
                    <small className="note-card__date">
                        {note.updatedAt !== note.createdAt
                            ? `${t('updatedAt')}: ${formatDate(note.updatedAt)}`
                            : `${t('createdAt')}: ${formatDate(note.createdAt)}`
                        }

                    </small>
                </div>
            </div>

            <div className="note-card__actions">
                <button
                    className="action-btn edit-btn"
                    onClick={handleEdit}
                    title={t('editNote')}
                    data-testid="edit-btn"
                >
                    ✏️
                </button>
                <button
                    className="action-btn delete-btn"
                    onClick={handleDelete}
                    title={t('delete')}
                    data-testid="delete-btn"
                >
                    🗑️
                </button>
            </div>

            {showDeleteConfirm && (
                <div className="delete-confirm-overlay">
                    <div className="delete-confirm-modal">
                        <p>{t('deleteConfirmation')}</p>
                        <div className="delete-confirm-actions">
                            <button
                                className="btn btn-danger"
                                onClick={confirmDelete}
                                data-testid="confirm-delete"
                            >
                                {t('delete')}
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={cancelDelete}
                                data-testid="cancel-delete"
                            >
                                {t('cancel')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NoteCard;