import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { useParams } from 'react-router'
import getComments from '../fetchs/getComments';
import getMonuments from "../fetchs/getMonument"
import { useDispatch, useSelector } from 'react-redux'
import { exit, setToken } from '../contexts/authSlice'
import { useFormik } from 'formik';
import createComment from '../fetchs/createComment';
import "./monument.css"
import Header from '../components/Header';


export default function Monument() {

    const { MonumentShortName } = useParams();
    const [comments, setComments] = useState([])
    const [monument, setMonument] = useState([])
    const [error, setError] = useState("")
    const token = useSelector((state) => state.auth.token)
    const loggedIn = useSelector((state) => state.auth.value)
    const username = useSelector((state) => state.auth.username)
    const dispatch = useDispatch()


    useEffect(() => {
        getComments(MonumentShortName)
            .then(res => {
                setComments(res.data.comments)
            })
            .catch(err => console.log(err))
        getMonuments(MonumentShortName)
            .then(res => {
                setMonument(res.data.monument)
            })
            .catch(err => console.log(err))

    



    }, [MonumentShortName])

    const formik = useFormik({
        initialValues: {
            comment: '',
        },
        onSubmit: (values) => {

            const comment = JSON.parse(JSON.stringify(values)).comment

            createComment(MonumentShortName, comment, token)
                .then(res => {

                    if (res.status === 204) {

                        setError("this short name already in use")


                    } else if (res.status === 203) {
                        dispatch(exit())
                        dispatch(setToken(""))
                        window.localStorage.removeItem("monument-auth")
                        window.localStorage.removeItem("monument-token")

                    }else if(res.status === 200){

                   
                        setComments([...comments , {username : username , text :comment }])
               



                    }
                })
        },

    })

    return (
        <div>
            <Header/>
            <div className="container">
                <div className="row">
                    <div className="col-12">

                        <div id="monument-header" className="row mt-2">
                            <div className="col-7 col-sm-5  h-100 d-flex justify-content-end  ">

                              
                                <img className=" h-75 rounded-circle" alt="img" src={monument.path} />

                            </div>

                            <div className="col-5 ">

                                <div className="w-100 h-25 d-flex align-items-end">
                                <h5 className="">
                                    {monument.name}
                                </h5>
                                </div>

                                <div className="w-100 h-75 d-flex align-items-center ">
                                <p>{monument.content}</p>
                                </div>

                               

                            </div>
                        </div>



                    </div>
                </div>

            </div>

            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 mx-auto ">

                        {
                            loggedIn &&

                            <form class="row g-2" onSubmit={formik.handleSubmit}>
                                {error && <div class="alert alert-danger" role="alert"> {error}</div>}
                                <div class="col-9">
                                    <textarea type="text" class="form-control w-100" id="comment" name="comment" placeholder="Your Commit" onChange={formik.handleChange} value={formik.values.comment} onBlur={formik.handleBlur} />
                                    {formik.errors.comment && formik.touched.comment && <p class="text-danger" > {formik.errors.comment}</p>}
                                </div>
                                <div class="col-3  ">
                                    <button type="submit" class="btn btn-primary mb-3 h-100 w-100">Share!</button>
                                </div>
                            </form>
                        }

                        {
                            comments.map(commit => (<Card data={commit} />))
                        }



                    </div>

                </div>

            </div>

        </div>
    )
}
