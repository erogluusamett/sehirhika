// CityMemoriesPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CityMemoriesPage = ({ selectedCity }) => {
    const [memories, setMemories] = useState([]);

    const cityIdMap = {
        "Adana": 1,
        "Adıyaman": 2,
        // ... 81 il
        "Malatya": 44
    };

    useEffect(() => {
        const fetchMemories = async () => {
            const cityId = cityIdMap[selectedCity];
            if (!cityId) return;

            try {
                const res = await axios.get(`http://localhost:8585/api/stories/by-city/${cityId}`);
                setMemories(res.data);
            } catch (err) {
                console.error("Anılar getirilemedi:", err);
            }
        };

        fetchMemories();
    }, [selectedCity]);

    return (
        <div>
            <h2>{selectedCity} için Anılar</h2>
            {memories.map(memory => (
                <div key={memory.id} className="memory-card">
                    <h3>{memory.title}</h3>
                    <p>{memory.content}</p>
                    <p><strong>Yazar:</strong> {memory.authorName}</p>
                    {/* Görsel varsa göster */}
                    {memory.imageUrl && <img src={memory.imageUrl} alt={memory.title} />}
                </div>
            ))}
        </div>
    );
};

export default CityMemoriesPage;
