import React from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ListTodo, Calendar, Clock, CheckSquare } from 'lucide-react';
import './styles/CreateTask.css';

const CreateTask = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Task name is required')
      .min(2, 'Task name must be at least 2 characters long'),
    deadline: Yup.date()
      .required('Deadline is required')
      .min(new Date(), 'Deadline must be in the future'),
    status: Yup.string().required('Status is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post('http://localhost:5000/api/tasks', {
        ...values,
        eventId,
      });
      alert('Task created successfully!');
      navigate(`/events`);
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="create-task-container">
      <div className="create-task-content">
        <div className="page-header">
          <div className="header-content">
            <ListTodo className="header-icon" />
            <div className="header-text">
              <h1>Create New Task</h1>
              <p>Add a new task to manage your event</p>
            </div>
          </div>
        </div>

        <Formik
          initialValues={{ name: '', deadline: '', status: 'Pending' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="task-form">
              <div className="form-field">
                <div className="field-wrapper">
                  <CheckSquare className="field-icon" />
                  <Field 
                    type="text" 
                    name="name" 
                    placeholder="Enter task name" 
                  />
                </div>
                <ErrorMessage name="name" component="div" className="error-message" />
              </div>

              <div className="form-field">
                <div className="field-wrapper">
                  <Calendar className="field-icon" />
                  <Field 
                    type="datetime-local" 
                    name="deadline" 
                  />
                </div>
                <ErrorMessage name="deadline" component="div" className="error-message" />
              </div>

              <div className="form-field">
                <div className="field-wrapper">
                  <Clock className="field-icon" />
                  <Field as="select" name="status">
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </Field>
                </div>
                <ErrorMessage name="status" component="div" className="error-message" />
              </div>

              <div className="form-actions">
              
                {isSubmitting && (
                  <span className="loading-indicator">Loading...</span> 
                  
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`submit-button ${isSubmitting ? 'loading' : ''}`}
                >
                  {isSubmitting ? 'Creating...' : 'Create Task'}
                </button>
                
                <Link to="/events" className="cancel-button">
                  Cancel
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateTask;
