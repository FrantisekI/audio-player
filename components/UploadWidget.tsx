/*"use client";
import { CldUploadWidget } from 'next-cloudinary';

export default function Page() {
    return (
        <CldUploadWidget 
        signatureEndpoint="/api/sign-file"
        options={{ sources: ['local', 'url', 'google_drive', 'dropbox'] }}
        
        >
            {({ widget, open }) => {
                return (
                    <button  
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    onClick={() => open()}>
                        Upload an Audio
                    </button>
                );
            }}
        </CldUploadWidget>
    );
}*/
"use client";
import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';

export default function Page() {
    const [isUploading, setIsUploading] = useState(false);

    const handleUploadSuccess = async (result: any, widget: any) => {
        setIsUploading(true);
        console.log('Upload result:', result);
        
        if (result.info) {
            const { public_id, secure_url, original_filename } = result.info;
            
            try {
                const response = await fetch('/api/create-track', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        publicId: public_id,
                        url: secure_url,
                        title: original_filename || 'Unknown Track',
                        // You can add more metadata here if available
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to create track');
                }

                const data = await response.json();
                console.log('Created track:', data.track);
                console.log('Response:', result.info.createdTrack);
            } catch (error) {
                console.error('Error creating track:', error);
            }
        }
        
        setIsUploading(false);
        widget.close();
    };

    return (
        <div>
            <CldUploadWidget 
                signatureEndpoint="/api/sign-file"
                onSuccess={handleUploadSuccess}
                options={{ 
                    sources: ['local', 'url', 'google_drive', 'dropbox'],
                    resourceType: 'video', // For audio files
                    clientAllowedFormats: ['mp3', 'wav', 'ogg'], // Restrict to audio formats
                    
                }}
            >
                {({ open }) => (
                    <button  
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={() => open()}
                        disabled={isUploading}
                    >
                        {isUploading ? 'Uploading...' : 'Upload an Audio'}
                    </button>
                )}
            </CldUploadWidget>
        </div>
    );
}