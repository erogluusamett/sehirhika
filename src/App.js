import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ExplorePage from './pages/ExplorePage/ExplorePage';
import EntryPage from './pages/EntryPage/EntryPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import MapPage from './pages/MapPage/MapPage';
import FeedPage from './pages/FeedPage/FeedPage';

import SidebarLayout from './layout/SidebarLayout';
import AdminLayout from './layout/AdminLayout';

import UserManagementPage from './pages/AdminPage/UserManagementPage';
import CategoryManagementPage from './pages/AdminPage/CategoryManagementPage';
import TagManagementPage from './pages/AdminPage/TagManagementPage';
import StoryManagementPage from './pages/AdminPage/StoryManagementPage';
import AdminDashboardPage from './pages/AdminPage/AdminDashboardPage';
import StatsDashboardPage from './pages/AdminPage/StatsDashboardPage';
import StoryDetailPage from './pages/AdminPage/StoryDetailPage';

function App() {
    return (
        <Router>
            <Routes>

                {/* Sidebar OLMAYAN sayfalar */}
                <Route path="/" element={<EntryPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/map" element={<MapPage />} />

                {/* Kullanıcılar için SidebarLayout */}
                <Route element={<SidebarLayout />}>
                    <Route path="/memories" element={<FeedPage />} />
                    <Route path="/explore" element={<ExplorePage />} />

                </Route>

                {/* Admin paneli */}
                <Route element={<AdminLayout />}>
                    <Route path="/admin" element={<AdminDashboardPage />} />
                    <Route path="/admin/users" element={<UserManagementPage />} />
                    <Route path="/admin/stories" element={<StoryManagementPage />} />
                    <Route path="/admin/categories" element={<CategoryManagementPage />} />
                    <Route path="/admin/tags" element={<TagManagementPage />} />
                    <Route path="/admin/stats" element={<StatsDashboardPage />} />
                    <Route path="/story/:id" element={<StoryDetailPage />} />
                </Route>
            </Routes>

            {/* Toast bildirimleri */}
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </Router>
    );
}

export default App;
