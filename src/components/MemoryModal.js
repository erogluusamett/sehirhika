import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import './MemoryModal.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MemoryModal = ({ onClose, selectedCity }) => {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [tag, setTag] = useState([]);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [allTags, setAllTags] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const username = localStorage.getItem("username");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tagRes = await axios.get("http://localhost:8585/api/tags/getall");
                const catRes = await axios.get("http://localhost:8585/api/categories/getall");

                setAllTags(tagRes.data.map(tag => ({ value: tag.id, label: tag.name })));
                setAllCategories(catRes.data.map(cat => ({ value: cat.id, label: cat.name })));
            } catch (err) {
                console.error("Tag/Kategori çekme hatası:", err);
            }
        };

        fetchData();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setStep(2);
    };

    const getCityIdByName = (name) => {
        const cityMap = {
            "Adana": 1, "Adıyaman": 2, "Afyonkarahisar": 3, "Ağrı": 4, "Amasya": 5,
            "Ankara": 6, "Antalya": 7, "Artvin": 8, "Aydın": 9, "Balıkesir": 10, "Bilecik": 11,
            "Bingöl": 12, "Bitlis": 13, "Bolu": 14, "Burdur": 15, "Bursa": 16, "Çanakkale": 17,
            "Çankırı": 18, "Çorum": 19, "Denizli": 20, "Diyarbakır": 21, "Edirne": 22, "Elazığ": 23,
            "Erzincan": 24, "Erzurum": 25, "Eskişehir": 26, "Gaziantep": 27, "Giresun": 28,
            "Gümüşhane": 29, "Hakkâri": 30, "Hatay": 31, "Isparta": 32, "Mersin": 33, "İstanbul": 34,
            "İzmir": 35, "Kars": 36, "Kastamonu": 37, "Kayseri": 38, "Kırklareli": 39, "Kırşehir": 40,
            "Kocaeli": 41, "Konya": 42, "Kütahya": 43, "Malatya": 44, "Manisa": 45, "Kahramanmaraş": 46,
            "Mardin": 47, "Muğla": 48, "Muş": 49, "Nevşehir": 50, "Niğde": 51, "Ordu": 52, "Rize": 53,
            "Sakarya": 54, "Samsun": 55, "Siirt": 56, "Sinop": 57, "Sivas": 58, "Tekirdağ": 59,
            "Tokat": 60, "Trabzon": 61, "Tunceli": 62, "Şanlıurfa": 63, "Uşak": 64, "Van": 65,
            "Yozgat": 66, "Zonguldak": 67, "Aksaray": 68, "Bayburt": 69, "Karaman": 70,
            "Kırıkkale": 71, "Batman": 72, "Şırnak": 73, "Bartın": 74, "Ardahan": 75, "Iğdır": 76,
            "Yalova": 77, "Karabük": 78, "Kilis": 79, "Osmaniye": 80, "Düzce": 81
        };

        return cityMap[name] || null;
    };

    const handleSubmit = async () => {
        if (!selectedFile || tag.length === 0 || !title || !content || !category) {
            setError("Lütfen tüm alanları doldurun.");
            return;
        }

        setLoading(true);
        setError('');

        try {
            const authorId = localStorage.getItem("userId");
            const token = localStorage.getItem("token");
            const cityId = getCityIdByName(selectedCity);

            if (!token || !authorId || !cityId) {
                setError("Eksik kullanıcı ya da şehir bilgisi.");
                setLoading(false);
                return;
            }

            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const locRes = await axios.post("http://localhost:8585/api/locations/create", {
                latitude, longitude
            });

            const storyPayload = {
                title,
                content,
                authorId: parseInt(authorId),
                cityId,
                categoryId: parseInt(category.value),
                locationId: locRes.data.id,
                tagIds: tag.map(t => parseInt(t.value))
            };

            const storyRes = await axios.post("http://localhost:8585/api/stories/create", storyPayload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const storyId = storyRes.data.id;

            const formData = new FormData();
            formData.append("file", selectedFile);

            await axios.post(`http://localhost:8585/api/stories/upload-image/${storyId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success("Anı başarıyla oluşturuldu!", {
                onClose: () => {
                    onClose();
                    navigate(`/memories?city=${selectedCity}`);
                },
                autoClose: 3000,
                theme: "dark",
                position: "top-center",
            });

        } catch (err) {
            console.error("Yükleme hatası:", err);
            setError("Bir hata oluştu. Detay: " + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="memory-overlay">
            <div className="memory-modal">
                {step === 1 && (
                    <div className="memory-upload-area">
                        <h2>Yeni Anı Oluştur</h2>
                        <i className="fas fa-image upload-icon"></i>
                        <p>Fotoğrafınızı buraya seçin</p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="file-input"
                        />
                        <button className="close-btn" onClick={onClose}>X</button>
                    </div>
                )}

                {step === 2 && (
                    <div className="memory-detail-step">
                        <div className="left-preview">
                            <img src={previewUrl} alt="Önizleme" className="preview-image" />
                        </div>
                        <div className="right-form">
                            <div className="username">{username || "Kullanıcı"}</div>

                            {error && <div style={{ color: 'red' }}>{error}</div>}

                            <Select
                                isMulti
                                options={allTags}
                                value={tag}
                                onChange={(selectedOptions) => setTag(selectedOptions)}
                                placeholder="Etiket(ler) Seçin"
                            />

                            <input
                                type="text"
                                placeholder="Başlık"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <Select
                                options={allCategories}
                                value={category}
                                onChange={(selectedOption) => setCategory(selectedOption)}
                                placeholder="Kategori Seçin"
                            />

                            <textarea
                                placeholder="İçerik"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />

                            <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
                                {loading ? "Paylaşılıyor..." : "Paylaş"}
                            </button>
                            <button className="close-btn" onClick={onClose}>X</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MemoryModal;
