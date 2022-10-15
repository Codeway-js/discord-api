const restmanager = require("../reqmanager");
const User = require('./User');

class Users {
    /**
     * IDK! (Why there is a token here ?)
     * @param {string} token 
     */
    constructor(token) {
        this.token = token
    };
    /**
     * Get a user data by its ID
     * @param {number} id 
     * @returns 
     */
    async getbyid(id) {
        let res = await restmanager('https://discord.com/api/v10/users/' + id, this.token, {}, {method:"get",return:true});
        return new User(JSON.parse(res), this.token);
    }
}

module.exports = {Users}