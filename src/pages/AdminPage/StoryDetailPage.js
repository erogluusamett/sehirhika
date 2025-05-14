import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './StoryDetailPage.css';

const StoryDetailPage = () => {
    const { id } = useParams(); // URL'den ID'yi al
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:8585/api/stories/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setStory(response.data);
            } catch (error) {
                console.error("Anı detayları alınamadı:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStory();
    }, [id]);

    if (loading) return <p>Yükleniyor...</p>;
    if (!story) return <p>Anı bulunamadı.</p>;

    return (
        <div className="story-detail">
            <h2>{story.title}</h2>
            <p><strong>Yazar:</strong> {story.authorUsername}</p>
            <p><strong>Şehir:</strong> {story.city}</p>
            <p><strong>Kategori:</strong> {story.category}</p>
            <p><strong>İçerik:</strong></p>
            <p>{story.content}</p>

            {story.imageUrl && (
                <img
                    src={
                        story.imageUrl?.startsWith("http")
                            ? story.imageUrl
                            : `http://localhost:8585/uploads/${story.imageUrl}`
                    }
                    alt="Anı görseli"
                />
            )}
        </div>
    );
};

export default StoryDetailPage;
