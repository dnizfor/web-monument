const axios = require(`axios`)

const profileFetch = (username)=>{

    return axios.post(process.env.REACT_APP_GET_PROFILE,{"username" : username})

}

module.exports = profileFetch