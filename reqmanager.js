const axios = require("axios").default
module.exports = async function (urlgive, token, data, option) {
    let axiosoption = {
        method: option.method.toUpperCase(),
        "url": urlgive,
        headers: { Authorization: 'Bot ' + token, "Content-Type": 'application/json' },
        credentials: 'include',
    }
    if(option.header){
        axiosoption.headers["Content-Type"] = option.header
        
    }
    if (option.method != "get" && option.method != "delete" && !option.callback) {
        axiosoption.data = data
        // console.log(axiosoption)
        return axios(axiosoption)
    }
    else {
        return await axios(axiosoption)
    }
}