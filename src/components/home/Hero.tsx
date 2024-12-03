import React from "react";
import { Wine, Clock, MapPin, Phone, ChevronDown } from "lucide-react";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";

export const Hero: React.FC = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.querySelector("#features");
    featuresSection?.scrollIntoView({ behavior: "smooth" });
  };

  const particlesInit = async (main: any) => {
    // Cargar funcionalidades y plugins adicionales de tsparticles
    await loadFull(main);
  };

  return (
    <div className="relative min-h-screen">
      {/* Partículas animadas de fondo */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: "transparent",
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: ["#ffffff", "#00aaff", "#ff77aa"],
            },
            links: {
              enable: false,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 0.5,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 60,
            },
            opacity: {
              value: 0.8,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      {/* Video de fondo */}
      <div className="absolute inset-0 overflow-hidden z-10">
        <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover z-0"
        >
          <source
            src="https://player.vimeo.com/external/492834625.sd.mp4?s=23ac4f0d5c6100dc3e94ffa56c63096d3b9b3e00&profile_id=164&oauth2_token_id=57447761"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Contenido principal */}
      <div className="relative z-30 container mx-auto px-4 py-20 min-h-screen flex flex-col justify-center items-center text-white text-center">
        <div className="animate-fadeIn">
          <Wine size={64} className="mx-auto mb-6 animate-bounce" />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            CLIMAX
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Tu destino para una experiencia única en bebidas y cócteles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full max-w-4xl mx-auto animate-slideIn">
          <div className="bg-black bg-opacity-50 p-6 rounded-lg backdrop-blur-sm hover:bg-opacity-70 transition-all duration-300 transform hover:-translate-y-1">
            <Clock className="mx-auto mb-4 text-blue-400" size={32} />
            <h3 className="text-lg font-semibold mb-2">Horario</h3>
            <p>Martes - Jueves</p>
            <p>6:00 PM - 1:00 AM</p>
            <p>Viernes - Sábado</p>
            <p>6:00 PM - 2:00 AM</p>
          </div>

          <div className="bg-black bg-opacity-50 p-6 rounded-lg backdrop-blur-sm hover:bg-opacity-70 transition-all duration-300 transform hover:-translate-y-1">
            <MapPin className="mx-auto mb-4 text-blue-400" size={32} />
            <h3 className="text-lg font-semibold mb-2">Ubicación</h3>
            <p>Cra 36 # 18 - 30, Palermo.</p>
            <p>Pasto, Nariño</p>
          </div>

          <div className="bg-black bg-opacity-50 p-6 rounded-lg backdrop-blur-sm hover:bg-opacity-70 transition-all duration-300 transform hover:-translate-y-1">
            <Phone className="mx-auto mb-4 text-blue-400" size={32} />
            <h3 className="text-lg font-semibold mb-2">Reservas</h3>
            <p>+57 315 396 7964</p>
            <p>+57 318 385 0408</p>
          </div>
        </div>

        <button
          onClick={scrollToFeatures}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </div>
  );
};
