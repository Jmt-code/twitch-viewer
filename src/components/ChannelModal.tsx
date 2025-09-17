import { useState, FormEvent, ChangeEvent } from 'react';
import { Platform, Channel, PLATFORM_COLORS, PLATFORM_NAMES } from '../types';
import './ChannelModal.css';

interface ChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  channels: Channel[];
  onAddChannel: (channelName: string, platform: Platform) => boolean;
  onRemoveChannel: (channelId: string) => void;
  maxChannels: number;
}

const ChannelModal: React.FC<ChannelModalProps> = ({
  isOpen,
  onClose,
  channels,
  onAddChannel,
  onRemoveChannel,
  maxChannels
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(Platform.TWITCH);
  const [isError, setIsError] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addChannel();
  };

  const addChannel = (): void => {
    const channelName = inputValue.trim().toLowerCase();
    
    if (!channelName) {
      setIsError(true);
      return;
    }
    
    if (channels.length >= maxChannels) {
      alert(`Máximo ${maxChannels} canales permitidos`);
      return;
    }
    
    const success = onAddChannel(channelName, selectedPlatform);
    if (success) {
      setInputValue('');
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
    if (isError && e.target.value.trim()) {
      setIsError(false);
    }
  };

  const handlePlatformToggle = (platform: Platform): void => {
    setSelectedPlatform(platform);
  };

  const handleRemoveChannel = (channelId: string): void => {
    onRemoveChannel(channelId);
  };

  const handleOverlayClick = (e: React.MouseEvent): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const isAtMaxCapacity = channels.length >= maxChannels;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Gestionar Canales</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          {/* Lista de canales actuales */}
          <div className="current-channels">
            <h3>Canales Actuales ({channels.length}/{maxChannels})</h3>
            {channels.length === 0 ? (
              <p className="no-channels">No hay canales agregados</p>
            ) : (
              <div className="channels-list">
                {channels.map((channel) => (
                  <div key={channel.id} className={`channel-item ${channel.platform}`}>
                    <div className="channel-info">
                      <span 
                        className="platform-indicator"
                        style={{ backgroundColor: PLATFORM_COLORS[channel.platform] }}
                      >
                        {channel.platform === Platform.TWITCH ? 'T' : 'K'}
                      </span>
                      <span className="channel-name">{channel.name}</span>
                    </div>
                    <button 
                      className="remove-channel-btn"
                      onClick={() => handleRemoveChannel(channel.id)}
                      title="Eliminar canal"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Formulario para añadir nuevo canal */}
          <div className="add-channel-section">
            <h3>Añadir Nuevo Canal</h3>
            
            {/* Toggle de plataformas */}
            <div className="platform-toggle">
              <button
                type="button"
                className={`platform-btn twitch ${selectedPlatform === Platform.TWITCH ? 'active' : ''}`}
                onClick={() => handlePlatformToggle(Platform.TWITCH)}
              >
                T
              </button>
              <button
                type="button"
                className={`platform-btn kick ${selectedPlatform === Platform.KICK ? 'active' : ''}`}
                onClick={() => handlePlatformToggle(Platform.KICK)}
              >
                K
              </button>
            </div>

            <form onSubmit={handleSubmit} className="add-channel-form">
              <div className={`input-group ${isError ? 'error' : ''}`}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder={`Nombre del canal en ${PLATFORM_NAMES[selectedPlatform]}`}
                  className="channel-input"
                  disabled={isAtMaxCapacity}
                />
                {isError && (
                  <span className="error-message">
                    Nombre inválido o canal ya existe
                  </span>
                )}
              </div>
              
              <button 
                type="submit"
                className={`add-btn ${isAtMaxCapacity ? 'disabled' : ''}`}
                disabled={isAtMaxCapacity}
              >
                {isAtMaxCapacity ? 'Máximo alcanzado' : 'Añadir Canal'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelModal;