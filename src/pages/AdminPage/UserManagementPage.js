import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserManagement.css';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:8585/api/users/paginated?page=${page}&size=10`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Kullanıcılar alınamadı:", error);
            }
        };

        fetchUsers();
    }, [page]);

    const handleDelete = async (id) => {
        if (!window.confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?")) return;
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8585/api/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Silmeden sonra aynı sayfadaki kullanıcıları tekrar çek
            const response = await axios.get(`http://localhost:8585/api/users/paginated?page=${page}&size=10`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            alert("Silme işlemi sırasında hata oluştu.");
        }
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="user-management">
            <h2>Kullanıcı Yönetimi</h2>
            <input
                type="text"
                placeholder="Kullanıcı ara..."
                className="search-box"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Kullanıcı Adı</th>
                    <th>E-posta</th>
                    <th>İşlem</th>
                </tr>
                </thead>
                <tbody>
                {filteredUsers.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td><button onClick={() => handleDelete(user.id)}>Sil</button></td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i)}
                        className={page === i ? 'active' : ''}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default UserManagement;
