# Job Portal Admin Dashboard

A modern admin dashboard for managing job postings, candidates, and assessments. Built with React and Material-UI, featuring a responsive design and dark mode support.

## Live Demo

- [Live Application](https://job-portal-admin-nine.vercel.app/)
<!-- - [Documentation](https://docs.google.com/document/d/1HeYEj57SSlVMjouRlIYqUlvzZBxEJPqh0OAl2R0-UEY/edit) -->
- [Assignment](https://docs.google.com/document/d/1pdm1EIYk5qplAKdb180lqs6XqVzz7BiRq8qbyJ12VxI/edit?tab=t.0)

## Features

- 📝 Create, edit, and delete job postings
- 👥 Track candidate applications
- 📊 Create and manage assessments for jobs
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive design
<!-- - 🔔 Real-time notifications -->
- 💾 Local storage persistence

## Tech Stack

- React.js
- Material-UI (MUI)
- React Router DOM
- Context API for state management
- Local Storage for data persistence

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 14.0 or higher)
- npm (usually comes with Node.js)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/pratham-yuxo/job-portal-admin.git
```

2. Navigate to the project directory:

```bash
cd job-portal-admin
```

3. Install dependencies:

```bash
npm install
```

## Running the Application

1. Start the development server:

```bash
npm run start
```

2. Open your browser and visit:

```bash
http://localhost:3000
```

## Project Structure

```
job-portal-admin/
├── public/
├── src/
│   ├── components/         # Reusable components
│   ├── context/           # Context providers
│   ├── pages/             # Page components
│   ├── App.js             # Main app component
│   └── index.js           # Entry point
└── package.json
```

## Key Features Breakdown

### Job Management

- Create new job postings
- Edit existing job details
- Delete job postings
- View job applications

### Candidate Management

- View candidate details
- Track application status
- Manage candidate assessments

### Assessment System

- Create custom assessments for jobs
- Multiple choice questions
- Edit and delete assessments
<!-- - Track assessment results -->

### User Interface

- Responsive design for all screen sizes
- Dark mode support
- Intuitive navigation
- Real-time feedback notifications

## Local Storage

The application uses browser's local storage to persist data. To reset the application state:

1. Open browser developer tools (F12)
2. Go to Application tab
3. Select Local Storage
4. Clear storage data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- ## License

This project is licensed under the MIT License - see the LICENSE file for details -->

## Support

For support, email prathamv0077@gmail.com or open an issue in the repository.

<!-- ## Acknowledgments

- Material-UI for the component library
- React team for the amazing framework
- All contributors who have helped shape this project -->
