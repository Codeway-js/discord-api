const Member = require('./Member')
const restmanager = require('../reqmanager')

module.exports = class Reaction {
    /**
     * Basic class for Discord Reaction (Why there is a token here ?)
     * @param {ReactionData} data 
     * @param {string} token 
     * @param {number} client 
     */
    constructor(data, token, client) {
        this.id = data.emoji.id;
        this.guild_id = data.guild_id;
        this.guild = client.guilds[this.guild_id];
        this.name = data.emoji.name;
        if(data.user_id) {
            this.user = client.users[data.user_id];
            this.user_id = data.user_id;
        };
        this.message_id = data.message_id;
        if(data.member) {
            this.member = new Member(data.member,token, this.guild_id);
        };
        this.token=token;
    };
};