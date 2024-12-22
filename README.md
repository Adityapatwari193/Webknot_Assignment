# Webknot Assignment

This project is an assignment for the company **Webknot** by **Aditya Patwari**, focusing on **Event Management** using the **MERN Stack** (MongoDB, Express, React, Node.js). The system allows users to create, update, and manage events through a user-friendly interface.

## Features

1. **Event Creation and Management**: Users can create, update, and delete events.
2. **User Authentication**: Secure login and registration functionality.
3. **Responsive Design**: Optimized for various device sizes.
4. **Real-time Updates**: Live updates for event information.
5. **Search and Filter**: Easily find events based on search criteria.
6. **Event Dashboard**: View upcoming and past events with details.
7. **User Role Management**: Different access levels for regular users and administrators.

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime for building the server.
- **Express.js**: Backend framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing event and user data.
- **JWT (JSON Web Tokens)**: For user authentication and session management.
- **bcrypt.js**: For hashing user passwords securely.

### Frontend
- **React.js**: Dynamic frontend with interactive components.
- **Axios**: Used for making HTTP requests to the backend API.
- **React Router**: For handling navigation between pages.
- **Bootstrap**: For responsive design and styling of components.

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

3. Set up the environment variables (you can create a `.env` file):
   * `MONGO_URI`: The MongoDB connection string.
   * `JWT_SECRET`: Secret key for signing JSON Web Tokens.

4. Start the backend server:
   ```bash
   npm start
   ```

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

## Folder Structure

```
root
├── backend
│   ├── controllers     # Event and Auth API logic
│   ├── models         # Mongoose models (Event, User)
│   ├── routes         # API routes for events and authentication
│   ├── server.js      # Main backend entry point
│   ├── .env          # Environment variables
├── frontend
│   ├── src
│   │   ├── App.js    # Main React component
│   │   ├── components # Reusable components (Header, EventList)
│   │   ├── pages     # Pages for displaying events and user authentication
│   │   ├── App.css   # Styles
├── package.json      # Project dependencies
```

## Screenshots

[Event List Screen]

[Event Creation Screen]

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.
