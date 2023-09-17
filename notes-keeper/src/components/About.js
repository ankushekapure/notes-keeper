import React from 'react';

export default function About() {
  return (
    <div className='container my-4'>
      <h2>About Notes Keeper</h2>
      <p>
        Notes Keeper is a user-friendly web-based note-taking application designed to help you organize your thoughts, ideas, and important information. It provides a seamless platform for creating, editing, and managing your notes effortlessly.
      </p>
      <h3>Key Features</h3>
      <ul>
        <li>Note Creation: Create and store your notes with ease.</li>
        <li>Note Editing: Edit your notes whenever you need to make changes.</li>
        <li>Note Deletion: Remove notes that you no longer need.</li>
        <li>Tagging System: Organize your notes by adding tags for easy categorization.</li>
        <li>User Authentication: Keep your notes secure with user authentication.</li>
        <li>Responsive Design: Access your notes on various devices with a responsive interface.</li>
      </ul>
      <h3>Technologies Used</h3>
      <p>
        Notes Keeper is built using a modern technology stack, including HTML, CSS, React.js, JavaScript for the frontend, and Node.js, Express.js, MongoDB, and JWT Authentication for the backend. It utilizes RESTful APIs to ensure smooth communication between the frontend and backend components.
      </p>
      <p>
        Feel free to explore and start keeping your notes organized with Notes Keeper!
      </p>
    </div>
  );
}