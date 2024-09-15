import React, { useState } from 'react';
import axios from 'axios';

function Create() {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    if (!task.trim()) {
      alert("Task title cannot be empty");
      return;
    }

    axios.post('http://localhost:3001/add', { title: task })
      .then(result => {
        console.log(result);
        setTask(''); // Clear the input after successful addition
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='create_form'>
      <input
        type="text"
        placeholder='Enter Task'
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>Add</button>
    </div>
  );
}

export default Create;
  
