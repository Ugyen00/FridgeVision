import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import FridgeAI from './pages/Home';
import Notifications from './pages/Notifications';
import ProfilePage from './pages/Profile';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<FridgeAI />} />
          <Route path="/items" element={<FridgeAI />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<ProfilePage />} /> {/* Add the ProfilePage route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
