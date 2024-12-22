import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Users, CheckCircle, Loader } from 'lucide-react';
import './styles/AsignAttendee.css';

const AssignAttendee = () => {
  const { attendeeId } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assigningEventId, setAssigningEventId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleAssign = async (eventId, eventName) => {
    setAssigningEventId(eventId);
    try {
      await axios.post(`http://localhost:5000/api/attendees/${eventId}/assign/${attendeeId}`);
      setSuccessMessage(`Successfully assigned to ${eventName}!`);
      
      setTimeout(() => {
        navigate('/events');
      }, 2000);
      alert("Assigned Atendee To Event")
    } catch (error) {
      console.error('Error assigning event:', error);
      alert('Failed to assign event: ' + (error.response ? error.response.data.error : 'Unknown error'));
    } finally {
      setAssigningEventId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="loading-spinner">
          <Loader className="animate-spin h-12 w-12 text-blue-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {successMessage && (
          <div className="success-message mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center justify-center animate-fade-in">
            <CheckCircle className="w-5 h-5 mr-2" />
            {successMessage}
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Users className="w-6 h-6 text-blue-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Assign Event to Attendee</h2>
            </div>
            <button
              onClick={() => navigate('/attendees')}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none transition-colors"
            >
              Back
            </button>
          </div>
          <p className="text-gray-600">Select an event from the list below to assign to this attendee.</p>
        </div>

        <div className="events-container overflow-x-auto pb-4">
          <div className="flex gap-4">
            {events.map((event) => (
              <div
                key={event._id}
                className="event-card bg-white rounded-lg shadow-sm border border-gray-200 flex-shrink-0"
              >
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <Calendar className="w-5 h-5 text-blue-500 mr-2" />
                    <h4 className="font-semibold text-gray-900">{event.name}</h4>
                  </div>
                  <button
                    onClick={() => handleAssign(event._id, event.name)}
                    disabled={assigningEventId === event._id}
                    className={`assign-button w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 
                              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors
                              disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                  >
                    {assigningEventId === event._id ? (
                      <>
                        <Loader className="animate-spin h-4 w-4" />
                        Assigning...
                      </>
                    ) : (
                      'Assign Event'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No events available for assignment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignAttendee;