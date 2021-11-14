import  axios from "axios"

const loginFetch = (username,password)=>{

    return axios.post(process.env.REACT_APP_LOGIN,{"username" : username,"password":password})

 

}

export default loginFetch

