"use client";
import { useCallback, useRef } from 'react';
import html2canvas from 'html2canvas';

/**
 * Hook to capture a DOM element as an image and share/download it
 */
export const useShareImage = () => {
    const elementRef = useRef(null);

    const isMobile = () => {
        if (typeof window === 'undefined') return false;
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    // Preload images to ensure they're fully loaded before capture
    const preloadImages = async (element) => {
        const images = element.querySelectorAll('img');
        const promises = Array.from(images).map((img) => {
            return new Promise((resolve) => {
                if (img.complete) {
                    resolve();
                } else {
                    img.onload = resolve;
                    img.onerror = resolve; // Resolve anyway to not block
                }
            });
        });
        await Promise.all(promises);
    };

    const captureAndShare = useCallback(async (filename = 'share.png') => {
        if (!elementRef.current) return;

        const mobile = isMobile();

        try {
            // Preload all images first
            await preloadImages(elementRef.current);

            // Use lower scale on mobile to avoid canvas memory limits
            const scale = mobile ? 1 : 1.5;

            const canvas = await html2canvas(elementRef.current, {
                scale,
                backgroundColor: '#000000', // Fallback background color
                useCORS: true,
                allowTaint: false, // Set to false for stricter CORS handling
                logging: false,
                imageTimeout: 15000, // Give images more time to load
                removeContainer: true,
                // Ignore problematic elements on mobile
                ignoreElements: (element) => {
                    // Ignore elements that might cause issues
                    return element.tagName === 'IFRAME';
                },
            });

            // Check if canvas was created successfully
            if (!canvas || canvas.width === 0 || canvas.height === 0) {
                throw new Error('Canvas creation failed - invalid dimensions');
            }

            // Try toBlob first, with fallback to toDataURL
            let blob = await new Promise((resolve) => {
                canvas.toBlob(resolve, 'image/png', 1.0);
            });

            // Fallback: if toBlob fails, try toDataURL approach
            if (!blob) {
                console.warn('toBlob failed, trying toDataURL fallback');
                try {
                    const dataUrl = canvas.toDataURL('image/png');
                    const res = await fetch(dataUrl);
                    blob = await res.blob();
                } catch (fallbackError) {
                    console.error('toDataURL fallback also failed:', fallbackError);
                    throw new Error('Failed to create image - canvas may be tainted by cross-origin images');
                }
            }

            if (!blob) throw new Error('Failed to create image');

            // On mobile, try native share if available
            if (mobile && navigator.share && navigator.canShare) {
                const file = new File([blob], filename, { type: 'image/png' });
                const shareData = { files: [file] };

                if (navigator.canShare(shareData)) {
                    await navigator.share(shareData);
                    return { shared: true };
                }
            }

            // Fallback: download the image
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            return { downloaded: true };
        } catch (error) {
            console.error('Share/download error:', error);
            throw error;
        }
    }, []);

    return { elementRef, captureAndShare };
};

export default useShareImage;
