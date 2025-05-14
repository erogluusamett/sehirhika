import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import './AdminLayout.css';

const AdminLayout = () => {
    return (
        <div className="admin-dashboard">
            <AdminSidebar />
            <div className="admin-main-content">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
