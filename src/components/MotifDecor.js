// src/components/MotifDecor.js
import React from 'react';
import './MotifDecor.css';

import hali from '../assets/hali.png';
import pamukkale from '../assets/pamukkale.png';
import dag from '../assets/dag.png';
import kapadokya from '../assets/kapadokya.png';
import kizKulesi from '../assets/kizkulesi.png';
import galata from '../assets/galata.png';

const MotifDecor = () => {
    return (
        <>
            <div className="motif-left">
                <img src={hali} alt="Halı Motifi" className="motif motif1" />
                <img src={pamukkale} alt="Pamukkale Motifi" className="motif motif2" />
                <img src={dag} alt="Dağ Motifi" className="motif motif3" />
            </div>

            <div className="motif-right">
                <img src={kapadokya} alt="Kapadokya Motifi" className="motif motif4" />
                <img src={kizKulesi} alt="Kız Kulesi Motifi" className="motif motif5" />
                <img src={galata} alt="Galata Motifi" className="motif motif6" />
            </div>
        </>
    );
};

export default MotifDecor;
