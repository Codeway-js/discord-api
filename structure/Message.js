const MessageAttachment = require("./MessageAttachment");
const restmanager = require("../reqmanager");
const reqfilemanager = require("../reqfilemanager");
const Channel = require("./Channel");
const Author = require("./Author");
const Collection = require("./Collection");
const events = require('events');
const Guild = require("./Guild");

module.exports = class Message {
    /**
     * Function to init the data of the message, such as Guild, Channel, Mentions, ...
     * @param {MessageData} data 
     * @param {User} client 
     */
    initMessage(data, client) {
        this.tts = data.tts;
        this.guild = client.guilds.cache.get(data.guild_id);
        if (this.guild) {
            this.channel = this.guild.channels.cache.get(data.channel_id);
        } else {
            this.channel = new Channel(data.channel_id, this.token, client);
            if(data.guild_id) {
                this.guild = new Guild(data.guild_id, this.token, client);
            };
        };
        this.pinned = data.pinned;
        this.mentions = data.mentions;
        this.mentionsRoles = data.mentions_roles;
        this.components = data.components;
        this.embeds = data.embeds;
        this.mentionEveryone = data.mention_everyone;
        this.editedTimestamp = data.edited_timestamp;
        this.attachments = data.attachments;
        this.content = data.content;
        this.id = data.id;
        this.timestamp = data.timestamp;
        this.author = new Author(data.author, this._token, this.WS);
    }
    /**
     * Basic class for Discord message
     * @param {MessageData} message 
     * @param {string} token 
     * @param {User} client 
     */
    constructor(message, token, client) {
        this.token = token;
        this.client = client;
        this.initMessage(message, client);
    };
    /**
     * Make the bot ping someone before the message :
     * - `@Someone YourMessage`
     * @param {string} message 
     */
    reply(message) {
        if (!message) throw new Error("No message provided");
        message = `<@${this.author.id}> ${message}`;
        return restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/messages`, this.token, { content: message }, { method: "post" });
    };
    /**
     * Make the bot reply to this message
     * @param {string} message
     * @param {bool} mention 
     */
    inlinereply(message, mention = false) {
        const payload = {
            content: message,
            message_reference: { message_id: this.id, channel_id: this.channel.id, guild_id: this.channel.guild.id }
        };
        if (!mention) {
            payload.allowed_mentions = { replied_user: false };
        };
        return restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/messages`, this.token, payload, { method: "post" });
    };
    /**
     * Pin this message in a discord channel
     */
    pin() {
        return restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/pin/messages${this.id}`, this.token, {}, { method: "put" });
    };
    /**
     * Unpin this message in a discord channel
     */
    unpin() {
        return restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/pin/messages${this.id}`, this.token, {}, { method: "delete" });
    };
    /**
     * React to this message instance
     * @param {Emoji} emoji 
     */
    react(emoji) {
        if (emoji.startsWith('<')) {
            emoji = emoji.replace('<:', '').replace('>', '');
        };
        return restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/messages/${this.id}/reactions/${encodeURIComponent(emoji)}/@me`, this.token, {}, { method: "put" });
    };
    /**
     * Remove a user's reaction from this message
     * @param {Emoji} emoji
     * @param {User} user
     */
    deletereact(emoji, user) {
        if (!user) {
            user = { id: "@me" };
        };
        return restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/messages/${this.id}/reactions/${encodeURIComponent(emoji)}/${user.id}`, this.token, {}, { method: "delete" });
    };
    /**
     * Delete all of the reactions for a specific emoji. If you don't specify an emoji, that's just delete all of the reactions
     * @param {Emoji} emoji
     */
    deleteallreact(emoji) {
        if (!emoji) {
            return restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/messages/${this.id}/reactions/${encodeURIComponent(emoji)}`, this.token, {}, { method: "delete" });
        } else {
            return restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/messages/${this.id}/reactions`, this.token, {}, { method: "delete" });
        };
    };
    /**
     * IDK!
     * @param {*} name 
     * @param {*} options 
     */
    createthread(name, options) {
        let obj = {
            name: name,
            auto_archive_duration: options && options.autoArchiveDuration && typeof options.autoArchiveDuration === 'string'
                ? Number(options.autoArchiveDuration)
                : 1440,
        };
        return restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/messages${this.id}/threads`, this.token, obj, { method: "post" });
    };
    /**
     * Delete this message
     */
    delete() {
        return restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/messages${this.id}`, this.token, {}, { method: "delete" });
    };
    /**
     * Modify this message with a new one
     * @param {string} message
     */
    edit(message) {
        if (!message) throw new Error('Message is not provided');
        let payload = {
            content: '',
            embeds: [],
            components: []
        };
        if (option instanceof MessageAttachment) {
            payload = message;
            return reqfilemanager("https://discord.com/api/v9/channels/" + this.id + "/messages", this.token, payload, option.file, option.name);
        }
        switch (typeof message) {
            case 'string':
                payload.content = message;
                break;
            case "number":
                payload.content = String(message);
                break;
            case "object":
                try {
                    payload.embeds = [message.getJSON()];
                }
                catch (err) {
                    throw new Error('Invalid Embeds');
                };
        };
        if (option.embeds) {
            payload.embeds.push(option.embeds);
        };
        if (option.components) {
            payload.components.push(option.components.toJSON());
        };
        if (option.attachment instanceof MessageAttachment) {
            reqfilemanager("https://discord.com/api/v9/channels/" + this.id + "/messages", this.token, payload, option.attachment.file, option.attachment.name);
        };
        return restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/messages${this.id}`, this.token, payload, { method: "patch" });
    };
    /**
     * IDK!
     * @param {*} filter 
     * @param {*} options 
     */
    awaitReactions(filter, options) {
        if (!options.max) options.max = Infinity;
        if (!options.time) options.time = 30000;
        let reactions = new Collection();
        let num = 0;
        return new Promise((resolve, reject) => {
            this.client.on('messageReactionAdd', reaction => {
                if (reaction.message.id === this.id) {
                    if (filter(reaction, reaction.users)) {
                        reactions.set(reaction.emoji.id, reaction);
                        if (num >= options.max) {
                            resolve(reaction);
                            this._end();
                        };
                    };
                };
            });
            setTimeout(() => {
                if (options.error.find(el => el == 'timeout' || el == 'time')) {
                    this._end();
                    return resolve(reactions);
                };
                this._end();
                reject(new Error('Timeout'));
            }, options.time);
        });
    };
    /**
     * IDK!
     */
    createReactionCollector() {
        var eventEmitter = new events.EventEmitter();
        
        new Promise((resolve, reject) => {
            this.client.on('messageRecationAdd', reaction => {
                if (reaction.message.id === this.id) {
                    if (filter(reaction, reaction.users)) {
                        reactions.set(reaction.emoji.id, reaction);
                        if (num >= options.max) {
                            resolve(reaction);
                            this._end();
                        };
                    };
                };
            });
            setTimeout(() => {
                if (options.error.find(el => el == 'timeout' || el == 'time')) {
                    this._end();
                    return resolve(reactions);
                };
                this._end();
                reject(new Error('Timeout'));
            }, options.time);

        }).then(res => {
            eventEmitter.emit("end", res);
        });
        return eventEmitter;
    };
    /**
     * IDK!
     */
    crosspost() {
        return restmanager(`https://discord.com/api/v10/channels/${this.channel.id}/messages${this.id}/crosspost`, this.token, {}, { method: "post" });
    };
    /**
     * Return you the content of this message
     */
    toString() {
        return this.content;
    };
    /**
     * IDK!
     */
    _end() {
        removeListener('messageRecationAdd', reaction => {
            if (reaction.message.id === this.id) {
                if (filter(reaction, reaction.users)) {
                    reactions.set(reaction.emoji.id, reaction);
                    if (num >= options.max) {
                        resolve(reaction);
                        this._end();
                    };
                };
            };
        });
    };
};
