import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CategoryManagementPage.css';

const CategoryManagementPage = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8585/api/categories/getall", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCategories(response.data);
        } catch (error) {
            console.error("Kategori listesi alınamadı:", error);
        }
    };

    const handleAdd = async () => {
        if (!newCategory) return;
        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:8585/api/categories/create", { name: newCategory }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNewCategory("");
            fetchCategories();
        } catch (error) {
            console.error("Kategori ekleme hatası:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Silmek istediğine emin misin?")) return;
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8585/api/categories/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchCategories();
        } catch (error) {
            console.error("Silme hatası:", error);
        }
    };

    return (
        <div className="category-management">
            <h2>Kategori Yönetimi</h2>

            <div className="add-form">
                <input
                    type="text"
                    placeholder="Yeni kategori adı"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                <button onClick={handleAdd}>Ekle</button>
            </div>

            <table className="category-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Kategori Adı</th>
                    <th>İşlem</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((cat) => (
                    <tr key={cat.id}>
                        <td>{cat.id}</td>
                        <td>{cat.name}</td>
                        <td>
                            <button className="delete-btn" onClick={() => handleDelete(cat.id)}>Sil</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryManagementPage;
