import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TagManagementPage.css';

const TagManagementPage = () => {
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8585/api/tags/getall", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTags(response.data);
        } catch (error) {
            console.error("Etiket listesi alınamadı:", error);
        }
    };

    const handleAdd = async () => {
        if (!newTag) return;
        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:8585/api/tags/create", { name: newTag }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNewTag("");
            fetchTags();
        } catch (error) {
            console.error("Etiket ekleme hatası:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Silmek istediğine emin misin?")) return;
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8585/api/tags/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTags();
        } catch (error) {
            console.error("Silme hatası:", error);
        }
    };

    return (
        <div className="tag-management">
            <h2>Etiket Yönetimi</h2>

            <div className="add-form">
                <input
                    type="text"
                    placeholder="Yeni etiket adı"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                />
                <button onClick={handleAdd}>Ekle</button>
            </div>

            <table className="tag-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Etiket Adı</th>
                    <th>İşlem</th>
                </tr>
                </thead>
                <tbody>
                {tags.map(tag => (
                    <tr key={tag.id}>
                        <td>{tag.id}</td>
                        <td>{tag.name}</td>
                        <td>
                            <button className="delete-btn" onClick={() => handleDelete(tag.id)}>Sil</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TagManagementPage;
