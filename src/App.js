import './App.css';
import NavBar from './commponents/NavBar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import {useState,useEffect} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import BookList from './pages/BookList';

function App() {
  const [user, setUser]=useState({})
// from DB search user to verify in login page
  const fetchUser = () => {
    if (localStorage.getItem('userId')) {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/verify`, {
        headers: {
          Authorization: localStorage.getItem('userId')
        }
      })
      .then((response) => {
        setUser(response.data.user)
      })
    }
  }
  useEffect(fetchUser, [])
  
  return (
    <div className="App">
      <NavBar userProp={user} setUser={setUser}/>
      <Routes>
        <Route path="*" element={<Login userProp={user} setUser={setUser}/>} />
        <Route path="/home" element={<Home userProp={user} setUser={setUser}/>}/> 
        <Route path="/signup" element={<Signup userProp={user} setUser={setUser}/>}/>
        <Route path="/login" element={<Login userProp={user} setUser={setUser}/>}/>
        <Route path="/list" element={<BookList/>}/>
      </Routes>
    </div>
  );
}

export default App;
