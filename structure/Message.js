const restmanager = require('../reqmanager')
const channels = require("./Channels")
const author = require("./Author")
module.exports = class Message {
    initmessage(data,client) {
        this.tts = data.tts
        this.guild = client.guilds[data.guild_id]
        if(this.guild){
            this.channel = client.guilds[data.guild_id].channels[data.channel_id]
        }
        this.pinned = data.pinned
        this.mentions = data.mentions
        this.mentionsRoles = data.mentions_roles
        this.components = data.components
        this.embeds = data.embeds
        this.mentionEveryone = data.mention_everyone
        this.editedTimestamp = data.edited_timestamp
        this.attachments = data.attachments
        this.content = data.content
        this.id = data.id
        this.timestamp = data.timestamp
        this.author = new author(data.author, this._token, this.WS)
    }
    constructor(message, token, client) {
        this.token = token
        this.client = client
        this.initmessage(message, client)
    }
    reply(message) {
        if (!message) throw new Error("no message provied")
        message = `<@${this.author.id}> ${message}`
        restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/messages`, this.token, { content: message }, { method: "post" })
    }
    inlinereply(message, mention = false) {
        const payload = {
            content: message,
            message_reference: { message_id: this.id, channel_id: this.channel.id, guild_id: this.channel.guild.id },
        };
        if (!mention) {
            payload.allowed_mentions = { replied_user: false }
        }
        restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/messages`, this.token, payload, { method: "post" })
    }
    pin() {
        restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/pin/messages${this.id}`, this.token, {}, { method: "put" })
    }
    unpin() {
        restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/pin/messages${this.id}`, this.token, {}, { method: "delete" })
    }
    addemoji(emoji) {
        if (emoji.startsWith('<')) {
            emoji = emoji.replace('<:', '').replace('>', '');
        }
        restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/messages/${this.id}/reactions/${encodeURIComponent(emoji)}/@me`, this.token, {},{method:"put"})
    }
    deleteemoji(emoji,user){
        if(!user){
            user ={id:"@me"}
        }
        restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/messages/${this.id}/reactions/${encodeURIComponent(emoji)}/${user.id}`, this.token, {},{method:"delete"})
    }
    deleteallemoji(emoji){
        if(!emoji){
            restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/messages/${this.id}/reactions/${encodeURIComponent(emoji)}`, this.token, {},{method:"delete"})
        }else{
            restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/messages/${this.id}/reactions`, this.token, {},{method:"delete"})
        }
    }
    createthread(name, options){
        let obj = {
            name: name,
            auto_archive_duration: options && options.autoArchiveDuration && typeof options.autoArchiveDuration === 'string'
                ? Number(options.autoArchiveDuration)
                : 1440,
        }
        restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/messages${this.id}/threads`, this.token, obj, { method: "post" })
    }
    delete(){
        restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/messages${this.id}`, this.token, {}, { method: "delete" })
    
    }
}