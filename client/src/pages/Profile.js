import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Card from '../components/Card'
import Header from '../components/Header'
import profileFetch from '../fetchs/profileFetch'

export default function Profile() {

    const {username} = useParams()

    const [commits, setCommits] = useState([])
    
    useEffect(() => {
        profileFetch(username)
        .then(res=>{
            setCommits(res.data.monument)
            console.log()
        
        })
    }, [username])

    return (
        <div>
            <Header/>
            <div className="container-fluid">
                <div className="row my-3">
                    <div className="col-12 col-sm-3 text-center">
                        <h4>{username}</h4>
                    </div>
                    <div className="col-12 col-sm-6 ">
                        <div className="row">
                            <div className="col-12">
                                {
                                    commits.map(data=>(<Card data={data} />))
                                }
                            
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
