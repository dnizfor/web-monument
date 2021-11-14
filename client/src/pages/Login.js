import React,{useState} from 'react'
import { useFormik } from 'formik';
import validations from "../validations/login"
import loginFetch from "../fetchs/loginFetch"
import "./login.css"
import { useDispatch } from 'react-redux'
import { login , setToken , setUsername} from '../contexts/authSlice'
import Header from '../components/Header';

export default function Login() {

    const [error, setError] = useState("")

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            password: '',
            username: '',
        },
        onSubmit: (values) => {

            const username = JSON.parse(JSON.stringify(values)).username
            const password = JSON.parse(JSON.stringify(values)).password
 
            loginFetch(username, password)

                .then(res => {

                    if(res.status === 204 ){

                        setError("false username or password") 

                    }else if(res.status === 200){

                        dispatch(login())
                        dispatch(setToken(res.data.token))
                        dispatch(setUsername(username))
                        window.localStorage.setItem("monument-auth",true)
                        window.localStorage.setItem("monument-username",username)
                        window.localStorage.setItem("monument-token",res.data.token)
                     
                    }
                })
        },
        validationSchema: validations,

    })


    return (
        <div>
            <Header/>
            <div className="container">
                <div id="login-row" className="row">


                    <form className="col-6 mx-auto d-flex justify-content-center align-items-center " onSubmit={formik.handleSubmit}>
                        <div >
                            {error &&  <div class="alert alert-danger" role="alert"> {error}</div>}
                            {formik.errors.username && formik.touched.username && <div class="alert alert-danger" role="alert"> {formik.errors.username}</div>}
                            {formik.errors.password && formik.touched.password && <div class="alert alert-danger" role="alert"> {formik.errors.password}</div>}

                            <div class="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input id="username" type="username" className="form-control" name="username" placeholder="username" onChange={formik.handleChange} value={formik.values.username} onBlur={formik.handleBlur} />
                                <div id="usernameHelp" className="form-text">We'll never share your username with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input id="password" type="password" className="form-control" name="password" placeholder="password" onChange={formik.handleChange} value={formik.values.password}  onBlur={formik.handleBlur}/>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>



                </div>

            </div>

        </div>
    )
}
