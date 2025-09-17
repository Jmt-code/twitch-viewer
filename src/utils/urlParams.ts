import { Channel, Platform } from '../types';

export interface URLChannels {
  twitch: string[];
  kick: string[];
}

/**
 * Extrae los canales de los parámetros de la URL
 * Formato esperado: ?t=canal1,canal2&k=canal3,canal4
 */
export const getChannelsFromURL = (): URLChannels => {
  const urlParams = new URLSearchParams(window.location.search);
  
  const twitchParam = urlParams.get('t');
  const kickParam = urlParams.get('k');
  
  const twitchChannels = twitchParam 
    ? twitchParam.split(',').map(channel => channel.trim()).filter(channel => channel.length > 0)
    : [];
  
  const kickChannels = kickParam 
    ? kickParam.split(',').map(channel => channel.trim()).filter(channel => channel.length > 0)
    : [];
  
  return {
    twitch: twitchChannels,
    kick: kickChannels
  };
};

/**
 * Convierte los canales de URL a objetos Channel
 */
export const convertURLChannelsToChannels = (urlChannels: URLChannels): Channel[] => {
  const channels: Channel[] = [];
  
  // Añadir canales de Twitch
  urlChannels.twitch.forEach(channelName => {
    if (channelName) {
      channels.push({
        name: channelName,
        platform: Platform.TWITCH,
        id: `twitch-${channelName}`
      });
    }
  });
  
  // Añadir canales de Kick
  urlChannels.kick.forEach(channelName => {
    if (channelName) {
      channels.push({
        name: channelName,
        platform: Platform.KICK,
        id: `kick-${channelName}`
      });
    }
  });
  
  return channels;
};

/**
 * Genera una URL con los parámetros de canales actuales
 */
export const generateShareableURL = (channels: Channel[]): string => {
  const baseURL = window.location.origin + window.location.pathname;
  
  const twitchChannels = channels
    .filter(channel => channel.platform === Platform.TWITCH)
    .map(channel => channel.name);
  
  const kickChannels = channels
    .filter(channel => channel.platform === Platform.KICK)
    .map(channel => channel.name);
  
  const params = new URLSearchParams();
  
  if (twitchChannels.length > 0) {
    params.set('t', twitchChannels.join(','));
  }
  
  if (kickChannels.length > 0) {
    params.set('k', kickChannels.join(','));
  }
  
  const queryString = params.toString();
  return queryString ? `${baseURL}?${queryString}` : baseURL;
};

/**
 * Valida que el número total de canales no exceda el máximo permitido
 */
export const validateURLChannels = (urlChannels: URLChannels, maxChannels: number): boolean => {
  const totalChannels = urlChannels.twitch.length + urlChannels.kick.length;
  return totalChannels <= maxChannels;
};

/**
 * Actualiza la URL del navegador con los canales actuales
 */
export const updateURLWithChannels = (channels: Channel[]): void => {
  const url = generateShareableURL(channels);
  const urlObj = new URL(url);
  
  // Usar replaceState para no añadir una entrada al historial
  window.history.replaceState({}, '', urlObj.search ? urlObj.href : urlObj.pathname);
};