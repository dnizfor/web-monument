import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { exit, setToken } from '../contexts/authSlice'


function Header() {

    const loggedIn = useSelector((state) => state.auth.value)
    const username = useSelector((state) => state.auth.username)

    const dispatch = useDispatch()

    const logout = ()=>{

        dispatch(exit())
        dispatch(setToken(""))
        window.localStorage.removeItem("monument-auth")
        window.localStorage.removeItem("monument-token")
     
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container">
                    <Link className="navbar-brand" to="/">Monument</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse " id="navbarSupportedContent">

                        {
                            loggedIn ?

                                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                                    <li class="nav-item">
                                        <Link className="nav-link" to={`/p/${username}`}>Profile</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link className="nav-link" to="/u/create">Create</Link>
                                    </li>
                                    <li class="nav-item">
                                        <button onClick={()=>logout()} className="nav-link bg-transparent border-0" to="/u/create">Logout</button>
                                    </li>

                                </ul>

                                :

                                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                                    <li class="nav-item">
                                        <Link className="nav-link" to="/u/login">Login</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link className="nav-link" to="/u/register">Register</Link>
                                    </li>
                                </ul>





                        }

                    </div>
                </div>
            </nav>

        </div>
    )
}

export default React.memo(Header)