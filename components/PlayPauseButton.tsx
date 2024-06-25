'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Track {
    id: string;
    title: string;
    artist: string | null;
    filePath: string;
}

interface PlayPauseProps {
    track: Track;
    size?: number;
}

export default function PlayPauseComponent({ track, size = 24 }: PlayPauseProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const handleStorageChange = () => {
            const storedTrack = localStorage.getItem('currentTrack');
            if (storedTrack) {
                const currentTrack = JSON.parse(storedTrack);
                setIsPlaying(currentTrack.id === track.id);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        handleStorageChange(); // Check initial state

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [track.id]);

    useEffect(() => {
        if (track) {
            document.title = track.title;
        } else {
            document.title = 'Audio Player';
        }
    }, [track]);

    const togglePlayPause = () => {
        if (isPlaying) {
            localStorage.removeItem('currentTrack');
            window.dispatchEvent(new CustomEvent('audio-control', { detail: { action: 'pause' } }));
        } else {
            localStorage.setItem('currentTrack', JSON.stringify(track));
            window.dispatchEvent(new CustomEvent('audio-control', { detail: { action: 'play', track } }));
        }
        setIsPlaying(!isPlaying);
        window.dispatchEvent(new Event('storage'));
    };

    return (
        <Button
            onClick={togglePlayPause}
            className="w-12 h-12 flex items-center justify-center"
        >
            {isPlaying ? <Pause size={size} /> : <Play size={size} />}
        </Button>
    );
}