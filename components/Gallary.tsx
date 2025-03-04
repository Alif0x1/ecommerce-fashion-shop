/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Image as ImageType } from '@/types';

interface GalleryProps {
    images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Card className="w-full max-w-2xl mx-auto overflow-hidden rounded-lg"> {/* Card wraps everything */}
            <div className="relative w-full" style={{ paddingBottom: isMobile ? '100%' : '125%' }}>
                {isMobile ? (
                    <div className="absolute inset-0">
                        <img
                            src={images[selectedImage]?.url || "/placeholder.svg"}
                            alt={`Product image ${selectedImage + 1}`}
                            className="rounded-md object-cover w-full h-full"
                        />
                    </div>
                ) : (
                    <img
                        src={images[selectedImage]?.url || "/placeholder.svg"}
                        alt={`Product image ${selectedImage + 1}`}
                        className="rounded-md object-cover absolute inset-0 w-full h-full"
                    />
                )}
            </div>

            <div className="flex gap-2 mt-4 overflow-x-auto pb-2 px-4 sm:gap-1 md:gap-2"> {/* Added px-4 for padding */}
                {images.map((image, index) => (
                    <button
                        key={image.id}
                        onClick={() => setSelectedImage(index)}
                        className={cn(
                            "relative w-20 aspect-[4/5] m-3 rounded-lg overflow-hidden flex-shrink-0", // Removed m-3 from here
                            "ring-2 ring-offset-2 ring-offset-background transition-all",
                            selectedImage === index ? "ring-primary" : "ring-transparent hover:ring-muted",
                            "sm:w-16 sm:h-20 md:w-20 md:h-24"
                        )}
                    >
                        <img
                            src={image.url || "/placeholder.svg"}
                            alt={`Product thumbnail ${index + 1}`}
                            className="object-cover w-full h-full"
                        />
                    </button>
                ))}
            </div>
        </Card>
    );
};

export default Gallery;