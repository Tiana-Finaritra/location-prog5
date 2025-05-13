import React, { useState } from 'react';

const HoverButton: React.FC = () => {
  const [hover, setHover] = useState(false);

  const style: React.CSSProperties = {
    backgroundColor: hover ? 'rgb(84, 120, 134)' : 'rgb(50, 197, 255)',
    transition: 'background-color 0.3s ease',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  };

  return (
    <button
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      Hover me
    </button>
  );
};

export default HoverButton;
