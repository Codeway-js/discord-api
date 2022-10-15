const Channel = require("./Channel")
const restmanager = require("../reqmanager")
const Collection = require("./Collection")

module.exports = class Channels {
    /**
     * IDK! (Why there is a token here ?)
     * @param {ChannelsData} data 
     * @param {string} token 
     * @param {number} guild_id 
     */
    constructor(data, token, guild_id) {
       this.token = token;
       this.guild_id = guild_id;
       this.cache = new Collection();
       data.forEach(element => {
           this.cache.set(element.id, new Channel(element, token, guild_id));
       });
    //    console.log(this.cache);
    };
    /**
     * Get a channel data by its ID
     * @param {*} id 
     * @returns 
     */
    async getbyid(id) {
        let data = await restmanager("https://discord.com/api/v9/guids/"+guild_id+"/channels/"+id,this.token,{},{method:'get',return:true});
        return new Channel(data,this.token);
    };
    /**
     * Create a channel
     * @param {IDK!} option 
     */
    create(option) {
        restmanager("https://discord.com/api/v9/guids/" + guild_id + "/channels/", this.token, option, {method:'post',return:true});
    };
};