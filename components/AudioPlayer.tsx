'use client';
import React, { useState, useEffect, useRef } from 'react';

interface Track {
    id: string;
    title: string;
    artist: string;
    filePath: string;
}

export default function AudioPlayer() {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    
    useEffect(() => {
        fetch('/api/tracks')
            .then((res) => res.json())
            .then(setTracks);
    }, []);

    const playTrack = (track: Track) => {;
        setCurrentTrack(track);
        if (audioRef.current) {
            audioRef.current.src = track.filePath;
            audioRef.current.play();
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Audio Player</h2>
            <ul className="space-y-2">
                {tracks.map((track) => (
                    <li
                        key={track.id}
                        className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                        onClick={() => playTrack(track)}
                    >
                        {track.title}
                    </li>
                ))}
            </ul>
            {currentTrack && (
                <div className="mt-4">
                    <p>Now playing: {currentTrack.title} - {currentTrack.artist}</p>
                    <audio ref={audioRef} controls className="mt-2" />
                </div>
            )}
        </div>
    );
}