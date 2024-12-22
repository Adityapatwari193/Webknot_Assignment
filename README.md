# Webknot Assignment

This project is an assignment for the company **Webknot** by **Aditya Patwari**, focusing on **Event Management** using the **MERN Stack** (MongoDB, Express, React, Node.js). The system allows users to create, update, and manage events through a user-friendly interface.

## Features

1. **Event Creation and Management**: Users can create, update, and delete events.
2. **Attendee Creation**:Create Attendees,Manage Attendees and delete attendees and assign them to different events.
3. **Task Management**:Create A Task associated with each event and manage the task deadlines,status.
4. **User Authentication**: Secure login and registration functionality.
5. **Responsive Design**: Optimized for various device sizes.
6. **Real-time Updates**: Live updates for event information.
8. **Event Dashboard**: View upcoming and past events with details.
9. **User Role Management**: Different access levels for regular users and administrators.


## Technologies Used

### Backend
- **Node.js**: JavaScript runtime for building the server.
- **Express.js**: Backend framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing event and user data.
- **Passport.js**:Middleware to facilitate login, register, logout .


### Frontend
- **React.js**: Dynamic frontend with interactive components.
- **Axios**: Used for making HTTP requests to the backend API.
- **React Router**: For handling navigation between pages.
- **Bootstrap**: For responsive design and styling of components.
- **Redux**:To store the state of the User.

## Setup Instructions

Follow these steps to set up the project on your local system:

### Prerequisites

- **Node.js** (v16+)
- **npm** (Node Package Manager)
- **MongoDB**: Local or Cloud MongoDB setup (e.g., MongoDB Atlas).

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Adityapatwari193/Webknot_Assignment.git
   cd Webknot_Assignment/backend
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```


3. Start the backend server:
   ```bash
   node app.js
   ```

4. Backend running on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the `frontend` folder:
   ```bash
   cd ../frontend
   ```

2. Install the required npm packages:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

### User Authentication
* **Endpoint**: `/api/auth/register`
  * **Method**: `POST`
  * **Description**: Registers a new user.

* **Endpoint**: `/api/auth/login`
  * **Method**: `POST`
  * **Description**: Logs in an existing user and returns a JWT.

### Event Management
* **Endpoint**: `/api/events`
  * **Method**: `GET`
  * **Description**: Fetches a list of events.

* **Endpoint**: `/api/events`
  * **Method**: `POST`
  * **Description**: Creates a new event.

* **Endpoint**: `/api/events/:id`
  * **Method**: `PUT`
  * **Description**: Updates an existing event.

* **Endpoint**: `/api/events/:id`
  * **Method**: `DELETE`
  * **Description**: Deletes an event.
 
### Attendee Management

* **Endpoint**: `/api/attendees`
  * **Method**: `POST`
  * **Description**: Adds a new attendee to the system.
    
* **Endpoint**: `/api/attendees`
  * **Method**: `GET`
  * **Description**: Retrieves a list of all attendees.
    
* **Endpoint**: `/api/attendees/:id`
  * **Method**: `DELETE`
  * **Description**: Removes an attendee from the system.
    
* **Endpoint**: `/api/attendees/:eventId/assign/:attendeeId`
  * **Method**: `POST` 
  * **Description**: Assigns an attendee to a specific event.

### Task Management

* **Endpoint**: `/api/tasks`
  * **Method**: `POST`
  * **Description**: Creates a new task.
    
* **Endpoint**: `/api/tasks/:eventId`
  * **Method**: `GET`
  * **Description**: Retrieves all tasks for a specific event.
    
* **Endpoint**: `/api/tasks/:id/status`
  * **Method**: `PATCH`
  * **Description**: Updates the status of a specific task.
 
  

## Folder Structure

```
backend/
├── controllers/
│   ├── authController.js
│   ├── eventController.js
│   ├── attendeeController.js
│   ├── taskController.js
├── models/
│   ├── User.js
│   ├── Event.js
│   ├── Attendee.js
│   ├── Task.js
├── routes/
│   ├── authRoutes.js
│   ├── eventRoutes.js
│   ├── attendeeRoutes.js
│   ├── taskRoutes.js
├── middlewares/
│   ├── authMiddleware.js
├── config/
│   ├── db.js
│   ├── passport.js
├── .env
├── server.js
 
```

## Screenshots

[Event List Screen]

[Event Creation Screen]

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.
