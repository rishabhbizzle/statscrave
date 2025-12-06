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

    const captureAndShare = useCallback(async (filename = 'share.png') => {
        if (!elementRef.current) return;

        try {
            const canvas = await html2canvas(elementRef.current, {
                scale: 1.5,
                backgroundColor: null,
                useCORS: true,
                allowTaint: true,
            });

            const blob = await new Promise((resolve) => {
                canvas.toBlob(resolve, 'image/png', 1.0);
            });

            if (!blob) throw new Error('Failed to create image');

            // On mobile, try native share if available
            if (isMobile() && navigator.share && navigator.canShare) {
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
