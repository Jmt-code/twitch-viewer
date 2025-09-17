/**
 * Utilidades para manejar problemas de Content Security Policy y embedding
 */

export interface EmbedInfo {
  url: string;
  parentDomain: string;
  isLocalhost: boolean;
}

/**
 * Obtiene información sobre el embed basado en el entorno actual
 */
export const getEmbedInfo = (): EmbedInfo => {
  const hostname = window.location.hostname;
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '';
  
  let parentDomain: string;
  
  if (isLocalhost) {
    parentDomain = 'localhost';
  } else {
    parentDomain = hostname;
  }
  
  return {
    url: window.location.href,
    parentDomain,
    isLocalhost
  };
};

/**
 * Genera URL de embed para Twitch con configuración optimizada
 */
export const getTwitchEmbedUrl = (channelName: string): string => {
  const { parentDomain } = getEmbedInfo();
  
  const embedUrl = new URL('https://player.twitch.tv/');
  embedUrl.searchParams.set('channel', channelName);
  embedUrl.searchParams.set('parent', parentDomain);
  embedUrl.searchParams.set('autoplay', 'false');
  embedUrl.searchParams.set('muted', 'true');
  embedUrl.searchParams.set('allowfullscreen', 'true');
  
  return embedUrl.toString();
};

/**
 * Genera URL alternativa que abre Twitch en nueva pestaña
 */
export const getTwitchAlternativeUrl = (channelName: string): string => {
  return `https://www.twitch.tv/${channelName}`;
};

/**
 * Genera URL de embed para Kick
 */
export const getKickEmbedUrl = (channelName: string): string => {
  return `https://player.kick.com/${channelName}?embedded=true&autoplay=false`;
};

/**
 * Genera URL alternativa que abre Kick en nueva pestaña
 */
export const getKickAlternativeUrl = (channelName: string): string => {
  return `https://kick.com/${channelName}`;
};

/**
 * Detecta si un iframe está siendo bloqueado por CSP
 */
export const detectIframeBlock = (iframe: HTMLIFrameElement): Promise<boolean> => {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve(true); // Asumimos que está bloqueado si tarda mucho
    }, 5000);
    
    const onLoad = () => {
      clearTimeout(timeout);
      iframe.removeEventListener('load', onLoad);
      iframe.removeEventListener('error', onError);
      
      try {
        // Intentar acceder al contenido del iframe
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!doc) {
          resolve(true); // Bloqueado
        } else {
          resolve(false); // No bloqueado
        }
      } catch (e) {
        resolve(true); // Bloqueado por CSP
      }
    };
    
    const onError = () => {
      clearTimeout(timeout);
      iframe.removeEventListener('load', onLoad);
      iframe.removeEventListener('error', onError);
      resolve(true); // Error = bloqueado
    };
    
    iframe.addEventListener('load', onLoad);
    iframe.addEventListener('error', onError);
  });
};