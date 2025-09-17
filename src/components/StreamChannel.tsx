import { useState, useRef, useEffect } from 'react';
import { StreamChannelProps, Platform, PLATFORM_COLORS, PLATFORM_NAMES } from '../types';
import { 
  getTwitchEmbedUrl, 
  getTwitchAlternativeUrl, 
  getKickEmbedUrl, 
  getKickAlternativeUrl,
  detectIframeBlock 
} from '../utils/embedUtils';
import './StreamChannel.css';

const StreamChannel: React.FC<StreamChannelProps> = ({ channel, onRemove }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleIframeLoad = (): void => {
    setIsLoading(false);
    setHasError(false);
    
    // Detectar si el iframe está bloqueado
    if (iframeRef.current) {
      detectIframeBlock(iframeRef.current).then((blocked) => {
        setIsBlocked(blocked);
      });
    }
  };

  const handleIframeError = (): void => {
    setIsLoading(false);
    setHasError(true);
    setIsBlocked(true);
  };

  const handleRemoveClick = (): void => {
    onRemove(channel.id);
  };

  const getEmbedUrl = (): string => {
    if (channel.platform === Platform.TWITCH) {
      return getTwitchEmbedUrl(channel.name);
    } else if (channel.platform === Platform.KICK) {
      return getKickEmbedUrl(channel.name);
    }
    return '';
  };

  const getAlternativeUrl = (): string => {
    if (channel.platform === Platform.TWITCH) {
      return getTwitchAlternativeUrl(channel.name);
    } else if (channel.platform === Platform.KICK) {
      return getKickAlternativeUrl(channel.name);
    }
    return '';
  };

  const handleOpenInNewTab = (): void => {
    window.open(getAlternativeUrl(), '_blank', 'noopener,noreferrer');
  };

  // Detectar bloqueo después de un tiempo si no se carga
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading && iframeRef.current) {
        detectIframeBlock(iframeRef.current).then((blocked) => {
          if (blocked) {
            setIsLoading(false);
            setIsBlocked(true);
          }
        });
      }
    }, 8000); // 8 segundos timeout

    return () => clearTimeout(timer);
  }, [isLoading]);

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
        {isLoading && !isBlocked && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Cargando {channel.name} de {PLATFORM_NAMES[channel.platform]}...</p>
          </div>
        )}
        
        {(hasError || isBlocked) && (
          <div className="error-state">
            <div className="error-icon">🚫</div>
            {isBlocked ? (
              <>
                <h4>Contenido bloqueado</h4>
                <p>GitHub Pages no permite embebir algunos contenidos de {PLATFORM_NAMES[channel.platform]}</p>
                <button className="open-external-btn" onClick={handleOpenInNewTab}>
                  🔗 Abrir en {PLATFORM_NAMES[channel.platform]}
                </button>
              </>
            ) : (
              <>
                <h4>Error al cargar el canal</h4>
                <p>Verifica que el nombre sea correcto en {PLATFORM_NAMES[channel.platform]}</p>
                <button className="open-external-btn" onClick={handleOpenInNewTab}>
                  🔗 Intentar en {PLATFORM_NAMES[channel.platform]}
                </button>
              </>
            )}
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={getEmbedUrl()}
          width="100%"
          height="100%"
          allowFullScreen
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          style={{ display: isLoading || hasError || isBlocked ? 'none' : 'block' }}
          title={`Canal de ${PLATFORM_NAMES[channel.platform]}: ${channel.name}`}
        />
      </div>
    </div>
  );
};

export default StreamChannel;