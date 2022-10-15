const Member = require("./Member");
const restmanager = require("../reqmanager");

module.exports = class Members {
    /**
     * IDK! (Why there is a token here ?)
     * @param {MembersData} data 
     * @param {string} token
     * @param {number} guild_id 
     */
    constructor(data, token, guild_id) {
        this.token = token;
        this.guild_id = guild_id;
        data.forEach(element => {
            this[element.id] = new Member(element, token, guild_id);
        });
    };
    /**
     * Get a user data by its ID
     * @param {*} id 
     * @returns 
     */
    async getbyid(id) {
        let data = await restmanager("https://discord.com/api/v10/guids/"+guild_id+"/Members/"+id,this.token,{},{method:'get',return:true});
        return new Member(data,this.token);
    };
};