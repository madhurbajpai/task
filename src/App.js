import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './Components/Home';
import CreateTask from './Components/Core/CreateTask';
import UpcomingTask from './Components/Core/UpcomingTask';
import OverdueTask from './Components/Core/OverdueTask';
import CompletedTask from './Components/Core/CompletedTask';

function App() {
  return (
    <Router>
      <Routes>
        <Route index path='/' element={<Home />}></Route>
        <Route path='/new-task' element={<CreateTask />}></Route>
        <Route path='/upcoming-task' element={<UpcomingTask />}></Route>
        <Route path='/overdue-task' element={<OverdueTask />}></Route>
        <Route path='/completed-task' element={<CompletedTask />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
