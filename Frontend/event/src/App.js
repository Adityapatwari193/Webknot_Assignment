import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import TestComponent from './TestComponent';
import { BrowserRouter as Router, Routes, Route,Navigate} from 'react-router-dom';
import EventList from './EventList';
import CreateEvent from './CreateEvent';
import UpdateEvent from './updateEvent';
import AttendeeList from './AttendeeList';
import CreateAttendee from './CreateAttendee';
import AssignAttendee from './AssignAttendees';
import CreateTask from './createTask';
import Dashboard from './Dashboard';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/test" element={<TestComponent />} />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/events" element={<EventList />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/update/:id" element={<UpdateEvent />} />
          <Route path="/attendees" element={<AttendeeList />} />
          <Route path="/attendees/create" element={<CreateAttendee />} />
          <Route path="/attendees/assign/:attendeeId" element={<AssignAttendee />} /> 
          <Route path="/events/:eventId/tasks/create" element={<CreateTask />} /> 
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
