import React from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from '../components/UserSidebar';
import './SidebarLayout.css';

const SidebarLayout = () => {
    return (
        <div className="user-layout">
            <UserSidebar />
            <div className="user-main-content">
                <Outlet />
            </div>
        </div>
    );
};

export default SidebarLayout;
