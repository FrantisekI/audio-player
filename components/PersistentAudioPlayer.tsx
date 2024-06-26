'use client';

import React, { useState, useEffect, useRef } from 'react';
import PlayPauseComponent from '@/components/PlayPauseButton';

interface Track {
    id: string;
    title: string;
    artist: string | null;
    filePath: string;
}

export default function PersistentAudioPlayer() {
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    
    const [progress, setProgress] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const handleStorageChange = () => {
            const storedTrack = localStorage.getItem('currentTrack');
            if (storedTrack) {
                //const parsedTrack = JSON.parse(storedTrack);
                setCurrentTrack(JSON.parse(storedTrack));
            } else {
                setCurrentTrack(null);
            }
        };

        const handleCustomEvent = (event: CustomEvent) => {
            if (event.detail.action === 'play') {
                console.log('play' + audioRef.current);
                /*if (audioRef.current){
                    audioRef.current.play();
                }else{
                    console.log('audioRef.current is null');
                }*/
                audioRef.current?.play();
            } else if (event.detail.action === 'pause') {
                console.log('pause' + audioRef.current);
                audioRef.current?.pause();
            } else if (event.detail.action === 'playFrom') {
                if (event.detail.trackId === currentTrack?.id && audioRef.current) {
                    audioRef.current.currentTime = event.detail.time;
                    audioRef.current.play();
                    console.log('playFrom');
                } else {
                    // Load the track if it's not the current one
                    console.log('load track');
                    const storedTrack = localStorage.getItem('currentTrack');
                    if (storedTrack) {
                        const parsedTrack = JSON.parse(storedTrack);
                        if (parsedTrack.id === event.detail.trackId) {
                            setCurrentTrack(parsedTrack);
                            // Set the time after the audio is loaded
                            audioRef.current?.addEventListener('loadedmetadata', () => {
                                if (audioRef.current) {
                                    audioRef.current.currentTime = event.detail.time;
                                    audioRef.current.play();
                                }
                            }, { once: true });
                        }
                    }
                }
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
            audioRef.current.play();
        }
    }, [currentTrack]);

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
                
                <PlayPauseComponent track={currentTrack} size={20} />
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2.5">
                <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <audio
                ref={audioRef}
                /*onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}*/
                onTimeUpdate={updateProgress}
            />
        </div>
    );
}