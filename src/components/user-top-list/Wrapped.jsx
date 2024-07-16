'use client'
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

const WrappedImage = ({ userData }) => {
    const wrapperRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const preloadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
        img.src = url;
      });
    };
  
    const generateAndDownloadImage = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Preload images
        const imagesToLoad = [
          userData.userImage,
          ...userData.topSongs.map(song => song.imageUrl)
        ];
  
        await Promise.all(imagesToLoad.map(url => 
          preloadImage(url).catch(err => {
            console.warn(err.message);
            return null; // Return null for failed images
          })
        ));
  
        const canvas = await html2canvas(wrapperRef.current, {
          width: 1080,
          height: 1920,
          scale: 2,
          useCORS: true,
          logging: false,
          allowTaint: true, // Allow cross-origin images to taint the canvas
          onclone: (clonedDoc) => {
            // Replace failed images with placeholders in the cloned document
            clonedDoc.querySelectorAll('img').forEach(img => {
              if (!img.complete || img.naturalHeight === 0) {
                img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='; // 1x1 transparent PNG
              }
            });
          },
        });
  
        const imageUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'my-wrapped.png';
        link.click();
      } catch (error) {
        console.error('Error generating image:', error);
        setError('There was an error generating your image. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div>
      <div 
        ref={wrapperRef} 
        className="w-[1080px] h-[1920px] bg-purple-900 text-white font-sans flex flex-col absolute left-[-9999px]"
      >
        {/* Main image with bubbles */}
        <div className="relative w-full h-3/5 p-8">
          {/* Main user image */}
          <div className="w-full h-full rounded-3xl overflow-hidden border-8 border-white">
            <img src={userData.userImage} alt="User" className="w-full h-full object-cover" />
          </div>
          
          {/* Bubble images */}
          {userData.topSongs.slice(0, 5).map((song, index) => (
            <div
              key={index}
              className={`absolute w-24 h-24 rounded-full overflow-hidden border-4 border-white
                         ${index === 0 ? 'top-16 left-16' :
                           index === 1 ? 'top-16 right-16' :
                           index === 2 ? 'bottom-16 left-16' :
                           index === 3 ? 'bottom-16 right-16' :
                           'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'}`}
            >
              <img src={song.imageUrl} alt={song.title} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 p-8 flex flex-col justify-between">
          {/* Top Artists */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Top Artists</h2>
            <ol className="text-xl mb-6">
              {userData.topArtists.map((artist, index) => (
                <li key={index}>{artist}</li>
              ))}
            </ol>
          </div>

          {/* Top Songs */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Top Songs</h2>
            <ol className="text-xl mb-6">
              {userData.topSongs.map((song, index) => (
                <li key={index}>{song.title}</li>
              ))}
            </ol>
          </div>

          {/* Minutes Listened and Top Genre */}
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl mb-2">Minutes Listened</h2>
              <p className="text-4xl font-bold">{userData.minutesListened}</p>
            </div>
            <div>
              <h2 className="text-2xl mb-2">Top Genre</h2>
              <p className="text-4xl font-bold">{userData.topGenre}</p>
            </div>
          </div>

          {/* Spotify logo */}
          <img src="/path_to_spotify_logo.png" alt="Spotify" className="w-24 mt-6" />
          
          {/* Spotify.com/wrapped */}
          <p className="text-lg mt-2">SPOTIFY.COM/WRAPPED</p>
        </div>
      </div>
      <button
        onClick={generateAndDownloadImage}
        disabled={isLoading}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:bg-gray-400"
      >
        {isLoading ? 'Generating...' : 'Download Your Wrapped Image'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default WrappedImage;