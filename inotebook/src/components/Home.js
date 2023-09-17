import React from 'react';
import Notes from './notes/Notes';

// Home component to display notes
export default function Home(props) {
  // Destructure the showAlert function from props
  const { showAlert } = props;

  return (
    <div>
      {/* Render the Notes component and pass showAlert as a prop */}
      <Notes showAlert={showAlert} />
    </div>
  )
}
