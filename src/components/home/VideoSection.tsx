import React, { useState, useRef } from 'react';
import climax from '../../assets/videos/climax.mp4';

export const VideoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Vive la Experiencia
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="relative pt-[56.25%] rounded-lg overflow-hidden shadow-2xl">
            <video
              ref={videoRef}
              className="absolute top-0 left-0 w-full h-full object-cover"
              autoPlay
              loop
              muted={isMuted}
              playsInline
            >
              <source src={climax} type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
            {/* Controles personalizados */}
            <div className="absolute bottom-4 left-4 flex gap-4">
              <button
                onClick={togglePlayPause}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                {isPlaying ? 'Pausa' : 'Reproducir'}
              </button>
              <button
                onClick={toggleMute}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                {isMuted ? 'Activar Sonido' : 'Silenciar'}
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Ambiente</h3>
              <p className="text-gray-400 text-sm">
                Disfruta de nuestro ambiente único y exclusivo
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Música</h3>
              <p className="text-gray-400 text-sm">
                Los mejores DJs y música en vivo
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Shows</h3>
              <p className="text-gray-400 text-sm">
                Espectáculos y eventos especiales
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
