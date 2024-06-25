'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Track {
    id: string;
    title: string;
    artist: string;
    filePath: string;
}

export default function PersistentAudioPlayer() {
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const handleStorageChange = () => {
            const storedTrack = localStorage.getItem('currentTrack');
            if (storedTrack) {
                const parsedTrack = JSON.parse(storedTrack);
                setCurrentTrack(parsedTrack);
                setIsPlaying(true);
            }
        };

        const handleCustomEvent = (event: CustomEvent) => {
            if (event.detail.action === 'play') {
                audioRef.current?.play();
                setIsPlaying(true);
            } else if (event.detail.action === 'pause') {
                audioRef.current?.pause();
                setIsPlaying(false);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('audio-control' as any, handleCustomEvent);
        handleStorageChange(); // Check storage on initial load

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('audio-control' as any, handleCustomEvent);
        };
    }, []);

    useEffect(() => {
        if (currentTrack && audioRef.current) {
            audioRef.current.src = currentTrack.filePath;
            if (isPlaying) {
                audioRef.current.play();
            }
        }
    }, [currentTrack]);

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const updateProgress = () => {
        if (audioRef.current) {
            const value = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(value);
        }
    };

    if (!currentTrack) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
            <div className="flex items-center justify-between mb-2">
                <div className="text-white">
                    <p className="font-bold">{currentTrack.title}</p>
                    <p className="text-sm">{currentTrack.artist}</p>
                </div>
                <Button
                    onClick={togglePlayPause}
                    className="w-10 h-10 flex items-center justify-center"
                >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </Button>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2.5">
                <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <audio
                ref={audioRef}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={updateProgress}
            />
        </div>
    );
}