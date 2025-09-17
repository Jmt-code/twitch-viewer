/**
 * Componente simplificado que usa método directo de embed
 * Sin detección de bloqueo para evitar falsos positivos
 */

import { Platform, PLATFORM_NAMES } from '../types';

interface SimpleEmbedProps {
  channelName: string;
  platform: Platform;
}

const SimpleEmbed: React.FC<SimpleEmbedProps> = ({ channelName, platform }) => {
  const getEmbedUrl = (): string => {
    const hostname = window.location.hostname;
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    
    if (platform === Platform.TWITCH) {
      // Método más directo para Twitch
      const parentDomain = isLocalhost ? 'localhost' : hostname;
      return `https://player.twitch.tv/?channel=${channelName}&parent=${parentDomain}&autoplay=false&muted=true`;
    } else if (platform === Platform.KICK) {
      return `https://player.kick.com/${channelName}?embedded=true&autoplay=false`;
    }
    return '';
  };

  const handleOpenExternal = () => {
    const url = platform === Platform.TWITCH 
      ? `https://www.twitch.tv/${channelName}`
      : `https://kick.com/${channelName}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="simple-embed-container">
      <iframe
        src={getEmbedUrl()}
        width="100%"
        height="100%"
        allowFullScreen
        frameBorder="0"
        scrolling="no"
        title={`Canal de ${PLATFORM_NAMES[platform]}: ${channelName}`}
        allow="autoplay; fullscreen"
      />
      
      {/* Botón de respaldo siempre visible */}
      <div className="embed-overlay">
        <button 
          className="external-link-btn"
          onClick={handleOpenExternal}
          title={`Abrir en ${PLATFORM_NAMES[platform]}`}
        >
          🔗
        </button>
      </div>
    </div>
  );
};

export default SimpleEmbed;