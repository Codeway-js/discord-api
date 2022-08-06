const messageAttachment = require("./MessageAttachment")
const restmanager = require("../reqmanager")
const reqfilemanager = require("../reqfilemanager")
module.exports = class Channel{
    constructor(data,token,guildid){
        if(typeof data =="object"){
        this.id = data.id
        this.name = data.name
        this.guildid = data.guild_id
        this.position = data.position
        this.permission_overwrite = data.permission_overwrites
        this.topic = data.topic
        this.nsfw = data.nsfw
        this.lastmsgid = data.last_message_id
        this.bitrate = data.bitrate
        this.user_limit = data.user_limit
        this.icon = data.icon
        this.owner_id = data.owner_id
        this.parent_id = data.parent_id
        this.message_count = data.message_count
        this.member_count = data.member_count
        this.permission = data.permission
        this.type = data.type 
        }else {
            this.id = data
        }
        this.token = token

    }
    send(message, option){
        if(!message) throw new Error('Message not provied')
        let payload = {
            content: '',
            embeds: [],
            components: [],
        };
        if(option instanceof messageAttachment){
            payload = message
            return reqfilemanager("https://discord.com/api/v9/channels/"+this.id+"/messages",this.token, payload, option.file, option.name)
        }
        switch(typeof message){
            case 'string':
                payload.content=message
                break
            case "number":
                payload.content = String(message)
                break
            case "object":
                try{
                    payload.embeds = [message.getJSON()];
                }
                catch(err){
                    throw new Error('Invalid Embeds')
                }
        }
        if(option.embeds){
            payload.embeds.push(option.embeds)
        }
        if(option.components){
            payload.components.push(option.components.toJSON())
        }
        if(option.attachment instanceof messageAttachment){
            reqfilemanager("https://discord.com/api/v9/channels/"+this.id+"/messages",this.token, payload, option.attachment.file, option.attachment.name)
        }
        restmanager("https://discord.com/api/v10/channels/"+this.id+"/messages",this.token,payload,{method:"post"})


    }
}