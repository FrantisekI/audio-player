"use client";
import { CldImage } from 'next-cloudinary';

// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
export default function Page() {
    return (
        <CldImage
            src="https://res.cloudinary.com/dncg917k4/image/upload/v1718959863/cld-sample-4.jpg" // Use this sample image or upload your own via the Media Explorer
            width="500" // Transform the image: auto-crop to square aspect_ratio
            height="500"
            crop={{
                type: 'auto',
                source: true
            }} alt={''}        />
    );
}

