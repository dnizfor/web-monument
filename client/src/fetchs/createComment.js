const axios = require(`axios`)

const createComment = (MonumentShortName,text,token)=>{

    return axios.post(process.env.REACT_APP_CREATE_COMMENTS,{"MonumentShortName" : MonumentShortName,"text":text ,"token": token})
    

}

module.exports = createComment