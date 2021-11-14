const axios = require(`axios`)

const getComments = (MonumentShortName)=>{

    return axios.post(process.env.REACT_APP_GET_MONUMENT,{"MonumentShortName" : MonumentShortName})

}

module.exports = getComments