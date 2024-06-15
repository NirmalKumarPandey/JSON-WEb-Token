import React from 'react';
import './App.css';
import Signup from './Component/Signup';
import Login from './Component/Login';
import Task from './Component/Task';
import Dashboard from './Component/Dashboard'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditProfile from './Component/EditProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}> </Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/dashboard" element={<Dashboard />}> </Route>
        <Route path="/task" element={<Task />}></Route>
        <Route path="/editProfile" element={<EditProfile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
