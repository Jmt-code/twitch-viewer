import { useState } from 'react';
import { StreamChannelProps, Platform, PLATFORM_COLORS, PLATFORM_NAMES } from '../types';
import './StreamChannel.css';

const StreamChannel: React.FC<StreamChannelProps> = ({ channel, onRemove }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleIframeLoad = (): void => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = (): void => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleRemoveClick = (): void => {
    onRemove(channel.id);
  };

  const getEmbedUrl = (): string => {
    const hostname = window.location.hostname;
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    const parentDomain = isLocalhost ? 'localhost' : 'juanm.github.io';
    
    if (channel.platform === Platform.TWITCH) {
      return `https://player.twitch.tv/?channel=${channel.name}&parent=${parentDomain}&autoplay=false&muted=true`;
    } else if (channel.platform === Platform.KICK) {
      return `https://player.kick.com/${channel.name}?embedded=true&autoplay=false`;
    }
    return '';
  };

  return (
    <div className={`stream-channel ${channel.platform}`}>
      <div className="channel-header">
        <div className="channel-info">
          <span className="platform-badge" style={{ backgroundColor: PLATFORM_COLORS[channel.platform] }}>
            {PLATFORM_NAMES[channel.platform]}
          </span>
          <span className="channel-name">{channel.name}</span>
        </div>
        <button 
          className="remove-button"
          onClick={handleRemoveClick}
          title="Quitar canal"
          type="button"
        >
          ✕
        </button>
      </div>
      
      <div className="channel-content">
        {isLoading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Cargando {channel.name} de {PLATFORM_NAMES[channel.platform]}...</p>
          </div>
        )}
        
        {hasError && (
          <div className="error-state">
            <p>Error al cargar el canal</p>
            <p>Verifica que el nombre sea correcto en {PLATFORM_NAMES[channel.platform]}</p>
          </div>
        )}

        <iframe
          src={getEmbedUrl()}
          width="100%"
          height="100%"
          allowFullScreen
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          style={{ display: isLoading || hasError ? 'none' : 'block' }}
          title={`Canal de ${PLATFORM_NAMES[channel.platform]}: ${channel.name}`}
        />
      </div>
    </div>
  );
};

export default StreamChannel;