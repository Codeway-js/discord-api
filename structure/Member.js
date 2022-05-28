const restmanger = require('../reqmanager')
function formatColor(color) {
    if (color.startsWith('#'))
        return parseInt(color.split('#')[1], 16);
    if (color === 'RANDOM')
        return Math.floor(Math.random() * (0xffffff + 1));
    return Number(color);
}
const Role = require('./Role')
module.exports = class {
    patch(data){
        this.id = data.user.id;
        this.username = data.user.username;
        this.avatar = data.user.avatar;
        this.discriminator = data.user.discriminator;
        this.tag = `${this.username}#${this.discriminator}`;
        this.roles = data.roles;
    }
    constructor(data,token,guildID){
        this.patch(data)
        this.guildID = guildID
        this.token = token
    }
    addrole(RoleId){
        if(RoleId instanceof Role){
            RoleId=RoleId.id
        }
        restmanger("https://discord.com/api/v10/guilds/"+this.guildID+'/members/'+this.id+"/roles/"+RoleId,token,{},{method:"put"})
    }
    setThumbnail(thumbnail) {
        this.thumbnail = {};
        this.thumbnail.url = thumbnail && (0, Utils_1._testURL)(thumbnail) ? thumbnail : undefined;
        return this;
    }
    setImage(image) {
        if (!image || !(0, Utils_1._testURL)(image))
            throw new SyntaxError('[DISCORD-EMBED] No image url provided');
        this.image = {};
        this.image.url = image;
        return this;
    }
    setTimestamp(date) {
        if (date) {
            this.timestamp = date;
        }
        else {
            this.timestamp = new Date();
        }
        return this;
    }
    setColor(color) {
        if (!color || typeof color !== 'string')
            throw new SyntaxError('[DISCORD-EMBED] No color provided');
        this.color = formatColor(color);
        return this;
    }
    kick(){
        restmanger("https://discord.com/api/v10/guilds/"+this.guildID+'/members/'+this.id,token,{},{method:"delete"})
    }
    ban(){
        restmanger("https://discord.com/api/v10/guilds/"+this.guildID+'/bans/'+this.id,token,{},{method:"put"})
    }
}