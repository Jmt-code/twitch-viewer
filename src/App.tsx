import { useState } from 'react';
import StreamChannel from './components/StreamChannel';
import ChannelModal from './components/ChannelModal';
import FloatingButton from './components/FloatingButton';
import { GridLayoutType, MAX_CHANNELS, Channel, Platform, createChannelId } from './types';
import './App.css';

const App: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addChannel = (channelName: string, platform: Platform): boolean => {
    const channelId = createChannelId(platform, channelName);
    
    // Verificar si el canal ya existe
    if (channels.some(channel => channel.id === channelId)) {
      return false; // Canal ya existe
    }
    
    // Verificar límite máximo
    if (channels.length >= MAX_CHANNELS) {
      return false; // Límite alcanzado
    }
    
    const newChannel: Channel = {
      name: channelName,
      platform,
      id: channelId
    };
    
    setChannels(prev => [...prev, newChannel]);
    return true; // Canal añadido exitosamente
  };

  const removeChannel = (channelId: string): void => {
    setChannels(prev => prev.filter(channel => channel.id !== channelId));
  };

  const getGridClass = (): GridLayoutType => {
    const count = channels.length;
    if (count === 1) return 'grid-1';
    if (count === 2) return 'grid-2';
    if (count === 3) return 'grid-3';
    if (count === 4) return 'grid-4';
    if (count === 5) return 'grid-5';
    if (count === 6) return 'grid-6';
    return '';
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>
          <span className="twitch-purple">Multi</span> Stream Viewer
        </h1>
        <p>Visualiza hasta {MAX_CHANNELS} canales de Twitch y Kick simultáneamente</p>
      </header>

      {channels.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📺</div>
          <h3>No hay canales agregados</h3>
          <p>Haz clic en el botón + para añadir canales de Twitch o Kick</p>
        </div>
      ) : (
        <div className={`channels-grid ${getGridClass()}`}>
          {channels.map((channel) => (
            <StreamChannel
              key={channel.id}
              channel={channel}
              onRemove={removeChannel}
            />
          ))}
        </div>
      )}

      <FloatingButton
        channelCount={channels.length}
        maxChannels={MAX_CHANNELS}
        onClick={() => setIsModalOpen(true)}
      />

      <ChannelModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        channels={channels}
        onAddChannel={addChannel}
        onRemoveChannel={removeChannel}
        maxChannels={MAX_CHANNELS}
      />
    </div>
  );
};

export default App;