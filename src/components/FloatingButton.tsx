import './FloatingButton.css';

interface FloatingButtonProps {
  onClick: () => void;
  channelCount: number;
  maxChannels: number;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick, channelCount, maxChannels }) => {
  const isAtMaxCapacity = channelCount >= maxChannels;

  return (
    <div className="floating-button-container">
      {channelCount > 0 && (
        <div className="channel-counter-badge">
          {channelCount}/{maxChannels}
        </div>
      )}
      <button 
        className={`floating-button ${isAtMaxCapacity ? 'disabled' : ''}`}
        onClick={onClick}
        disabled={isAtMaxCapacity}
        title={isAtMaxCapacity ? `Máximo ${maxChannels} canales` : 'Gestionar canales'}
      >
        +
      </button>
    </div>
  );
};

export default FloatingButton;