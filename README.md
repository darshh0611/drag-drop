# Drag-and-Drop Dashboard Manager

This next.js project is a drag-and-drop dashboard manager built with React and `react-grid-layout` seeming to simulate the dashboard mechanism of the famous business analyics tool `Metabase`. It allows users to create, edit, and manage dashboards with customizable widgets such as charts, tables, metrics, text, and filters.

## Features

### Frontend

- **Dashboard Management**: Create, rename, delete, and reset dashboards.
- **Widget Management**: Add, rename, delete, and rearrange widgets.
- **Drag-and-Drop Layout**: Easily rearrange widgets using drag-and-drop functionality.
- **Responsive Design**: Supports multiple screen sizes with responsive layouts.
- **Auto-Save**: Automatically saves changes to the dashboard.
- **API Integration**: Fetches and saves dashboard data via a REST API.

### Backend

- **REST API**: Provides endpoints for managing dashboards and widgets.
- **Database Integration**: Uses MySQL with Sequelize ORM for data persistence.
- **Data Models**:
  - **Dashboard**: Represents a dashboard with layouts, widgets, and metadata.
  - **Widget**: Represents individual widgets associated with a dashboard.
- **Relationships**: Implements a one-to-many relationship between dashboards and widgets.
- **Migrations**: Includes database migrations for schema management.
- **Health Check**: Provides a `/healthz` endpoint to verify server and database connectivity.

## Technologies Used

### Frontend

- **React**: Component-based UI library.
- **React Grid Layout**: For drag-and-drop widget layout management.
- **Tailwind CSS**: Utility-first CSS framework.
- **Axios**: HTTP client for API communication.

### Backend

- **Koa.js**: Lightweight Node.js framework for building APIs.
- **Sequelize**: ORM for MySQL database interaction.
- **MySQL**: Relational database for storing dashboards and widgets.
- **dotenv**: For environment variable management.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MySQL database
- A `.env` file with the following variables:
  ```
  DB_NAME=your_database_name
  DB_USERNAME=your_database_username
  DB_PASSWORD=your_database_password
  DB_HOST=your_database_host
  PORT=8081
  ```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/drag-drop-dashboard.git
   cd drag-drop-dashboard
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Set up the database:
   - Create a MySQL database.
   - Run migrations to set up the schema:
     ```bash
     npx sequelize-cli db:migrate
     ```

4. Start the backend server:
   ```bash
   npm start
   ```

5. Start the frontend development server:
   ```bash
   cd ../frontend
   npm start
   ```

6. Open the app in your browser:
   ```
   http://localhost:3000
   ```

## Backend API Endpoints

### Dashboard Endpoints

- `GET /api/dashboards`: Fetch all dashboards.
- `GET /api/dashboards/:id`: Fetch a specific dashboard by ID.
- `POST /api/dashboards`: Create a new dashboard.
- `PUT /api/dashboards/:id`: Update a dashboard (e.g., name, layouts, widgets).
- `DELETE /api/dashboards/:id`: Delete a dashboard.

### Widget Endpoints

- `POST /api/dashboards/:id/widgets`: Add a widget to a specific dashboard.
- `PUT /api/dashboards/:id/widgets/:widgetId`: Update a widget's details (e.g., name).
- `DELETE /api/dashboards/:id/widgets/:widgetId`: Remove a widget from a dashboard.

### Health Check

- `GET /healthz`: Verify server and database connectivity.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React Grid Layout](https://github.com/react-grid-layout/react-grid-layout)
- [Tailwind CSS](https://tailwindcss.com/)
- [Koa.js](https://koajs.com/)
- [Sequelize](https://sequelize.org/)
- [Axios](https://axios-http.com/)
