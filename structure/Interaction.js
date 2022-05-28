const message = require("./Message")
const member = require("./Member")
const reqmanager = require("../reqmanager")
module.exports = class Interaction {
    constructor(data, token, client) {
        this.token = token
        this.type = data.type
        this.interactiontoken = data.token
        if (data.message) this.message = new message(data.message, this.token, client)
        this.member = new member(data.member)
        this.id = data.id
        this.custom_id = data.data.custom_id
        this.guild = client.guilds[data.guild_id]
        this.channel = this.guild.channels[data.channels_id]
        this.data = data.data
        if (this.type == 2) {
            this.command = true
            this.commandName = data.data.name

        }
        if (this.type == 5) {
            this.modal == true

        }
    }
    reply(interaction) {
        reqmanager(`https://discord.com/api/v10/interactions/${this.id}/${this.interactiontoken}/callback`, this.token, interaction.toJSON(), { method: "post" }).then(t => console.log(t))
    }
}