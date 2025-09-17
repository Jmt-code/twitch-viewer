import { useState } from 'react';
import SearchBar from './components/SearchBar';
import TwitchChannel from './components/TwitchChannel';
import './App.css';

function App() {
  const [channels, setChannels] = useState([]);
  const MAX_CHANNELS = 6;

  const addChannel = (channelName) => {
    // Verificar si el canal ya existe
    if (channels.includes(channelName)) {
      return false; // Canal ya existe
    }
    
    // Verificar límite máximo
    if (channels.length >= MAX_CHANNELS) {
      return false; // Límite alcanzado
    }
    
    setChannels(prev => [...prev, channelName]);
    return true; // Canal añadido exitosamente
  };

  const removeChannel = (channelName) => {
    setChannels(prev => prev.filter(channel => channel !== channelName));
  };

  const getGridClass = () => {
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
          <span className="twitch-purple">Twitch</span> Multi-Viewer
        </h1>
        <p>Visualiza hasta {MAX_CHANNELS} canales simultáneamente</p>
      </header>

      <SearchBar 
        onAddChannel={addChannel}
        channelCount={channels.length}
        maxChannels={MAX_CHANNELS}
      />

      {channels.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📺</div>
          <h3>No hay canales agregados</h3>
          <p>Usa la barra de búsqueda para añadir tu primer canal de Twitch</p>
        </div>
      ) : (
        <div className={`channels-grid ${getGridClass()}`}>
          {channels.map((channelName) => (
            <TwitchChannel
              key={channelName}
              channelName={channelName}
              onRemove={removeChannel}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
