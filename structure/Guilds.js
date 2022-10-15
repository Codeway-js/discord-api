const restmanager = require("../reqmanager")
const Guild = require("./Guild")
const Collection = require("./Collection")

module.exports = class Guilds {
    /**
     * IDK! (Why there is a token here ?)
     * @param {string} token 
     */
    constructor(token) {
        this.token = token;
        this.cache = new Collection();
        restmanager('https://discord.com/api/v9/users/@me/guilds', token, {}, { method: "get" }).then(data => {
            for (let i of data.data) {
                restmanager('https://discord.com/api/v9/guilds/' + i.id, token, {}, { method: "get" }).then(data2 => {
                    this.cache.set(i.id, new Guild(data2.data, token));
                });
            };
            // console.log(data)
        });
    };
    /**
     * IDK!
     * @param {number} id 
     */
    async fetch(id) {
        if (this[id]) return this[id];

        let guidsdata = await restmanager("https://discord.com/api/v9/guilds/" + id, this.token, {}, { method: 'get', return: true });
        return Guild(guidsdata.id, this.token);
    }
    /**
     * IDK! (Why there is a token here ?)
     * @param {number} id 
     */
    async get(id) {
        this.fetch(id);
    };
};