import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StatsDashboardPage.css';
import {
    PieChart, Pie, Cell, Tooltip,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer
} from 'recharts';

const StatsDashboardPage = () => {
    const [stats, setStats] = useState({
        userCount: 0,
        storyCount: 0,
        userTodayCount: 0,
        storyTodayCount: 0,
        cityCount: 0,
        categoryCount: 0,
        tagCount: 0
    });

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#E74C3C'];

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem("token");

            const [
                userRes, storyRes,
                userTodayRes, storyTodayRes,
                cityRes, categoryRes, tagRes
            ] = await Promise.all([
                axios.get("http://localhost:8585/api/users/count", {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get("http://localhost:8585/api/stories/count", {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get("http://localhost:8585/api/users/count/today", {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get("http://localhost:8585/api/stories/count/today", {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get("http://localhost:8585/api/cities/count", {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get("http://localhost:8585/api/categories/count", {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get("http://localhost:8585/api/tags/count", {
                    headers: { Authorization: `Bearer ${token}` }
                }),
            ]);

            setStats({
                userCount: userRes.data,
                storyCount: storyRes.data,
                userTodayCount: userTodayRes.data,
                storyTodayCount: storyTodayRes.data,
                cityCount: cityRes.data,
                categoryCount: categoryRes.data,
                tagCount: tagRes.data
            });
        } catch (err) {
            console.error("İstatistik verisi alınamadı:", err);
        }
    };

    const pieData = [
        { name: 'Kullanıcılar', value: stats.userCount },
        { name: 'Anılar', value: stats.storyCount },
        { name: 'Şehirler', value: stats.cityCount },
        { name: 'Kategoriler', value: stats.categoryCount },
        { name: 'Etiketler', value: stats.tagCount }
    ];

    return (
        <div className="stats-dashboard">
            <h2>İstatistikler</h2>

            <div className="summary-cards">
                <div className="summary-card">Bugün Eklenen Kullanıcılar: <strong>{stats.userTodayCount}</strong></div>
                <div className="summary-card">Bugün Eklenen Anılar: <strong>{stats.storyTodayCount}</strong></div>
                <div className="summary-card">Toplam Kullanıcı: <strong>{stats.userCount}</strong></div>
                <div className="summary-card">Toplam Anı: <strong>{stats.storyCount}</strong></div>
            </div>

            <div className="chart-wrapper">
                <div className="chart-box">
                    <h3>Genel Dağılım (PieChart)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-box">
                    <h3>Sayısal Karşılaştırma (BarChart)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={pieData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default StatsDashboardPage;
