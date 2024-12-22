import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Calendar, MapPin, Type, FileText, ArrowLeft, AlertCircle, Loader } from 'lucide-react';
import './styles/CreateEvent.css';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Event name is required')
      .min(2, 'Event name must be at least 2 characters long'),
    description: Yup.string()
      .required('Description is required')
      .min(10, 'Description must be at least 10 characters long'),
    location: Yup.string()
      .required('Location is required'),
    date: Yup.date()
      .required('Date is required')
      .min(new Date(), 'Date must be in the future'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsCreating(true);
    try {
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      await axios.post('http://localhost:5000/api/events', values);
      alert('Event created successfully!');
      navigate('/events');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event');
    } finally {
      setIsCreating(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="create-event-container">
      <div className="create-event-wrapper">
        <div className="page-header">
          <h1 className="page-title">Create New Event</h1>
          <p className="page-subtitle">Fill in the details below to create your event</p>
        </div>

        <Formik
          initialValues={{ name: '', description: '', location: '', date: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="event-form">
              <div className="form-fields">
                <div className="form-field">
                  <label htmlFor="name" className="field-label">
                    <Type className="field-icon" />
                    Event Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter event name"
                    className="field-input"
                    disabled={isCreating}
                  />
                  <ErrorMessage
                    name="name"
                    render={msg => (
                      <div className="field-error">
                        <AlertCircle size={14} />
                        {msg}
                      </div>
                    )}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="description" className="field-label">
                    <FileText className="field-icon" />
                    Description
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    placeholder="Enter event description"
                    className="field-input"
                    rows="4"
                    disabled={isCreating}
                  />
                  <ErrorMessage
                    name="description"
                    render={msg => (
                      <div className="field-error">
                        <AlertCircle size={14} />
                        {msg}
                      </div>
                    )}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="location" className="field-label">
                    <MapPin className="field-icon" />
                    Location
                  </label>
                  <Field
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Enter event location"
                    className="field-input"
                    disabled={isCreating}
                  />
                  <ErrorMessage
                    name="location"
                    render={msg => (
                      <div className="field-error">
                        <AlertCircle size={14} />
                        {msg}
                      </div>
                    )}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="date" className="field-label">
                    <Calendar className="field-icon" />
                    Date and Time
                  </label>
                  <Field
                    type="datetime-local"
                    id="date"
                    name="date"
                    className="field-input"
                    disabled={isCreating}
                  />
                  <ErrorMessage
                    name="date"
                    render={msg => (
                      <div className="field-error">
                        <AlertCircle size={14} />
                        {msg}
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  disabled={isSubmitting || isCreating}
                  className={`submit-button ${isCreating ? 'loading' : ''}`}
                >
                  {isCreating ? (
                    <>
                      <Loader className="loading-spinner" />
                      Creating Event...
                    </>
                  ) : (
                    'Create Event'
                  )}
                </button>

                <Link to="/events" className="back-link" tabIndex={isCreating ? -1 : 0}>
                  <ArrowLeft className="back-icon" />
                  Back to Events
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateEvent;