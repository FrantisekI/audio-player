'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Music } from 'lucide-react';
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
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const handleStorageChange = () => {
            const storedTrack = localStorage.getItem('currentTrack');
            if (storedTrack) {
                //const parsedTrack = JSON.parse(storedTrack);
                setCurrentTrack(JSON.parse(storedTrack));
            } else {
                setCurrentTrack(null);
            }
            console.log('handleStorageChange', storedTrack);
        };

        const handleCustomEvent = (event: CustomEvent) => {
            const { action, track, resumePlayback, time } = event.detail;
            if (action === 'play' && resumePlayback) {
                audioRef.current?.play();
                console.log('play ' + audioRef.current);
                if (track.id === currentTrack?.id && audioRef.current) {
                    audioRef.current.currentTime = currentTime;
                }
                
                /*if (track.id === currentTrack?.id && resumePlayback && audioRef.current) {
                    console.log('resume playback');
                    audioRef.current.currentTime = currentTime;
                    audioRef.current.play();
                } else {
                    const storedTrack = localStorage.getItem('currentTrack');
                    console.log('storedTrack', storedTrack);
                    if (storedTrack) {
                        
                        const parsedTrack = JSON.parse(storedTrack);
                        console.log('parsedTrack', parsedTrack);
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
                    }}*/
            } else if (action === 'pause') {
                if (audioRef.current){
                    console.log('pause' + audioRef.current);
                    audioRef.current.pause();
                    setCurrentTime(audioRef.current.currentTime);
                }
            } else if (event.detail.action === 'playFrom') {
                if (event.detail.trackId === currentTrack?.id && audioRef.current) {
                    audioRef.current.currentTime = time;
                    audioRef.current.play();
                    console.log('playFrom');
                } else {
                    const storedTrack = localStorage.getItem('currentTrack');
                    // Load the track if it's not the current one
                    console.log('load track');
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
            setCurrentTime(audioRef.current.currentTime);
            //console.log('updateProgress', currentTime);
        }
    };


    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
            <div className="flex items-center justify-between mb-2">
                <div className="text-white">
                    {currentTrack ? (
                        <>
                            <p className="font-bold">{currentTrack.title}</p>
                            <p className="text-sm">{currentTrack.artist}</p>
                        </>
                    ) : (
                        <p className="font-bold">No track selected</p>
                    )}
                </div>
                {currentTrack ? (
                    <PlayPauseComponent track={currentTrack} size={20} />
                ) : (
                    <Music size={20} className="text-gray-500" />
                )}
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2.5">
                <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            {currentTrack && (
                <audio
                    ref={audioRef}
                    onTimeUpdate={updateProgress}
                    onEnded={() => {
                        setCurrentTime(0);
                        if (currentTrack) {
                            localStorage.setItem('currentTrack', JSON.stringify({ ...currentTrack, isPlaying: false }));
                            window.dispatchEvent(new Event('storage'));
                        }
                    }}
                />
            )}
        </div>
    );
}
