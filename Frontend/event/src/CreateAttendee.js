import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { UserPlus, Mail, User, Loader } from 'lucide-react';
import './styles/CreateAttendee.css';

const CreateAttendee = () => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters long'),
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsCreating(true);
    try {
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      await axios.post('http://localhost:5000/api/attendees', values);
      alert('Attendee created successfully!');
      navigate('/attendees');
    } catch (error) {
      console.error('Error creating attendee:', error);
      alert('Failed to create attendee');
    } finally {
      setIsCreating(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="create-attendee-container">
      <div className="create-attendee-wrapper">
        <div className="page-header">
          <UserPlus className="header-icon" />
          <h2 className="page-title">Create Attendee</h2>
          <p className="page-subtitle">Add a new attendee to your event</p>
        </div>

        <Formik
          initialValues={{ name: '', email: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="attendee-form">
              <div className="form-fields">
                <div className="form-field">
                  <label className="field-label">
                    <User className="field-icon" />
                    Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Enter full name"
                    className="field-input"
                    disabled={isCreating}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="form-field">
                  <label className="field-label">
                    <Mail className="field-icon" />
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    className="field-input"
                    disabled={isCreating}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`submit-button ${isCreating ? 'loading' : ''}`}
                disabled={isSubmitting || isCreating}
              >
                {isCreating ? (
                  <>
                    <Loader className="loading-spinner" />
                    Creating Attendee...
                  </>
                ) : (
                  'Create Attendee'
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateAttendee;