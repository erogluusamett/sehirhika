/*
// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/map" className="nav-item"><i className="fas fa-home"></i> Ana Sayfa</Link>
            <Link to="/search" className="nav-item"><i className="fas fa-search"></i> Ara</Link>
            <Link to="/explore" className="nav-item"><i className="fas fa-compass"></i> Keşfet</Link>
            <Link to="/notifications" className="nav-item"><i className="fas fa-heart"></i> Bildirimler</Link>
            <Link to="/create" className="nav-item"><i className="fas fa-plus-square"></i> Oluştur</Link>
            <Link to="/profile" className="nav-item">
                <img src={process.env.PUBLIC_URL + '/assets/profile.jpeg'} alt="Profil" className="profile-pic" />
                Profil
            </Link>
        </div>
    );
};

export default Sidebar;
*/
