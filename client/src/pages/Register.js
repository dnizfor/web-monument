import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import "./register.css"
import validations from "../validations/register"
import { login, setToken ,setUsername } from '../contexts/authSlice'
import registerFetch from '../fetchs/registerFetch'
import Header from '../components/Header'



export default function Register() {

    const [error, setError] = useState("")

    let dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            password: '',
            username: '',
            email: ``,
        },
        onSubmit: (values) => {

            const username = JSON.parse(JSON.stringify(values)).username
            const password = JSON.parse(JSON.stringify(values)).password
            const email = JSON.parse(JSON.stringify(values)).email

            registerFetch(username, email, password)

                .then(res => {

                    if (res.status === 204) {

                        setError("This user already exist")
                        console.log(res);

                    } else if (res.status === 200) {

                        dispatch(login())
                        dispatch(setUsername(username))
                        dispatch(setToken(res.data.token))
                        window.localStorage.setItem("monument-username",username)
                        window.localStorage.setItem("monument-auth", true)
                        window.localStorage.setItem("monument-token", res.data.token)

                    }
                })
        },
        validationSchema: validations,

    })

    return (
        <div>
            <Header/>
            <div className="container">
                <div id="register-row" className="row">

                    <form className="col-6 mx-auto d-flex justify-content-center align-items-center" onSubmit={formik.handleSubmit}>
                        <div>
                            {error && <div class="alert alert-danger" role="alert"> {error}</div>}
                            {formik.errors.username && formik.touched.username && <div class="alert alert-danger" role="alert"> {formik.errors.username}</div>}
                            {formik.errors.email && formik.touched.email && <div class="alert alert-danger" role="alert"> {formik.errors.email}</div>}
                            {formik.errors.password && formik.touched.password && <div class="alert alert-danger" role="alert"> {formik.errors.password}</div>}
                            <div className="mb-3">
                                <label for="username" className="form-label">username </label>
                                <input id="username" type="username" className="form-control" name="username" placeholder="username" onChange={formik.handleChange} value={formik.values.username} onBlur={formik.handleBlur} />
                            </div>
                            <div className="mb-3">
                                <label for="email" className="form-label">Email address</label>
                                <input id="email" type="email" className="form-control" name="email" placeholder="email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label for="password" className="form-label">Password</label>
                                <input id="password" type="password" className="form-control" name="password" placeholder="password" onChange={formik.handleChange} value={formik.values.password}  onBlur={formik.handleBlur} />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>


                </div>

            </div>



        </div>
    )
}
