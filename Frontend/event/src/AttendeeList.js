import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserPlus, Home, Trash2, UserCog, Loader } from 'lucide-react';
import './styles/AttendeeList.css';

const AttendeeList = () => {
  const [attendees, setAttendees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAttendees();
  }, []);

  const fetchAttendees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/attendees');
      setAttendees(response.data);
    } catch (error) {
      console.error('Error fetching attendees:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this attendee?')) {
      try {
        await axios.delete(`http://localhost:5000/api/attendees/${id}`);
        fetchAttendees();
      } catch (error) {
        console.error('Error deleting attendee:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <Loader className="loading-spinner" />
        <p>Loading attendees...</p>
      </div>
    );
  }

  return (
    <div className="attendee-list-container">
      <div className="attendee-list-wrapper">
        <div className="page-header">
          <h1 className="page-title">Attendee List</h1>
          <p className="page-subtitle">Manage your event attendees</p>
        </div>

        <div className="action-buttons">
          <Link to="/attendees/create" className="create-button">
            <UserPlus className="button-icon" />
            Create New Attendee
          </Link>
          <Link to="/dashboard" className="home-button">
            <Home className="button-icon" />
            Dashboard
          </Link>
        </div>

        <div className="attendee-grid">
          {attendees.length === 0 ? (
            <div className="empty-state">
              <p>No attendees found. Create your first attendee!</p>
            </div>
          ) : (
            attendees.map((attendee) => (
              <div key={attendee._id} className="attendee-card">
                <div className="attendee-info">
                  <h3 className="attendee-name">{attendee.name}</h3>
                  <p className="attendee-email">{attendee.email}</p>
                </div>
                <div className="card-actions">
                  <Link 
                    to={`/attendees/assign/${attendee._id}`}
                    className="assign-button"
                  >
                    <UserCog className="action-icon" />
                    <span className="action-text">Assign</span>
                  </Link>
                  <button 
                    onClick={() => handleDelete(attendee._id)}
                    className="delete-button"
                  >
                    <Trash2 className="action-icon" />
                    <span className="action-text">Delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendeeList;