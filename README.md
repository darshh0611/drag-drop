# Drag-and-Drop Dashboard Manager

This next.js project is a drag-and-drop dashboard manager built with React and `react-grid-layout` seeming to simulate the dashboard mechanism of the famous business analyics tool `Metabase`. It allows users to create, edit, and manage dashboards with customizable widgets such as charts, tables, metrics, text, and filters.

## Features

- **Dashboard Management**: Create, rename, delete, and reset dashboards.
- **Widget Management**: Add, rename, delete, and rearrange widgets.
- **Drag-and-Drop Layout**: Easily rearrange widgets using drag-and-drop functionality.
- **Responsive Design**: Supports multiple screen sizes with responsive layouts.
- **Auto-Save**: Automatically saves changes to the dashboard.
- **API Integration**: Fetches and saves dashboard data via a REST API.

## Technologies Used

- **Frontend**: React, `react-grid-layout`, Tailwind CSS
- **Backend**: REST API (assumed to be running on `http://localhost:4444/api`)
- **State Management**: React Hooks
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A running backend API (refer to the `API_BASE_URL` in the code)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/drag-drop-dashboard.git
   cd drag-drop-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open the app in your browser:
   ```
   http://localhost:3000
   ```

### Backend Setup

Ensure the backend API is running on `http://localhost:4444/api`. The API should support the following endpoints:

- `GET /dashboards`: Fetch all dashboards.
- `GET /dashboards/:id`: Fetch a specific dashboard.
- `POST /dashboards`: Create a new dashboard.
- `PUT /dashboards/:id`: Update a dashboard.
- `DELETE /dashboards/:id`: Delete a dashboard.
- `POST /dashboards/:id/widgets`: Add a widget to a dashboard.
- `PUT /dashboards/:id/widgets/:widgetId`: Update a widget in a dashboard.

## Usage

1. **Create a Dashboard**: Click the "New Dashboard" button to create a new dashboard.
2. **Add Widgets**: Use the buttons to add widgets like charts, tables, metrics, etc.
3. **Customize Layout**: Drag and resize widgets to customize the layout.
4. **Save Changes**: Changes are auto-saved, but you can manually save using the "Save Dashboard" button.
5. **Manage Dashboards**: Rename, delete, or reset dashboards as needed.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React Grid Layout](https://github.com/react-grid-layout/react-grid-layout)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
