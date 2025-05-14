import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EntryPage.css';
import logo from '../../assets/sehrin-hikayesi-logo.png';
import MotifDecor from '../../components/MotifDecor';
const EntryPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <MotifDecor />

            <div className="login-container">
                <img src={logo} alt="Şehrin Hikayesi Logo" className="entry-logo" />

                <button
                    className="login-button"
                    onClick={() => {
                        localStorage.setItem('role', 'user');
                        navigate('/login?role=user');
                    }}
                >
                    Kullanıcı Girişi
                </button>

                <button
                    className="register-button"
                    onClick={() => {
                        localStorage.setItem('role', 'visitor');
                        navigate('/map');
                    }}
                >
                    Ziyaretçi Girişi
                </button>

                <p className="admin-link" onClick={() => navigate('/login?role=admin')}>
                    Admin Girişi
                </p>
            </div>
        </>
    );
};

export default EntryPage;
