module.exports = class Role {
    constructor(data, token, guild_id){
        this.guild_id = guild_id
        this.id = data.id
        this.name = data.name
        this.color = data.color
        this.hoist = data.hoist
        this.urlicon = "https://cdn.discordapp.com/role-icons/"+this.id+"/"+data.icon+".png"
        this.token=token
        this.position = data.position
        this.permition = data.permition
        this.mentionable = data.mentionable
    }
    
}