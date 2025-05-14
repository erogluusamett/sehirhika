import React, { useState } from 'react';
import './MemoryPostForm.css';

const MemoryPostForm = ({ selectedFile, city, onSubmit, onCancel }) => {
    const [tag, setTag] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !content) {
            alert("Başlık ve açıklama zorunludur.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("tag", tag);
        formData.append("title", title);
        formData.append("content", content);
        formData.append("city", city);

        onSubmit(formData);
    };

    return (
        <div className="memory-post-form">
            <div className="memory-preview">
                <img src={URL.createObjectURL(selectedFile)} alt="Önizleme" />
            </div>

            <form onSubmit={handleSubmit} className="memory-form-fields">
                <h2>Yeni Anı</h2>
                <input
                    type="text"
                    placeholder="Etiket (opsiyonel)"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Başlık"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Açıklama"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={5}
                />

                <div className="form-buttons">
                    <button type="submit" className="submit-btn">Paylaş</button>
                    <button type="button" className="cancel-btn" onClick={onCancel}>İptal</button>
                </div>
            </form>
        </div>
    );
};

export default MemoryPostForm;
