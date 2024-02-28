# Project Management App with React and Firebase

## Overview

This is a web-based Project Management App built with React, Vite and Firebase, allowing users to efficiently manage projects within a collaborative workspace. The app provides a range of functionalities, including user authentication, project creation, user management, project tracking, and commenting on projects.

## Features

### User Authentication

- **Sign Up**: Users can register for an account with the app.
- **Login**: Registered users can log in to access their personalized workspace.

### User Management

- **User Listing**: View a list of all registered users in the workspace.
- **User Status**: Easily identify whether users are online or offline.

### Project Management

- **Create New Project**: Users can create new projects with details such as title, description, due date and type.
- **Assign Users**: Assign team members to a project, enhancing collaboration.
- **View All Projects**: Access a dashboard to see all existing projects.
- **Filter Projects**: Filter projects based on different criteria such as status or type.
- **Comment on Projects**: Add comments to project details, facilitating communication.
- **Complete Projects**: Mark projects as complete when finished.

## Technologies Used

- **React**: The app's front-end is built using React, providing a dynamic and responsive user interface.
- **Firebase**: The Firebase platform is utilized for authentication, real-time database management, and cloud storage.
- **Vite**: Vite is used as the build tool to enable fast and efficient development.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Firebase: Create a Firebase project and configure the necessary credentials.
4. Configure Firebase in the app: Replace the Firebase configuration in `src/firebase/config.js` with your own credentials.
5. Start the app: `npm run dev`

## Usage

1. Sign up or log in to access the app.
2. Explore the list of registered users and their online/offline status.
3. Create new projects, assign users, and add project details.
4. View all projects on the dashboard and filter them as needed.
5. Comment on projects to enhance collaboration.
6. Mark projects as complete when they are finished.
