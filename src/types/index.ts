// Tipos personalizados para la aplicación

export enum Platform {
  TWITCH = 'twitch',
  KICK = 'kick'
}

export interface Channel {
  name: string;
  platform: Platform;
  id: string; // Combinación única de platform:name
  isLoading?: boolean;
  hasError?: boolean;
}

export interface GridConfig {
  className: string;
  maxChannels: number;
}

export type GridLayoutType = 'grid-1' | 'grid-2' | 'grid-3' | 'grid-4' | 'grid-5' | 'grid-6' | '';

// Props interfaces
export interface SearchBarProps {
  onAddChannel: (channelName: string, platform: Platform) => boolean;
  channelCount: number;
  maxChannels: number;
}

export interface StreamChannelProps {
  channel: Channel;
  onRemove: (channelId: string) => void;
}

// Funciones de utilidad
export const createChannelId = (platform: Platform, name: string): string => {
  return `${platform}:${name}`;
};

export const parseChannelId = (channelId: string): { platform: Platform; name: string } => {
  const [platform, name] = channelId.split(':');
  return { platform: platform as Platform, name };
};

// Constantes
export const MAX_CHANNELS = 6 as const;

export const PLATFORM_COLORS = {
  [Platform.TWITCH]: '#9146ff',
  [Platform.KICK]: '#53fc18'
} as const;

export const PLATFORM_NAMES = {
  [Platform.TWITCH]: 'Twitch',
  [Platform.KICK]: 'Kick'
} as const;