# Notes UI Demo

A modern, responsive React application for managing notes with a clean and intuitive user interface. Built with TypeScript, Vite, and Tailwind CSS.

## 🚀 Features

- **Create, Read, Update, Delete** notes with rich content
- **Tag-based organization** for better note categorization
- **Real-time updates** with React Query for optimal data management
- **Responsive design** that works on desktop and mobile devices
- **Modern UI** with smooth animations and intuitive interactions
- **Type-safe** development with TypeScript
- **Comprehensive testing** with Vitest and React Testing Library

## 🛠️ Tech Stack

### Core Technologies
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework

### State Management & Data Fetching
- **TanStack React Query** - Powerful data synchronization and caching
- **React Context** - Local state management

### Testing
- **Vitest** - Fast unit testing framework
- **React Testing Library** - Testing utilities for React components
- **MSW (Mock Service Worker)** - API mocking for tests
- **jsdom** - DOM environment for testing

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules

### UI Components
- **React Icons** - Beautiful icon library

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Notes API** running (see the `notes-api` directory for backend setup)

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8000
```

**Note:** The default API URL is `http://127.0.0.1:8000` if not specified.

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📜 Available Scripts

### Development Scripts

- **`npm run dev`** - Starts the development server with hot reload
  - Runs Vite in development mode
  - Includes proxy configuration for API calls
  - Hot module replacement enabled

- **`npm run preview`** - Preview the production build locally
  - Builds the project first, then serves the built files
  - Useful for testing the production build before deployment

### Build Scripts

- **`npm run build`** - Creates a production build
  - Compiles TypeScript with `tsc -b`
  - Bundles the application with Vite
  - Optimizes assets for production

### Testing Scripts

- **`npm run test`** - Runs tests in watch mode
  - Starts Vitest in interactive mode
  - Watches for file changes and re-runs tests

- **`npm run test:ui`** - Opens Vitest UI for visual test management
  - Provides a web interface for running and debugging tests
  - Shows test coverage and results in a browser

- **`npm run test:run`** - Runs tests once and exits
  - Useful for CI/CD pipelines
  - No watch mode, runs all tests and terminates

- **`npm run test:coverage`** - Runs tests with coverage report
  - Generates detailed coverage information
  - Shows which lines of code are tested

### Code Quality Scripts

- **`npm run lint`** - Runs ESLint to check code quality
  - Identifies potential errors and code style issues
  - Enforces consistent coding standards

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── CreateNote.tsx   # Note creation modal
│   ├── EditNote.tsx     # Note editing modal
│   ├── NoteCard.tsx     # Individual note display
│   └── NotesList.tsx    # List of all notes
├── context/             # React Context providers
│   └── NotesContext.tsx # Notes state management
├── hooks/               # Custom React hooks
│   ├── useClickOutside.ts # Click outside detection
│   └── useNotes.ts      # Notes data management
├── test/                # Test configuration and utilities
│   ├── mocks/           # API mocking setup
│   ├── setup.ts         # Test environment setup
│   └── utils/           # Test utilities
├── types.ts             # TypeScript type definitions
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```

## 🧪 Testing

The project includes comprehensive testing setup:

- **Unit Tests**: Component testing with React Testing Library
- **Integration Tests**: API integration testing with MSW
- **Coverage Reports**: Detailed test coverage analysis

### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage
```

## 🔧 Configuration

### Vite Configuration
- **Proxy Setup**: API requests are proxied to the backend server
- **React Plugin**: JSX transformation and Fast Refresh
- **Tailwind Plugin**: CSS processing and optimization

### TypeScript Configuration
- **Strict Mode**: Enabled for better type safety
- **ES2020 Target**: Modern JavaScript features
- **Module Resolution**: Node.js-style module resolution

## 🌐 API Integration

The application communicates with a REST API for note operations:

- **GET /api/notes** - Fetch all notes
- **POST /api/notes** - Create a new note
- **PUT /api/notes/:id** - Update an existing note
- **DELETE /api/notes/:id** - Delete a note

API calls are handled through React Query for efficient caching and synchronization.

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service.

### Environment Variables for Production

Make sure to set the correct `VITE_API_URL` for your production API endpoint.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Roy Ho** - Developer and maintainer of this project.