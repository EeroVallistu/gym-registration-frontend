# Gym Registration Frontend

A React-based frontend application for managing gym registrations, trainers, workouts, and routines.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [API Integration](#api-integration)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)

## Overview

The Gym Registration Frontend is a React application built with TypeScript that provides an interface for managing gym-related activities. It includes user authentication, trainee management, workout scheduling, routine setup, and registration handling.

## Features

- **Authentication** - User login and registration
- **Trainees Management** - Add, edit, and delete trainee profiles
- **Workouts Management** - Create and manage workout types
- **Routines Management** - Set up availability schedules for trainers
- **Registrations Management** - Book and manage workout sessions

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- A compatible backend API server (see [API Integration](#api-integration))

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/EeroVallistu/gym-registration-frontend.git
   cd gym-registration-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Environment Configuration

1. Copy the example environment file to create your own:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and modify the values according to your needs:
   ```plaintext
   REACT_APP_API_URL=http://localhost:3000  # Your API server URL
   PORT=4000                                # Port for development server
   ```

   Note: Make sure the `REACT_APP_API_URL` points to your actual backend API server.

## Running the Application

To start the development server, run:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## API Integration

The application interacts with a backend API for data management. Ensure the backend server is running and accessible at the URL specified in the `.env` file.

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner.
- `npm run build`: Builds the app for production.
- `npm run eject`: Ejects the app from Create React App configuration.

## Deployment

To deploy the application, build the project and serve the static files using a web server of your choice.

1. Build the project:
   ```bash
   npm run build
   ```

2. Serve the static files from the `build` directory using a web server.

