import React from 'react'
import { useState } from 'react';
import './Music.css';

export default function Music() {
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="music-player">
            <div className={`play-button ${isPlaying ? 'playing' : ''}`} onClick={togglePlay}>
                <div className="play-icon"></div>
            </div>
            <div className="song-info">
                <div className="song-title">Song Title</div>
                <div className="song-artist">Artist</div>
            </div>
        </div>
    );
}
