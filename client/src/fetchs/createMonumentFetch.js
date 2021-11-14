import  axios from "axios"

const createMonument = (name,shortName,content,url,token)=>{

    return axios.post(process.env.REACT_APP_CREATE_MONUMENT,{"name":name,"shortName":shortName,"content":content,"url":url,'token':token})

 

}

export default createMonument

