const messageAttachment = require("./MessageAttachment")
const restmanager = require("../reqmanager")
const reqfilemanager = require("../reqfilemanager")
const channel = require("./Channel")
const author = require("./Author")
const Collection = require("./Collection")
const events = require('events');
const Guild = require("./Guild")
module.exports = class Message {
    initmessage(data, client) {
        this.tts = data.tts
        this.guild = client.guilds.cache.get(data.guild_id)
        if (this.guild) {
            this.channel = this.guild.channels.cache.get(data.channel_id)
        }else {
            this.channel = new channel(data.channel_id, this.token, client)
            if(data.guild_id){
                this.guild = new Guild(data.guild_id, this.token, client)
            }
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
        return restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/messages`, this.token, { content: message }, { method: "post" })
    }
    inlinereply(message, mention = false) {
        const payload = {
            content: message,
            message_reference: { message_id: this.id, channel_id: this.channel.id, guild_id: this.channel.guild.id },
        };
        if (!mention) {
            payload.allowed_mentions = { replied_user: false }
        }
        return restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/messages`, this.token, payload, { method: "post" })
    }
    pin() {
        return restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/pin/messages${this.id}`, this.token, {}, { method: "put" })
    }
    unpin() {
        return restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/pin/messages${this.id}`, this.token, {}, { method: "delete" })
    }
    react(emoji) {
        if (emoji.startsWith('<')) {
            emoji = emoji.replace('<:', '').replace('>', '');
        }
        return restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/messages/${this.id}/reactions/${encodeURIComponent(emoji)}/@me`, this.token, {}, { method: "put" })
    }
    deletereact(emoji, user) {
        if (!user) {
            user = { id: "@me" }
        }
        return restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/messages/${this.id}/reactions/${encodeURIComponent(emoji)}/${user.id}`, this.token, {}, { method: "delete" })
    }
    deleteallreact(emoji) {
        if (!emoji) {
            return restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/messages/${this.id}/reactions/${encodeURIComponent(emoji)}`, this.token, {}, { method: "delete" })
        } else {
            return restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/messages/${this.id}/reactions`, this.token, {}, { method: "delete" })
        }
    }
    createthread(name, options) {
        let obj = {
            name: name,
            auto_archive_duration: options && options.autoArchiveDuration && typeof options.autoArchiveDuration === 'string'
                ? Number(options.autoArchiveDuration)
                : 1440,
        }
        return restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/messages${this.id}/threads`, this.token, obj, { method: "post" })
    }
    delete() {
        return restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/messages${this.id}`, this.token, {}, { method: "delete" })
    }
    edit(message) {
        if (!message) throw new Error('Message not provied')
        let payload = {
            content: '',
            embeds: [],
            components: [],
        };
        if (option instanceof messageAttachment) {
            payload = message
            return reqfilemanager("https://discord.com/api/v9/channels/" + this.id + "/messages", this.token, payload, option.file, option.name)
        }
        switch (typeof message) {
            case 'string':
                payload.content = message
                break
            case "number":
                payload.content = String(message)
                break
            case "object":
                try {
                    payload.embeds = [message.getJSON()];
                }
                catch (err) {
                    throw new Error('Invalid Embeds')
                }
        }
        if (option.embeds) {
            payload.embeds.push(option.embeds)
        }
        if (option.components) {
            payload.components.push(option.components.toJSON())
        }
        if (option.attachment instanceof messageAttachment) {
            reqfilemanager("https://discord.com/api/v9/channels/" + this.id + "/messages", this.token, payload, option.attachment.file, option.attachment.name)
        }
        return restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/messages${this.id}`, this.token, payload, { method: "patch" })
    }
    awaitReactions(filter, options) {
        if (!options.max) options.max = Infinity
        if (!options.time) options.time = 30000
        let reactions = new Collection()
        let num = 0
        return new Promise((resolve, reject) => {
            this.client.on('messageRecationAdd', reaction => {
                if (reaction.message.id === this.id) {
                    if (filter(reaction, reaction.users)) {
                        reactions.set(reaction.emoji.id, reaction)
                        if (num >= options.max) {
                            resolve(reaction)
                            this._end()
                        }
                    }
                }
            })
            setTimeout(() => {
                if (options.error.find(el => el == 'timeout' || el == 'time')) {
                    this._end()
                    return resolve(reactions)
                }
                this._end()
                reject(new Error('Timeout'))
            }, options.time)

        })
    }
    createReactionCollector() {
        var eventEmitter = new events.EventEmitter();
        
        new Promise((resolve, reject) => {
            this.client.on('messageRecationAdd', reaction => {
                if (reaction.message.id === this.id) {
                    if (filter(reaction, reaction.users)) {
                        reactions.set(reaction.emoji.id, reaction)
                        if (num >= options.max) {
                            resolve(reaction)
                            this._end()
                        }
                    }
                }
            })
            setTimeout(() => {
                if (options.error.find(el => el == 'timeout' || el == 'time')){
                    this._end()
                    return resolve(reactions)
                } 
                this._end()
                reject(new Error('Timeout'))
            }, options.time)

        }).then(res => {
            eventEmitter.emit("end", res);
        })
        return eventEmitter
    }
    crosspost() {
        return restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/messages${this.id}/crosspost`, this.token, {}, { method: "post" })
    }
    toString(){
        return this.content
    }
    _end() {
        removeListener('messageRecationAdd', reaction => {
            if (reaction.message.id === this.id) {
                if (filter(reaction, reaction.users)) {
                    reactions.set(reaction.emoji.id, reaction)
                    if (num >= options.max) {
                        resolve(reaction)
                        this._end()
                    }
                }
            }
        })
        
    }
}
