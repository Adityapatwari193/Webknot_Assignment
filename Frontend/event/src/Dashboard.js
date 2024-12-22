import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users } from 'lucide-react';
import './styles/Dashboard.css'

const Dashboard = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.user !== null);
  const [flashMessage, setFlashMessage] = useState('');
  const [activeCard, setActiveCard] = useState(null);

  const handleAction = (action) => {
    if (!isLoggedIn) {
      setFlashMessage('You need to log in first!');
      setTimeout(() => setFlashMessage(''), 3000);
      return;
    }
    navigate(`/${action}`);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="dashboard-title">Welcome to Event Management</h1>
        {flashMessage && <div className="flash-message">{flashMessage}</div>}
        
        <div className="dashboard-cards">
          <div 
            className={`dashboard-card ${activeCard === 'events' ? 'active' : ''}`}
            onClick={() => handleAction('events')}
            onMouseEnter={() => setActiveCard('events')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <Calendar className="card-icon" />
            <h2>Manage Events</h2>
            <p>Create, edit, and organize your events</p>
          </div>

          <div 
            className={`dashboard-card ${activeCard === 'attendees' ? 'active' : ''}`}
            onClick={() => handleAction('attendees')}
            onMouseEnter={() => setActiveCard('attendees')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <Users className="card-icon" />
            <h2>Manage Attendees</h2>
            <p>Track and manage event participants</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;