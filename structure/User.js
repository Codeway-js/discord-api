const badges = require("./badge")
module.exports = class{
    patch(data){
        this.avatar = data.avatar;
        this.id = data.id;
        this.discriminator = data.discriminator;
        this.username = data.username;
        this.badges = new badges(data.public_flags);
        this.tag = `${this.username}#${this.discriminator}`;
        this.bot = data.bot ? true : false;
    }
    constructor(messagedata,token){
        this.token = token
        this.patch(messagedata)
    }
}