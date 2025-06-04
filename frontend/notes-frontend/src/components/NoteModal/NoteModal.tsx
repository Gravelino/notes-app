import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import type { RootState, AppDispatch } from '../../store/store';
import { createNote, updateNote } from '../../store/notesSlice';
import { closeModal } from '../../store/uiSlice';
import './NoteModal.scss';

const NoteModal: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation();
    const { isModalOpen, editingNote } = useSelector((state: RootState) => state.ui);
    const { loading } = useSelector((state: RootState) => state.notes);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (isModalOpen) {
            if (editingNote) {
                setTitle(editingNote.title);
                setContent(editingNote.content);
            } else {
                setTitle('');
                setContent('');
            }
        }
    }, [isModalOpen, editingNote]);

    const handleClose = () => {
        setTitle('');
        setContent('');
        dispatch(closeModal());
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            return;
        }

        const noteData = {
            title: title.trim(),
            content: content.trim(),
        };

        try {
            if (editingNote) {
                await dispatch(updateNote({ id: editingNote.id, data: noteData })).unwrap();
            } else {
                await dispatch(createNote(noteData)).unwrap();
            }
            handleClose();
        } catch (error) {
            console.error('Failed to save note:', error);
        }
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    if (!isModalOpen) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={handleOverlayClick} data-testid="modal-overlay">
            <div className="modal" data-testid="note-modal">
                <div className="modal__header">
                    <h2 className="modal__title">
                        {editingNote ? t('editNote') : t('createNote')}
                    </h2>
                    <button
                        className="modal__close"
                        onClick={handleClose}
                        data-testid="close-modal"
                    >
                        ×
                    </button>
                </div>

                <form className="modal__form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-input"
                            placeholder={t('titlePlaceholder')}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            data-testid="title-input"
                            required
                        />
                    </div>

                    <div className="form-group">
            <textarea
                className="form-textarea"
                placeholder={t('contentPlaceholder')}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                data-testid="content-input"
                required
            />
                    </div>

                    <div className="modal__actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleClose}
                            disabled={loading}
                            data-testid="cancel-btn"
                        >
                            {t('cancel')}
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading || !title.trim() || !content.trim()}
                            data-testid="save-btn"
                        >
                            {loading ? t('loading') : t('saveNote')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NoteModal;