const Role = require("./Role")
const restmanager = require("../reqmanager")
module.exports = class Roles {
    constructor(data, token,guid_id){
       this.token = token
       this.guild_id = guid_id
       data.forEach(element => {
        this[element.id] = new Role(element,token,guid_id)           
    });
    }
    async getbyid(id){
        let data = await restmanager("https://discord.com/api/v10/guids/"+guild_id+"/roles/"+id,this.token,{},{method:'get',return:true})
        return new Role(data,this.token)
    }
    
}