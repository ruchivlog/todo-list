import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

function Home() {
  const [todos, setTodos] = useState([]);
   
  // Fetch tasks from the backend
  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

  // Toggle task completion (mark as done/undone)
  const handleEdit = (id, done) => {
    axios.put(`http://localhost:3001/update/${id}`, { completed: !done })
      .then(result => {
        setTodos(todos.map(todo => (todo._id === id ? { ...todo, done: !done } : todo)));
      })
      .catch(err => console.log(err));
  };

  // Delete task
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(result => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='home'>
      <h1>Todo list</h1>
      <Create />
      <br />
      {todos.length === 0 ? (
        <div><h2>No Record</h2></div>
      ) : (
        todos.map(todo => (
          <div className='task' key={todo._id}>
            <div className='checkbox' onClick={() => handleEdit(todo._id, todo.done)}>
              {todo.done ? (
                <BsFillCheckCircleFill className='icons' />
              ) : (
                <BsCircleFill className='icon' />
              )}
              <p>{todo.title}</p> {/* Assuming task has 'title' instead of 'task' */}
            </div>
            <div>
              <span onClick={() => handleDelete(todo._id)}><BsFillTrashFill className='icon' /></span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
