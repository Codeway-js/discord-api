const member = require('./Member')
const restmanager = require('../reqmanager')
module.exports = class Reaction {
    constructor(data, token, client){
        this.id = data.emoji.id
        this.guild_id = data.guild_id
        this.guild = client.guilds[this.guild_id]
        this.name = data.emoji.name
        this.user_id = data.user_id
        this.users = this.guild.members[this.user_id]
        this.message_id = data.message_id
        if(data.member){
            this.member = new member(data.member,token, this.guild_id)
        }
        this.token=token
    }
    
}