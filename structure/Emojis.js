const Emoji = require("./Emoji")
const restmanager = require("../reqmanager")
module.exports = class Emojis {
    constructor(data, token,guid_id){
       this.token = token
       this.guild_id = guid_id
       data.forEach(element => {
        this[element.id] = new Emoji(element,token,guid_id)           
    });
    }
    async getbyid(id){
        let data = await restmanager("https://discord.com/api/v9/guids/"+guild_id+"/Emojis/"+id,this.token,{},{method:'get',return:true})
        return new Emoji(data,this.token)
    }
    
}