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

export default function Page() {
    const handleUploadSuccess = (result: any, widget: any) => {
        console.log('Upload result:', result);
        if (result.info && result.info.createdTrack) {
            console.log('Created track:', result.info.createdTrack);
        }
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
                    clientAllowedFormats: ['mp3', 'wav', 'ogg'] // Restrict to audio formats
                }}
            >
                {({ open }) => (
                    <button  
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={() => open()}
                    >
                        Upload an Audio
                    </button>
                )}
            </CldUploadWidget>
        </div>
    );
}