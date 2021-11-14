import React from 'react'
import { Link } from 'react-router-dom'
import monumentImage from "../assets/monument.png"
import "./home.css"

export default function Home() {
    return (
        <div>
            <div className="container">
            <div id="home-row" className="row">
            <div className="col-12 mt-3 d-flex  flex-column justify-content-center align-items-center">
                <img className="img-fluid" src={monumentImage} alt="img"/>
            </div>
            <div className="col-12 mt-3 d-flex flex-column justify-content-center align-items-center">

                <h2>Online Monument</h2>
                <p>Live Monument for Unforgettable </p>
                <Link className="btn btn-primary" to="/u/login">Join!</Link>

            </div>

            </div>

            </div>
            
        </div>
    )
}
