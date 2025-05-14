import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PostCard from '../../components/PostCard';
import './FeedPage.css';
import axios from 'axios';

const cityMap = {
    "Adana": 1, "Adıyaman": 2, "Afyonkarahisar": 3, "Ağrı": 4, "Amasya": 5, "Ankara": 6,
    "Antalya": 7, "Artvin": 8, "Aydın": 9, "Balıkesir": 10, "Bilecik": 11, "Bingöl": 12,
    "Bitlis": 13, "Bolu": 14, "Burdur": 15, "Bursa": 16, "Çanakkale": 17, "Çankırı": 18,
    "Çorum": 19, "Denizli": 20, "Diyarbakır": 21, "Edirne": 22, "Elazığ": 23, "Erzincan": 24,
    "Erzurum": 25, "Eskişehir": 26, "Gaziantep": 27, "Giresun": 28, "Gümüşhane": 29, "Hakkâri": 30,
    "Hatay": 31, "Isparta": 32, "Mersin": 33, "İstanbul": 34, "İzmir": 35, "Kars": 36,
    "Kastamonu": 37, "Kayseri": 38, "Kırklareli": 39, "Kırşehir": 40, "Kocaeli": 41,
    "Konya": 42, "Kütahya": 43, "Malatya": 44, "Manisa": 45, "Kahramanmaraş": 46,
    "Mardin": 47, "Muğla": 48, "Muş": 49, "Nevşehir": 50, "Niğde": 51, "Ordu": 52,
    "Rize": 53, "Sakarya": 54, "Samsun": 55, "Siirt": 56, "Sinop": 57, "Sivas": 58,
    "Tekirdağ": 59, "Tokat": 60, "Trabzon": 61, "Tunceli": 62, "Şanlıurfa": 63, "Uşak": 64,
    "Van": 65, "Yozgat": 66, "Zonguldak": 67, "Aksaray": 68, "Bayburt": 69, "Karaman": 70,
    "Kırıkkale": 71, "Batman": 72, "Şırnak": 73, "Bartın": 74, "Ardahan": 75, "Iğdır": 76,
    "Yalova": 77, "Karabük": 78, "Kilis": 79, "Osmaniye": 80, "Düzce": 81
};

const FeedPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const rawCity = queryParams.get('city');

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [validCity, setValidCity] = useState('');
    const [invalidCity, setInvalidCity] = useState(false);

    useEffect(() => {
        const fetchCityPosts = async () => {
            if (!rawCity) {
                setInvalidCity(true);
                setLoading(false);
                return;
            }

            const formattedCity = rawCity.charAt(0).toUpperCase() + rawCity.slice(1).toLowerCase();
            const cityId = cityMap[formattedCity];

            if (!cityId) {
                setInvalidCity(true);
                setLoading(false);
                return;
            }

            setValidCity(formattedCity);

            try {
                const token = localStorage.getItem("token");

                const res = await axios.get(`http://localhost:8585/api/stories/by-city/${cityId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setPosts(res.data.reverse()); // ✅ En yeni anı en üste göster
            } catch (err) {
                console.error("❌ Anılar alınırken hata:", err);
            } finally {
                setLoading(false);
            }

        };

        fetchCityPosts();
    }, [rawCity]);

    return (
        <div className="feed-container">
            {invalidCity ? (
                <h2 className="city-title">❗ Geçersiz şehir adı.</h2>
            ) : (
                <>
                    <h2 className="city-title">{validCity} Anıları</h2>
                    <div className="post-list">
                        {loading ? (
                            <p>Yükleniyor...</p>
                        ) : posts.length > 0 ? (
                            posts.map(post => <PostCard key={post.id} post={post} />)
                        ) : (
                            <p className="no-post">Bu şehir için anı bulunamadı.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default FeedPage;
