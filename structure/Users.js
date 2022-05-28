const restmanager = require("../reqmanager")
const User =require('./User')
module.exports = class {
    constructor(token){
        this.token = token
    }
    async getbyid(id){
        let res = await restmanager('https://discord.com/api/v10/users/'+id,this.token,{},{method:"get",return:true})
        return new User(JSON.parse(res),this.token)
    }
}