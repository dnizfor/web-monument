import  axios from "axios"

const registerFetch = (username,mail,password)=>{

    return axios.post(process.env.REACT_APP_REGISTER,{"username" : username,"mail": mail,"password":password})

}

export default registerFetch

