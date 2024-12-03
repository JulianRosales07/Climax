import React from 'react';
import { Music, MessageCircle } from 'lucide-react';

export const SongRequestPage: React.FC = () => {
  const whatsappNumber = '573153967964'; // Format: country code + number
  const message = encodeURIComponent('¡Hola! Me gustaría solicitar una canción 🎵');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Music className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">
            Solicita tu Canción Favorita
          </h1>
          <p className="text-gray-400 mb-8">
            ¿Tienes una canción especial en mente? ¡Háznoslo saber! Nuestro DJ estará encantado de ponerla para ti.
          </p>

          <div className="bg-gray-800 p-6 rounded-lg shadow-xl mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">
              ¿Cómo solicitar una canción?
            </h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <p className="text-gray-300">
                  Haz clic en el botón de WhatsApp abajo
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <p className="text-gray-300">
                  Envíanos el nombre de la canción y el artista
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <p className="text-gray-300">
                  ¡Espera a que suene tu canción y disfruta!
                </p>
              </div>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
            <span>Solicitar por WhatsApp</span>
          </a>

          <div className="mt-8 p-4 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-400">
              Horario para solicitudes: Martes a Jueves 6:00 PM - 1:00 AM | Viernes y Sábado 6:00 PM - 2:00 AM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};