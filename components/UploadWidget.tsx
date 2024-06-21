"use client";
import { CldUploadWidget } from 'next-cloudinary';

export default function Page() {
    return (
        <CldUploadWidget signatureEndpoint="/api/sign-file">
            {({ open }) => {
                return (
                    <button  
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    onClick={() => open()}>
                        Upload an Image
                    </button>
                );
            }}
        </CldUploadWidget>
    );
}
