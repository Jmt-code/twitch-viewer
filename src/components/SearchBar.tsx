import { useState, FormEvent, ChangeEvent } from 'react';
import { SearchBarProps, Platform, PLATFORM_NAMES } from '../types';
import './SearchBar.css';

const SearchBar: React.FC<SearchBarProps> = ({ onAddChannel, channelCount, maxChannels }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(Platform.TWITCH);
  const [isError, setIsError] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const channelName = inputValue.trim().toLowerCase();
    
    if (!channelName) {
      setIsError(true);
      return;
    }
    
    if (channelCount >= maxChannels) {
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

  const handleAddClick = (): void => {
    if (channelCount >= maxChannels) {
      alert(`Máximo ${maxChannels} canales permitidos`);
      return;
    }
    
    const channelName = inputValue.trim().toLowerCase();
    if (!channelName) {
      setIsError(true);
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

  const handlePlatformChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSelectedPlatform(e.target.value as Platform);
  };

  const isAtMaxCapacity = channelCount >= maxChannels;

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-row">
          <div className="platform-selector">
            <label htmlFor="platform-select" className="platform-label">
              Plataforma:
            </label>
            <select
              id="platform-select"
              value={selectedPlatform}
              onChange={handlePlatformChange}
              className={`platform-select ${selectedPlatform}`}
              disabled={isAtMaxCapacity}
            >
              <option value={Platform.TWITCH}>{PLATFORM_NAMES[Platform.TWITCH]}</option>
              <option value={Platform.KICK}>{PLATFORM_NAMES[Platform.KICK]}</option>
            </select>
          </div>

          <div className={`input-container ${isError ? 'error' : ''}`}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={`Nombre del canal (ej: ${selectedPlatform === Platform.TWITCH ? 'shroud, ninja, auronplay' : 'trainwreckstv, adin_ross, xqc'})`}
              className="channel-input"
              disabled={isAtMaxCapacity}
            />
            {isError && (
              <span className="error-message">
                Nombre de canal inválido o ya existe
              </span>
            )}
          </div>
        </div>
        
        <button 
          type="button"
          onClick={handleAddClick}
          className={`add-button ${isAtMaxCapacity ? 'disabled' : ''}`}
          disabled={isAtMaxCapacity}
          title={isAtMaxCapacity ? `Máximo ${maxChannels} canales` : 'Añadir canal'}
        >
          +
        </button>
      </form>
      
      <div className="channel-counter">
        {channelCount}/{maxChannels} canales
      </div>
    </div>
  );
};

export default SearchBar;