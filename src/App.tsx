import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import SidePanel from './components/SidePanel.tsx';
import Wiki from './components/Wiki.tsx';

function App() {
  const basename = process.env.NODE_ENV === 'production' ? '/custgmap' : '';

  return (
    <Router basename={basename}>
      <div className="App">
        <nav className="app-nav">
          <Link to="/">Map</Link>
          <Link to="/wiki">Wiki</Link>
        </nav>
        <Routes>
          <Route path="/wiki" element={<Wiki />} />
          <Route path="/" element={
            <>
              <SidePanel />
              <div style={{ height: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0 }}>
                <iframe 
                  title="Google Map"
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  id="gmap_canvas" 
                  src="https://maps.google.com/maps?q=Tokyo&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight={0} 
                  marginWidth={0}/>
              </div>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
