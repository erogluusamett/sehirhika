import React, { useState } from 'react';
import './TurkeyMapSVG.css';

const TurkeyMapSVG = ({ onCitySelect }) => {
    const [hoveredCity, setHoveredCity] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    const handleClick = (city) => {
        setSelectedCity(city);
        onCitySelect && onCitySelect(city);
    };

    return (
        <svg viewBox="0 0 1200 600" className="turkey-map-svg">
            <g>
                <path
                    d="M200,200 L210,200 L210,210 L200,210 Z"
                    className={`city-path ${
                        hoveredCity === 'İstanbul' ? 'hover' : ''
                    } ${selectedCity === 'İstanbul' ? 'selected' : ''}`}
                    onMouseEnter={() => setHoveredCity('İstanbul')}
                    onMouseLeave={() => setHoveredCity(null)}
                    onClick={() => handleClick('İstanbul')}
                />
            </g>
        </svg>
    );
};

export default TurkeyMapSVG;
