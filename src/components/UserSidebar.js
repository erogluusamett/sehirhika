import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserSidebar.css';
import MemoryModal from './MemoryModal';

const UserSidebar = () => {
    const [showModal, setShowModal] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // 🆕
    const selectedCity = "Malatya";
    const isLoggedIn = !!localStorage.getItem("token");
    const navigate = useNavigate();

    const handleLogout = () => {
        // 🔓 Tüm kullanıcı verilerini temizle
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");

        // Giriş ekranına yönlendir
        navigate("/login");
    };

    return (
        <>
            <div className="user-sidebar">
                <Link to="/map" className="user-nav-item"><i className="fas fa-home"></i><span>Ana Sayfa</span></Link>
                <Link to="/search" className="user-nav-item"><i className="fas fa-search"></i><span>Ara</span></Link>
                <Link to="/explore" className="user-nav-item"><i className="fas fa-compass"></i><span>Keşfet</span></Link>
                <Link to="/notifications" className="user-nav-item"><i className="fas fa-heart"></i><span>Bildirimler</span></Link>

                {isLoggedIn && (
                    <>
                        <div className="user-nav-item" onClick={() => setShowModal(true)}>
                            <i className="fas fa-plus-square"></i><span>Oluştur</span>
                        </div>

                        <div className="user-nav-item" onClick={() => setShowLogoutConfirm(true)}>
                            <i className="fas fa-sign-out-alt"></i><span>Çıkış</span>
                        </div>
                    </>
                )}

                <Link to="/profile" className="user-nav-item">
                    <img src={process.env.PUBLIC_URL + '/assets/profile.jpeg'} alt="Profil" className="user-profile-pic" />
                    <span>Profil</span>
                </Link>
            </div>

            {showModal && (
                <MemoryModal
                    selectedCity={selectedCity}
                    onClose={() => setShowModal(false)}
                />
            )}

            {/* 🔘 Çıkış onay modalı */}
            {showLogoutConfirm && (
                <div className="logout-confirm-overlay">
                    <div className="logout-confirm-modal">
                        <p>Çıkış yapmak istediğinize emin misiniz?</p>
                        <div className="confirm-buttons">
                            <button className="yes" onClick={handleLogout}>Evet</button>
                            <button className="no" onClick={() => setShowLogoutConfirm(false)}>Hayır</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserSidebar;
