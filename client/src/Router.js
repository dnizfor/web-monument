import React  from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate 
} from "react-router-dom";
import { useSelector , useDispatch  } from 'react-redux'
import { login, setToken, setUsername } from './contexts/authSlice'
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home";
import Monument from "./pages/Monument";
import CreatePage from "./pages/CreatePage";
import Profile from "./pages/Profile";


export default function App() {

  
  const dispatch = useDispatch()

  if (window.localStorage.getItem("monument-auth") === "true") {
       
    const token = window.localStorage.getItem("monument-token")  
    const username = window.localStorage.getItem("monument-username")  

    dispatch(login())   
    dispatch(setToken(token)) 
    dispatch(setUsername(username)) 
    
  }
  
  const loggedIn = useSelector((state)=>state.auth.value)
  const username = useSelector((state)=>state.auth.username)

  return (
    <Router>
      <div>
        
        <Routes>
          
          <Route path="/:MonumentShortName" element={<Monument />}  />
          <Route path="/p/:username" element={<Profile />}  />
          <Route path="/u/create" element={loggedIn ? <CreatePage /> : <Navigate  to="/" />} />
          <Route path="/u/register" element={loggedIn ? <Navigate  to="/" />  : <Register />} />
          <Route path="/u/login" element={loggedIn ? <Navigate  to="/" /> : <Login />}  />
          <Route path="/"  element={loggedIn ?<Navigate  to={`/p/${username}`} /> :<Home />} />

        </Routes>
      </div>
    </Router>
  )
}