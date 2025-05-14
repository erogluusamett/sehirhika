// MemoryPopup.js
import React, { useState } from 'react';
import axios from 'axios';
import './MemoryPopup.css';

const MemoryPopup = ({ city, onClose }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!file) {
            alert("Lütfen bir dosya seçin.");
            return;
        }

        const formData = new FormData();
        formData.append("fileAttachment", file);
        formData.append("city", city); // şehir de gönderiliyor örnek olarak

        try {
            const response = await axios.post("http://localhost:8585/api/memories", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            alert("Anı başarıyla yüklendi!");
            onClose(); // popup kapansın
        } catch (err) {
            console.error("Hata:", err);
            alert("Yükleme başarısız!");
        }
    };

    return (
        <div className="memory-popup">
            <h2>Yeni Anı Oluştur</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleSubmit}>Yükle</button>
            <button onClick={onClose}>Kapat</button>
        </div>
    );
};

export default MemoryPopup;
