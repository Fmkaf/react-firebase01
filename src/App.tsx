import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Home } from './pages/home/Home';
import { Login } from './pages/Login';
import { Dashboard } from './components/Dashboard';
import './App.css';
import {CreatePost} from './pages/create-post/create-post';

function App() {
  return (
    <div className="App">
      <Router>
        <Dashboard/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/createPost' element={<CreatePost/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
