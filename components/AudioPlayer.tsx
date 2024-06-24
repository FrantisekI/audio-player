'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Play, Pause, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Track {
    id: string;
    title: string;
    artist: string;
    filePath: string;
}

export default function AudioPlayer() {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/tracks')
            .then((res) => res.json())
            .then(setTracks);
    }, []);

    useEffect(() => {
        if (currentTrack) {
            document.title = `${currentTrack.title} - ${currentTrack.artist}`;
        } else {
            document.title = 'Audio Player';
        }
    }, [currentTrack]);

    const playTrack = (track: Track) => {
        setCurrentTrack(track);
        setIsPlaying(true);
        if (audioRef.current) {
            audioRef.current.src = track.filePath;
            audioRef.current.play();
        }
    };

    const pauseTrack = () => {
        setIsPlaying(false);
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    const togglePlayPause = (track: Track) => {
        if (currentTrack?.id === track.id) {
            if (isPlaying) {
                pauseTrack();
            } else {
                setIsPlaying(true);
                audioRef.current?.play();
            }
        } else {
            playTrack(track);
        }
    };

    const showMoreInfo = (trackId: string) => {
        router.push(`/tracks/${trackId}`);
    };

    return (
        
        <div className="p-4 bg-gray-900 text-white min-h-screen">
            <h2 className="text-3xl font-bold mb-6">Audio Player</h2>
            <ul className="space-y-4">
                {tracks.map((track) => (
                    <li
                        key={track.id}
                        className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
                    >
                        <span className="text-xl">{track.title} - {track.artist}</span>
                        <div className="space-x-2">
                            <Button
                                onClick={() => togglePlayPause(track)}
                                className="w-12 h-12 flex items-center justify-center"
                            >
                                {currentTrack?.id === track.id && isPlaying ? <Pause size={24} /> : <Play size={24} />}
                            </Button>
                            <Button 
                                onClick={() => showMoreInfo(track.id)}
                                className="w-12 h-12 flex items-center justify-center"
                            >
                                <Info size={24} />
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
            {currentTrack && (
                <div className="mt-8">
                    <p className="text-2xl mb-2">Now playing: {currentTrack.title} - {currentTrack.artist}</p>
                    <audio
                        ref={audioRef}
                        controls
                        className="w-full"
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                    />
                </div>
            )}
        </div>
    );
}