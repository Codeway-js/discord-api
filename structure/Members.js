const Member = require("./Member")
const restmanager = require("../reqmanager")
module.exports = class Members {
    constructor(data, token,guid_id){
       this.token = token
       this.guild_id = guid_id
       data.forEach(element => {
        this[element.id] = new Member(element,token,guid_id)           
    });
    }
    async getbyid(id){
        let data = await restmanager("https://discord.com/api/v10/guids/"+guild_id+"/Members/"+id,this.token,{},{method:'get',return:true})
        return new Member(data,this.token)
    }
    
}