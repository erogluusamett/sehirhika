import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TurkeyMap from 'turkey-map-react';
import './MapPage.css';
import MemoryModal from '../../components/MemoryModal';

const MapPage = () => {
    const [selectedCity, setSelectedCity] = useState(null);
    const [showWarning, setShowWarning] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [cityError, setCityError] = useState(false); // ❗ şehir seçilmedi uyarısı
    const navigate = useNavigate();

    const handleCityClick = (city) => {
        setSelectedCity(city.name);
        setCityError(false); // şehir seçildiyse hata kalksın
    };

    const handleLeaveMemory = () => {
        const role = localStorage.getItem("role");

        // ❌ şehir seçilmediyse uyarı
        if (!selectedCity) {
            setCityError(true);
            return;
        }

        if (role === "visitor") {
            setShowWarning(true);
        } else {
            setShowModal(true);
        }
    };

    const handleViewMemories = () => {
        navigate(`/memories?city=${selectedCity || ""}`);
    };

    const handleLoginRedirect = () => {
        setShowWarning(false);
        navigate('/login?role=user');
    };

    return (
        <div className="map-page">
            <h2>ANI BIRAKMAK İSTEDİĞİNİZ ŞEHRİ SEÇİN</h2>

            <div className="map-wrapper">
                <TurkeyMap
                    onClick={handleCityClick}
                    hoverable
                    selectedCity={selectedCity}
                />
            </div>

            {selectedCity && (
                <div className="city-label">{selectedCity} seçildi</div>
            )}

            {/* ❌ şehir seçilmeden anı bırakılırsa hata */}
            {cityError && (
                <div className="error-text">Lütfen önce bir şehir seçin.</div>
            )}

            <div className="button-group">
                <button className="map-button" onClick={handleLeaveMemory}>ANI BIRAK</button>
                <button className="map-button" onClick={handleViewMemories}>ANILARI GÖR</button>
            </div>

            {showWarning && (
                <div className="popup-backdrop">
                    <div className="popup-box">
                        <p>Anı bırakmak için giriş yapmalısınız.</p>
                        <div className="popup-buttons">
                            <button onClick={handleLoginRedirect}>Evet</button>
                            <button onClick={() => setShowWarning(false)}>Hayır</button>
                        </div>
                    </div>
                </div>
            )}

            {showModal && (
                <MemoryModal onClose={() => setShowModal(false)} selectedCity={selectedCity} />
            )}
        </div>
    );
};

export default MapPage;
