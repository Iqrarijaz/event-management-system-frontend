# Event Management System (React.js)

This project is a **React.js Event Management System** frontend application. It allows admin users to manage events and regular users to view events created by the admin.

## Features

### Admin Features
- **Registration and Login**: Admins can register and log in to manage events.
- **Create Events**: Add new events with relevant details.
- **List Events**: View all created events.
- **Filter Events**: Search or filter events based on criteria.
- **Update Events**: Modify event details.
- **Delete Events**: Remove events from the system.

### User Features
- **View Events**: Users can list and view events created by the admin.

---

## Installation and Setup

Follow these steps to clone and run the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/Iqrarijaz/event-management-system-frontend.git
   cd event-management-system-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Update the backend API URL in the project to match your backend server. Modify the `baseURL` in the API configuration file (`src/api/config.js`):

   ```javascript
   const baseURL = "https://your-backend-url.com/api";
   export default baseURL;
   ```

4. Run the development server:

   ```bash
   npm start
   ```

5. Open the application in your browser:
   ```
   http://localhost:3000
   ```

---

## Folder Structure

The project is structured as follows:

```
|-- src
    |-- api
    |   |-- config.js       # API configuration
    |-- components
    |   |-- Admin           # Admin-related components
    |   |-- User            # User-related components
    |-- pages
    |   |-- AdminDashboard  # Admin dashboard page
    |   |-- UserDashboard   # User dashboard page
    |-- App.js              # Main application entry point
    |-- index.js            # React DOM rendering
```

---

## Usage

### Admin Actions
1. Register or log in as an admin.
2. Use the admin dashboard to:
   - Create a new event by filling out the form.
   - View a list of all events.
   - Filter events by specific criteria.
   - Edit or delete any existing event.

### User Actions
1. Access the application as a regular user.
2. View a list of events created by the admin.

---

## Tech Stack
- **Frontend**: React.js, React Router, Axios, Tailwind CSS (optional for styling).
- **Backend**: (Update to your backend details, e.g., Node.js/Express.js or Django REST Framework).

---

## Contributing

Feel free to contribute to this project by submitting issues or pull requests. Follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License
This project is open-source and available under the [MIT License](LICENSE).
