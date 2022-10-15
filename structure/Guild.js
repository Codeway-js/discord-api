const Roles = require("./Roles")
const restmanager = require("../reqmanager")
const Channels = require("./Channels")
const User = require("./User")

module.exports = class Guild {
    /**
     * Basic class for Discord Guild (Why there is a token here ?)
     * @param {GuildData} data 
     * @param {string} token
     * @param {IDK!} client 
     */
    constructor(data, token, client) {
        if (typeof data != "object") {
            console.log("once");
            this.id = data;
        }
        else {
            this.id = data.id;
            this.name = data.name;
            this.icon = data.icon;
            this.splach = data.splach;
            this.owner_id = data.owner_id;
            this.permission = data.permission;
            this.region = data.region;
            this.afk_channel_id = data.afk_channel_id;
            this.afk_timeout = data.afk_timeout;
            this.description = data.description;
            this.roles = new Roles(data.roles, token, this.id);
        };
        this.token = token;
        if (data.channels) {
            this.channels = new Channels(data.channels, token, this.id);
        } else {
            restmanager("https://discord.com/api/v9/guilds/" + this.id + "/channels", this.token, {}, { method: 'get', return: true }).then(data => {
                this.channels = new Channels(data.data, token, this.id);
                // console.log("finish");
            });
            restmanager("https://discord.com/api/v9/guilds/" + this.id, this.token, {}, { method: 'get', return: true }).then(data22 => {
                const data2 = data22.data;
                // console.log(data2);
                this.id = data2.id;
                this.name = data2.name;
                this.icon = data2.icon;
                this.splach = data2.splach;
                this.owner_id = data2.owner_id;
                this.permission = data2.permission;
                this.region = data2.region;
                this.afk_channel_id = data2.afk_channel_id;
                this.afk_timeout = data2.afk_timeout;
                this.description = data2.description;
                this.roles = new Roles(data2.roles, token, this.id);
            
                if (data2.channels) {
                    this.channels = new Channels(data2.channels, token, this.id);
                };
                // client.guilds.cache.set(this.id, this);
            });
        };
    };
    /**
     * Remove the ban of a specific user
     * @param {number} id 
     */
    removeban(id) {
        restmanager("https://discord.com/api/v9/guilds/" + this.id + '/bans/' + id, token, {}, { method: "delete" });
    };
    /**
     * IDK!
     * @param {*} user 
     */
    async getban(user) {
        let result = await restmanager("https://discord.com/api/v9/guilds/" + this.id + '/bans/' + user.id, token, {}, { method: "get" });
        result = JSON.parse(result);
        return { reason: result.reason, user: new User(result.user) };
    };
    /**
     * IDK!
     * @param {*} user 
     */
    async getbans(user) {
        let result = await restmanager("https://discord.com/api/v9/guilds/" + this.id + '/bans/', token, {}, { method: "get" });
        result = JSON.parse(result);
        let arr = [];
        result.forEach(el => {
            arr.push({ reason: el.reason, user: new User(el.user) });
        });
        return arr;
    };
};