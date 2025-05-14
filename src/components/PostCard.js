import React, { useState } from 'react';
import './PostCard.css';
import { FaRegHeart, FaRegComment } from 'react-icons/fa';

const PostCard = ({ post }) => {
    const [showCommentInput, setShowCommentInput] = useState(false);

    return (
        <div className="post-card">
            {/* Kullanıcı adı */}
            <div className="post-header">
                <span className="username">{post.authorUsername}</span>
            </div>

            {/* Görsel */}
            {post.imageUrl && (
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="post-image"
                />
            )}

            {/* Beğeni ve yorum ikonları */}
            <div className="post-actions">
                <FaRegHeart className="icon" />
                <FaRegComment className="icon" onClick={() => setShowCommentInput(!showCommentInput)} />
            </div>

            {/* Açıklama */}
            <div className="post-caption">
                <strong>{post.title}</strong>
                <p>{post.content}</p>
            </div>

            {/* Yorum giriş alanı */}
            {showCommentInput && (
                <div className="post-comment">
                    <input type="text" placeholder="Yorum ekle..." />
                </div>
            )}
        </div>
    );
};

export default PostCard;
