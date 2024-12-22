import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, MapPin, Type, FileText, ArrowLeft, Loader } from 'lucide-react';
import './styles/updateEvent.css';

const UpdateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    location: '',
    date: ''
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        const formattedDate = new Date(response.data.date).toISOString().slice(0, 16);
        setEventData({
          name: response.data.name,
          description: response.data.description,
          location: response.data.location,
          date: formattedDate,
        });
      } catch (error) {
        console.error('Error fetching event:', error);
        alert('Failed to fetch event details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEvent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      await axios.put(`http://localhost:5000/api/events/${id}`, eventData);
      alert('Event updated successfully!');
      navigate('/events');
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <Loader className="loading-spinner" />
        <p>Loading event details...</p>
      </div>
    );
  }

  return (
    <div className="update-event-container">
      <div className="update-event-wrapper">
        <div className="page-header">
          <h1 className="page-title">Update Event</h1>
          <p className="page-subtitle">Modify the event details below</p>
        </div>

        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-fields">
            <div className="form-field">
              <label className="field-label">
                <Type className="field-icon" />
                Event Name
              </label>
              <input
                type="text"
                className="field-input"
                value={eventData.name}
                onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
                placeholder="Enter event name"
                required
                disabled={isUpdating}
              />
            </div>

            <div className="form-field">
              <label className="field-label">
                <FileText className="field-icon" />
                Description
              </label>
              <textarea
                className="field-input"
                value={eventData.description}
                onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                placeholder="Enter event description"
                rows="4"
                disabled={isUpdating}
              />
            </div>

            <div className="form-field">
              <label className="field-label">
                <MapPin className="field-icon" />
                Location
              </label>
              <input
                type="text"
                className="field-input"
                value={eventData.location}
                onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                placeholder="Enter event location"
                disabled={isUpdating}
              />
            </div>

            <div className="form-field">
              <label className="field-label">
                <Calendar className="field-icon" />
                Date and Time
              </label>
              <input
                type="datetime-local"
                className="field-input"
                value={eventData.date}
                onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                required
                disabled={isUpdating}
              />
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className={`submit-button ${isUpdating ? 'loading' : ''}`}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <>
                  <Loader className="loading-spinner" />
                  Updating Event...
                </>
              ) : (
                'Update Event'
              )}
            </button>
            <Link 
              to="/events" 
              className="back-link"
              tabIndex={isUpdating ? -1 : 0}
            >
              <ArrowLeft className="back-icon" />
              Back to Events
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;