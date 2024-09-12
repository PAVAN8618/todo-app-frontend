import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';




const App = () => {
    const [todos, setTodos] = useState([]);

    // Fetch todos
    useEffect(() => {
        axios.get('http://localhost:5000/todos')
            .then(response => setTodos(response.data))
            .catch(err => console.log(err));
    }, []);

    const addTodo = (text) => {
        axios.post('http://localhost:5000/todos', { text })
            .then(response => setTodos([...todos, response.data]))
            .catch(err => console.log(err));
    };

    const deleteTodo = (id) => {
        axios.delete(`http://localhost:5000/todos/${id}`)
            .then(() => setTodos(todos.filter(todo => todo._id !== id)))
            .catch(err => console.log(err));
    };

    return (
        <div>
            <h1>Todo App</h1>
            <TodoForm addTodo={addTodo} />
            <TodoList todos={todos} deleteTodo={deleteTodo} />
        </div>
    );
};

export default App;
