module.exports = class GuildMember{
    /**
     * Function to init the data of the message, such as username, id, avatar, ...
     * @param {GuildMemberData} data 
     */
    patch(data) {
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
        };
    };
    /**
     * Basic class for Discord GuildMember
     * @param {MessageData} messagedata 
     */
    constructor(messagedata) {
        this.patch(messagedata);
    };
};