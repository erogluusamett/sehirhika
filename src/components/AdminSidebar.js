import React from 'react';
import { Link } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = () => {
    return (
        <div className="admin-sidebar">
            <Link to="/admin/users" className="admin-nav-item"><i className="fas fa-users"></i> Kullanıcı Yönetimi</Link>
            <Link to="/admin/stories" className="admin-nav-item"><i className="fas fa-book"></i> Anı Yönetimi</Link>
            <Link to="/admin/categories" className="admin-nav-item"><i className="fas fa-layer-group"></i> Kategori Yönetimi</Link>
            <Link to="/admin/tags" className="admin-nav-item"><i className="fas fa-tag"></i> Etiket Yönetimi</Link>
            <Link to="/admin/stats" className="admin-nav-item"><i className="fas fa-chart-line"></i> İstatistikler</Link>
            <Link to="/admin/settings" className="admin-nav-item"><i className="fas fa-cog"></i> Ayarlar</Link>
        </div>
    );
};

export default AdminSidebar;
