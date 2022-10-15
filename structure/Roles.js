const Role = require("./Role")
const Collection = require("./Collection")
const restmanager = require("../reqmanager")

module.exports = class Roles {
    /**
     * IDK! (Why there is a token here ?)
     * @param {Role[]} data 
     * @param {string} token 
     * @param {number} guild_id 
     */
    constructor(data, token, guild_id) {
        this.token = token;
        this.guild_id = guild_id;
        this.cache = new Collection();
        data.forEach(element => {
            this.cache.set(element.id, new Role(element, token, guild_id));
        });
    };
    /**
     * Get a role data by its ID
     * @param {number} id 
     */
    async getbyid(id) {
        let data = await restmanager("https://discord.com/api/v10/guids/" + guild_id + "/roles/" + id, this.token, {}, {method:'get',return:true});
        return new Role(data, this.token);
    };
    
}