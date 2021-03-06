const Channel = require("./Channel")
const restmanager = require("../reqmanager")
module.exports = class Channels {
    constructor(data, token,guid_id){
       this.token = token
       this.guild_id = guid_id
       
       data.forEach(element => {
           this[element.id] = new Channel(element,token,guid_id)           
       });
       console.log(this)
    }
    async getbyid(id){
        let data = await restmanager("https://discord.com/api/v9/guids/"+guild_id+"/channels/"+id,this.token,{},{method:'get',return:true})
        return new Channel(data,this.token)
    }
    create(option){
        restmanager("https://discord.com/api/v9/guids/"+guild_id+"/channels/",this.token,option,{method:'post',return:true})
    }
}