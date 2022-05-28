const roles = require("./Roles")
const restmanger = require("../reqmanager")
const channels = require("./Channels")
const User = require("./User")
module.exports = class Guild {
    constructor(data, token){
        this.id=data.id
        this.name = data.name
        this.icon = data.icon
        this.splach = data.splach
        this.owner_id = data.owner_id
        this.permission = data.permission
        this. region = data.region
        this.afk_channel_id = data.afk_channel_id
        this.afk_timeout = data.afk_timeout
        this.description = data.description

        this.token=token
        this.roles = new roles(data.roles,token,this.id)
        if(data.channels){
            this.channels = new channels(data.channels,token,this.id)
        } else{
            restmanger("https://discord.com/api/v9/guilds/"+this.id+"/channels",this.token,{},{method:'get',return:true}).then(data=>{
                this.channels=new channels(data.data,token, this.id)
                console.log("finish")
            })
        }
    }
    removeban(id){
        restmanger("https://discord.com/api/v9/guilds/"+this.id+'/bans/'+id,token,{},{method:"delete"})
    }
    async getban(user){
        let result = await restmanger("https://discord.com/api/v9/guilds/"+this.id+'/bans/'+user.id,token,{},{method:"get"})
        result = JSON.parse(result)
        return {reason:result.reason,user:new User(result.user)}
    }
    async getbans(user){
        let result = await restmanger("https://discord.com/api/v9/guilds/"+this.id+'/bans/',token,{},{method:"get"})
        result = JSON.parse(result)
        let arr = []
        result.forEach(el=>{
            arr.push({reason:el.reason,user:new User(el.user)})
        })
        return arr
    }
}