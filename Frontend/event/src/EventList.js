import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UpdateTaskStatus from './updateTaskStatus';
import { Calendar, MapPin, Users, CheckSquare, Edit, Trash2, Plus } from 'lucide-react';
import './styles/EventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${id}`);
        fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const getCardClass = (index) => {
    const baseClasses = "event-card";
    const bgClasses = [
      "bg-gradient-to-br from-blue-200 to-blue-300",
      "bg-gradient-to-br from-purple-200 to-purple-300",
      "bg-gradient-to-br from-emerald-200 to-emerald-300",
      "bg-gradient-to-br from-amber-200 to-amber-300",
      "bg-gradient-to-br from-rose-200 to-rose-300",
      "bg-gradient-to-br from-indigo-200 to-indigo-300"
    ];
    return `${baseClasses} ${bgClasses[index % bgClasses.length]}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Events</h2>
        <div className="space-x-4">
          <Link to="/create" className="create-button">
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Link>
          <span> </span>
          <span>  </span>
          <Link to="/dashboard" className="home-button">
            Home
          </Link>
        </div>
      </div>

      <div className="events-grid">
        {events.map((event, index) => (
          <div key={event._id} className={getCardClass(index)}>
            <div className="card-content">
              <h3 className="event-title">{event.name}</h3>
              <p className="event-description">{event.description}</p>
              
              <div className="event-detail">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{event.location}</span>
              </div>
              
              <div className="event-detail">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{new Date(event.date).toLocaleString()}</span>
              </div>

              <div className="content-section">
                <div className="attendees-section">
                  <div className="section-header">
                    <Users className="w-4 h-4 mr-2" />
                    <h4>Attendees</h4>
                  </div>
                  {event.attendees.length > 0 ? (
                    <ul className="attendees-list">
                      {event.attendees.map((attendee) => (
                        <li key={attendee._id} className="attendee-item">
                          {attendee.name} ({attendee.email})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="empty-message">No attendees assigned</p>
                  )}
                </div>

                <div className="tasks-section">
                  <div className="section-header">
                    <div className="flex items-center">
                      <CheckSquare className="w-4 h-4 mr-2" />
                      <h4>Tasks</h4>
                    </div>
                    <Link
                      to={`/events/${event._id}/tasks/create`}
                      className="add-task-button"
                    >
                      Add Task
                    </Link>
                  </div>
                  {event.tasks && event.tasks.length > 0 ? (
                    <ul className="tasks-list">
                      {event.tasks.map((task) => (
                        <li key={task._id} className="task-item">
                          <span className="task-name">{task.name}</span>
                          <div className="task-status-container">
                            <span className="task-status">{task.status}</span>
                            <UpdateTaskStatus
                              taskId={task._id}
                              currentStatus={task.status}
                              onStatusUpdated={fetchEvents}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="empty-message">No tasks assigned</p>
                  )}
                </div>
              </div>

              <div className="card-actions">
                <Link to={`/update/${event._id}`} className="action-button edit-button">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Link>
                <button onClick={() => handleDelete(event._id)} className="action-button delete-button">
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;