import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ExplorePage.css';
import PostModal from '../../components/PostModal'; // Bu componenti birazdan vereceğim

const ExplorePage = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:8585/api/stories/random", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPosts(res.data);
        };
        fetchPosts();
    }, []);

    return (
        <div className="explore-container">
            <h2 className="explore-header">Senin İçin <span className="subtext">- Tüm Şehirler</span></h2>
            <div className="explore-grid">
                {posts.map((post) => (
                    <div className="explore-item" key={post.id} onClick={() => setSelectedPost(post)}>
                        <img src={post.imageUrl} alt={post.title} />
                    </div>
                ))}
            </div>

            {selectedPost && (
                <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
            )}
        </div>
    );
};

export default ExplorePage;
