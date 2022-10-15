const Message = require("./Message")
const Member = require("./Member")
const reqmanager = require("../reqmanager")

module.exports = class Interaction {
    /**
     * Basic class for Discord Interaction (Why there is a token here ?)
     * @param {InteractionData} data 
     * @param {string} token 
     * @param {IDK!} client 
     */
    constructor(data, token, client) {
        this.token = token;
        this.type = data.type;
        this.interactiontoken = data.token;
        if (data.message) this.message = new Message(data.message, this.token, client);
        this.member = new Member(data.member);
        this.id = data.id;
        this.custom_id = data.data.custom_id;
        this.guild = client.guilds[data.guild_id];
        this.channel = this.guild.channels[data.channels_id];
        this.data = data.data;
        if (this.type == 2) {
            this.command = true;
            this.commandName = data.data.name;
        }
        if (this.type == 5) {
            this.modal == true;
        };
    };
    /**
     * Reply to an interaction
     * @param {IDK!} interaction 
     */
    reply(interaction) {
        reqmanager(`https://discord.com/api/v10/interactions/${this.id}/${this.interactiontoken}/callback`, this.token, interaction.toJSON(), { method: "post" }).then(t => console.log(t))
    };
};