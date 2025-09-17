import { useEffect, useRef, useState } from 'react';
import { Platform, PLATFORM_NAMES } from '../types';

interface TwitchEmbedPlayerProps {
  channelName: string;
  onError?: () => void;
}

/**
 * Componente que usa la API oficial de Twitch Embed
 * Más compatible que el iframe directo
 */
const TwitchEmbedPlayer: React.FC<TwitchEmbedPlayerProps> = ({ channelName, onError }) => {
  const embedRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let embed: any = null;
    
    const loadTwitchEmbed = () => {
      // Cargar el script de Twitch Embed si no está cargado
      if (!window.Twitch) {
        const script = document.createElement('script');
        script.src = 'https://embed.twitch.tv/embed/v1.js';
        script.onload = initializeEmbed;
        script.onerror = handleError;
        document.head.appendChild(script);
      } else {
        initializeEmbed();
      }
    };

    const initializeEmbed = () => {
      if (embedRef.current && window.Twitch) {
        try {
          embed = new window.Twitch.Embed(embedRef.current, {
            width: '100%',
            height: '100%',
            channel: channelName,
            layout: 'video',
            autoplay: false,
            muted: true,
            // No incluir parent para que sea automático
          });

          embed.addEventListener(window.Twitch.Embed.VIDEO_READY, () => {
            setIsLoaded(true);
            setHasError(false);
          });

          embed.addEventListener(window.Twitch.Embed.VIDEO_PLAY, () => {
            setIsLoaded(true);
          });

        } catch (error) {
          console.error('Error initializing Twitch embed:', error);
          handleError();
        }
      }
    };

    const handleError = () => {
      setHasError(true);
      setIsLoaded(false);
      onError?.();
    };

    loadTwitchEmbed();

    return () => {
      if (embed && embed.destroy) {
        try {
          embed.destroy();
        } catch (e) {
          console.warn('Error destroying Twitch embed:', e);
        }
      }
    };
  }, [channelName, onError]);

  if (hasError) {
    return (
      <div className="embed-error">
        <p>Error al cargar {channelName} de {PLATFORM_NAMES[Platform.TWITCH]}</p>
        <button 
          onClick={() => window.open(`https://www.twitch.tv/${channelName}`, '_blank')}
          className="open-external-btn"
        >
          🔗 Abrir en Twitch
        </button>
      </div>
    );
  }

  return (
    <div className="twitch-embed-container">
      {!isLoaded && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Cargando {channelName} de Twitch...</p>
        </div>
      )}
      <div 
        ref={embedRef} 
        style={{ 
          width: '100%', 
          height: '100%',
          display: isLoaded ? 'block' : 'none'
        }} 
      />
    </div>
  );
};

// Declaración de tipos para window.Twitch
declare global {
  interface Window {
    Twitch: {
      Embed: {
        new (target: HTMLElement, options: any): any;
        VIDEO_READY: string;
        VIDEO_PLAY: string;
        OFFLINE: string;
        ONLINE: string;
      };
    };
  }
}

export default TwitchEmbedPlayer;