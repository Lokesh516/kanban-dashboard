# Task Management Dashboard

A simple **Task Management Dashboard** built with **React**. This app allows users to manage tasks in a **Kanban-style board**, add new tasks, and move them between different statuses (To Do, In Progress, Done). It also interacts with a mock API to persist tasks.

## Features

- **Kanban Board**: Tasks are displayed in columns (To Do, In Progress, Done).
- **Add New Task**: Users can add tasks with a title, description, and status.
- **Edit Task**: Users can edit the title and description of tasks.
- **Delete Task**: Users can delete tasks.
- **Drag & Drop**: Move tasks between columns and update their status.
- **API Integration**: Tasks are saved via API calls to a mock backend.

## Demo

You can view the live demo here:  
[**Live Demo**](https://kanban-board-dashboard.netlify.app/)

## Instructions to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Lokesh516/kanban-dashboard.git

2. **Navigate to the project folder**:

   cd kanban-dashboard

3. **Set up environment variables**:

   Create a .env file in the root of your project and add:

   VITE_API_URL=http://localhost:5000

   This is the base URL of your mock API (like json-server) used in development.


4. **Install dependencies: Run the following command to install the necessary dependencies**:

    npm install

5. **Start the application: After installation is complete, you can start the app with**:
 
    npm start

The app will be available at http://localhost:5173/ in your browser.

## Project Architecture and Approach

The **Task Management Dashboard** is built using **React** for the front end and interacts with a mock REST API to fetch, add, edit, and delete tasks. The project follows a component-based architecture with the following key components:

### Components

- **KanbanBoard**:  
  The main container component that renders the task columns (**To Do, In Progress, Done**).
  
- **TaskColumn**:  
  A component representing each status column (**To Do, In Progress, Done**), responsible for rendering tasks and handling the drag-and-drop feature.
  
- **Task**:  
  Represents individual tasks. It allows users to **edit** and **delete** tasks.

- **AddTaskModal**:  
  A modal component that lets users **add a new task** to the board.
  
- **EditTaskModal**:  
  A modal component that allows users to **edit** an existing task. It provides options to update the task's title, description, and status.

### State Management

- **React State**:  
  Local component state is used for managing the UI.

- **useEffect**:  
  Handles data fetching from the mock API on component mount.

- **useState**:  
  Manages the tasks within each column and the form state for adding or editing tasks.

### Drag and Drop

- **react-dnd**:  
  This library is used to handle the drag-and-drop functionality, allowing tasks to be moved between columns. When a task is moved, its status is updated in the backend.

### API Integration

  The app uses a mock API (such as **json-server** or **JSONPlaceholder**) to persist the tasks. The tasks are fetched and stored using API calls to simulate real-time data handling.



