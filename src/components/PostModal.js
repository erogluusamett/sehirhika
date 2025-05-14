import React, { useState } from 'react';
import './PostModal.css';

const PostModal = ({ post, onClose }) => {
    const [comment, setComment] = useState("");

    const handleCommentSubmit = () => {
        console.log("Yorum gönderildi:", comment);
        setComment("");
    };

    // 📅 createdAt zaten "14 Mayıs" gibi hazır formatta geliyorsa → doğrudan yaz
    const formattedDate = post.createdAt || "Tarih bilinmiyor";

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>×</button>

                <div className="modal-left">
                    <img src={post.imageUrl} alt={post.title} />
                </div>

                <div className="modal-right">
                    <p className="post-meta">
                        <strong>Şehir:</strong> {post.city} <br />
                        <strong>Kategori:</strong> {post.category || "Yok"}
                    </p>

                    <p className="post-author"><strong>{post.authorUsername}</strong></p>
                    <p className="post-description">{post.content}</p>

                    <div className="comment-section">
                        <div className="like-comment-bar">
                            ❤️ 🗨️
                        </div>

                        <p className="like-count">23 beğenme</p>
                        <p className="post-date">{formattedDate}</p>

                        <input
                            className="comment-input"
                            placeholder="Yorum ekle..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />

                        <button
                            className="comment-send"
                            onClick={handleCommentSubmit}
                            disabled={!comment.trim()}
                        >
                            Gönder
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostModal;
