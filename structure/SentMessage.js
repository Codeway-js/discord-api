const Channel = require("./Channel")
const GuildMember = require("./Guildmember")
const restmanager = require("../reqmanager")
module.exports = class SentMessage{
    patchdata(data){
        this.channel = new Channel(data.channel_id, data.guild_id, this._token);
            this.content = data.content;
            this.author = new GuildMember(data);
            this.id = data.id;
            this.timestamp = data.timestamp;
            this.tts = data.tts;
            this.pinned = data.pinned;
            this.mentions = data.mentions;
            this.mentionsRoles = data.mentions_roles;
            this.components = data.components;
            this.embeds = data.embeds;
            this.mentionEveryone = data.mention_everyone;
            this.editedTimestamp = data.edited_timestamp;
            this.attachments = data.attachments;
    }
    constructor(token,data){
        this.token = token
        this.patchdata(JSON.parse(data))
    }
    delete(){
        restmanager("https://discord.com/api/v10/channels/"+this.channel.id+"/messages/"+this.id,this.token,{},{method:"delete"})

    }
    edit(message,option){
        if(!message) throw new Error('Message not provied')
        const payload = {
            content: '',
            embeds: [],
            components: [],
        };
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
            default:
                console.log(typeof message)
        }
        if(option){
            payload.embeds.push(option)
        }
        restmanager("https://discord.com/api/v10/channels/"+this.channel.id+"/messages/"+this.id,this.token,payload,{method:"patch"})
    }
    pin(){
        restmanager("https://discord.com/api/v10/channels/"+this.channel.id+"/pins/messages",this.token,payload,{method:"put"})
    }
    unpin(){
        restmanager("https://discord.com/api/v10/channels/"+this.channel.id+"/pins/messages",this.token,payload,{method:"put"})
    }
}