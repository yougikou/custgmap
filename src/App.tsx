import React from 'react';
import './App.css';
import SidePanel from './components/SidePanel.tsx';

function App() {

  return (
    <div className="App">
      <SidePanel />
      <div style={{ height: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0 }}>
          <iframe 
            title="Google Map"
            style={{ width: '100%', height: '100%', border: 'none' }}
            id="gmap_canvas" 
            src="https://maps.google.com/maps?q=Tokyo&t=&z=13&ie=UTF8&iwloc=&output=embed" 
            frameBorder="0" 
            scrolling="no" 
            marginHeight="0" 
            marginWidth="0"/>
      </div>
    </div >
  );
}

export default App;
