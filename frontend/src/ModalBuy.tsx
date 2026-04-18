import React from 'react';

export const Modal2 = ({ children, onClose }: { children: React.ReactNode, onClose: () => void }) => (
  <div style={{
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
  }}>
    <div style={{ background: '#11877a', color: 'white', padding: '20px', borderRadius: '8px', width: '880px', height: '500px' }}>
      <button onClick={onClose} style={{ float: 'right', cursor: 'pointer' }}>X</button>
      {children}
    </div>
  </div>
);