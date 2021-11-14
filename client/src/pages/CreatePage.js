import React, { useState } from 'react'
import { useFormik } from 'formik';
import validations from "../validations/createMonument"
import createMonument from "../fetchs/createMonumentFetch"
import "./createPage.css"
import { useDispatch,useSelector} from 'react-redux'
import { exit, setToken } from '../contexts/authSlice'
import { Navigate } from 'react-router';
import Header from "../components/Header"


export default function CreatePage() {


    const [error, setError] = useState("")
    const [redirect, setRedirect] = useState("")

    const dispatch = useDispatch()

    const token = useSelector((state)=>state.auth.token)

    const formik = useFormik({
        initialValues: {
            monumentName: '',
            monumentShortName: '',
            monumentPhotoLink: '',
            monumentContents: '',
        },
        onSubmit: (values) => {

            const monumentPhotoLink = JSON.parse(JSON.stringify(values)).monumentPhotoLink
            const monumentName = JSON.parse(JSON.stringify(values)).monumentName
            const monumentShortName = JSON.parse(JSON.stringify(values)).monumentShortName
            const monumentContents = JSON.parse(JSON.stringify(values)).monumentContents

            createMonument(monumentName,monumentShortName,monumentContents,monumentPhotoLink,token)

                .then(res => {

                    if (res.status === 204) {

                        setError("this short name already in use")
                        

                    }else if(res.status === 203){
                        dispatch(exit())
                        dispatch(setToken(""))
                        window.localStorage.removeItem("monument-auth")
                        window.localStorage.removeItem("monument-token")
                        console.log(`hataaaa`)

                    }
                     else if (res.status === 200) {
                         
                        setRedirect(`${res.data.shortName}`)

                        
                       

                    }
                })
        },
        validationSchema: validations,

    })

    if(redirect !== ""){
        return <Navigate to={`/${redirect}`}/>
    }
    return (
        <div>
            <Header/>

            <div className="container">
                <div id="create-row" className="row d-flex ">

                    <form className="col-7 mx-auto my-auto" onSubmit={formik.handleSubmit}>
                        {error && <div class="alert alert-danger" role="alert"> {error}</div>}
                        <div class="mb-3">
                            <label for="monumentName" class="form-label">Monument Name </label>
                            <input id="monumentName" type="text" className="form-control" name="monumentName" placeholder="monumentName" onChange={formik.handleChange} value={formik.values.monumentName} onBlur={formik.handleBlur} />
                            {formik.errors.monumentName && formik.touched.monumentName && <p class="text-danger" role="alert"> {formik.errors.monumentName}</p>}

                        </div>
                        <div class="mb-3">
                            <label for="monumentShortName" class="form-label">Monument Short Name </label>
                            <input id="monumentShortName" type="text" className="form-control" name="monumentShortName" placeholder="monumentShortName" onChange={formik.handleChange} value={formik.values.monumentShortName} onBlur={formik.handleBlur} />
                            {formik.errors.monumentShortName && formik.touched.monumentShortName && <p class="text-danger" role="alert"> {formik.errors.monumentShortName}</p>}
                        </div>
                        <div class="mb-3">
                            <label for="monumentPhotoLink" class="form-label">Monument Photo Link </label>
                            <input id="monumentPhotoLink" type="text" className="form-control" name="monumentPhotoLink" placeholder="monumentPhotoLink" onChange={formik.handleChange} value={formik.values.monumentPhotoLink} onBlur={formik.handleBlur} />
                            {formik.errors.monumentPhotoLink && formik.touched.monumentPhotoLink && <p class="text-danger" role="alert"> {formik.errors.monumentPhotoLink}</p>}
                        </div>
                        <div class="mb-3">
                            <label for="monumentContents" class="form-label">Monument Contents </label>
                            <textarea id="monumentContents" type="text" className="form-control" name="monumentContents" placeholder="monumentContents" onChange={formik.handleChange} value={formik.values.monumentContents} onBlur={formik.handleBlur} />
                            {formik.errors.monumentContents && formik.touched.monumentContents && <p class="text-danger" role="alert"> {formik.errors.monumentContents}</p>}
                        </div>

                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>


                </div>

            </div>




        </div>
    )
}
