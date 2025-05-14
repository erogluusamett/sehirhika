import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StoryManagementPage.css';

const StoryManagementPage = () => {
    const [stories, setStories] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:8585/api/stories/paginated?page=${page}&size=10`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStories(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Anılar alınamadı:", error);
            }
        };

        fetchStories();
    }, [page]);

    const handleDelete = async (storyId) => {
        if (!window.confirm("Bu anıyı silmek istediğinize emin misiniz?")) return;
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8585/api/stories/${storyId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Silme sonrası veriyi yeniden çek
            const response = await axios.get(`http://localhost:8585/api/stories/paginated?page=${page}&size=10`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStories(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            alert("Silme işlemi sırasında hata oluştu.");
        }
    };

    const handleView = (storyId) => {
        navigate(`/story/${storyId}`);
    };

    return (
        <div className="story-management">
            <h2>Anı Yönetimi</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Başlık</th>
                    <th>Yazar</th>
                    <th>Şehir</th>
                    <th>Kategori</th>
                    <th>İşlem</th>
                </tr>
                </thead>
                <tbody>
                {stories.map((story) => (
                    <tr key={story.id}>
                        <td>{story.id}</td>
                        <td>{story.title}</td>
                        <td>{story.authorUsername}</td>
                        <td>{story.city}</td>
                        <td>{story.category}</td>
                        <td>
                            <button onClick={() => handleDelete(story.id)}>Sil</button>{' '}
                            <button onClick={() => handleView(story.id)}>Görüntüle</button>
                        </td>
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

export default StoryManagementPage;
