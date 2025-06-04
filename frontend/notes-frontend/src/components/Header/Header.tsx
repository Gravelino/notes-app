import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import type { RootState } from '../../store/store';
import { openModal, setLanguage } from '../../store/uiSlice';
import './Header.scss';

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const currentLanguage = useSelector((state: RootState) => state.ui.language);

    const handleCreateNote = () => {
        dispatch(openModal());
    };

    const handleLanguageChange = (language: string) => {
        dispatch(setLanguage(language));
        i18n.changeLanguage(language);
    };

    return (
        <header className="header">
            <div className="header__container">
                <h1 className="header__title">{t('appTitle')}</h1>

                <div className="header__actions">
                    <div className="language-selector">
                        <button
                            className={`language-btn ${currentLanguage === 'en' ? 'active' : ''}`}
                            onClick={() => handleLanguageChange('en')}
                            data-testid="lang-en"
                            title="English"
                        >
                            EN
                        </button>
                        <button
                            className={`language-btn ${currentLanguage === 'ua' ? 'active' : ''}`}
                            onClick={() => handleLanguageChange('ua')}
                            data-testid="lang-ua"
                            title="Українська"
                        >
                            УКР
                        </button>
                    </div>

                    <button
                        className="create-btn"
                        onClick={handleCreateNote}
                        data-testid="create-note-btn"
                    >
                        <span className="create-btn__icon">+</span>
                        <span className="create-btn__text">{t('createNote')}</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;