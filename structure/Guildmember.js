module.exports = class GuildMember{
    patch(data){
        if (data.user !== undefined) {
            this.username = data.user.username;
            this.discriminator = data.user.discriminator;
            this.id = data.user.id;
            this.guildID = data.guild_id;
            this.avatar = data.user.avatar;
        }
        else if (data.author !== undefined) {
            this.username = data.author.username;
            this.discriminator = data.author.discriminator;
            this.id = data.author.id;
            this.guildID = data.guild_id;
            this.avatar = data.author.avatar;
        }
    }
    constructor(messagedata) {
        this.patch(messagedata)
    }
    
}