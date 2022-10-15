const Channel = require("./Channel")
const restmanager = require("../reqmanager")

module.exports = class Threads {
    /**
     * IDK! (Why there is a token here ?)
     * @param {ThreadsData} data 
     * @param {string} token 
     * @param {number} guid_id 
     */
    constructor(data, token,guid_id){
        this.token = token
        this.guild_id = guid_id
        data.forEach(element => {
            this[element.id] = new Channel(element,token,guid_id)           
        });
    }
    
}