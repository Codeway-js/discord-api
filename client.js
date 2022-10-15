const eventmodule = require('events')
const Websocket = require('./websocket')
const Guilds = require('./structure/Guilds');
const User = require('./structure/User')
const reqmanager = require('./reqmanager')

module.exports = class Client extends eventmodule {
    /**
     * Basic class for Discord client API
     * @param {IDK!} option 
     */
    constructor(option) {
        super();
        if(option) {
            this.option = option
        };
        this.up = false;
    };
    /**
     * Login to Discord Server with the token
     * Why is there an await/async keyword ?
     * @param {string} token 
     */
    async login(token) {
        this.token = token;
        this.WS = new Websocket(token, this);
        this.guilds = await new Guilds(token);
        this.on("ready", () => {
            this.up = true;
            this.readyAt = new Date(Date.now());
            this.readyTimestamp = Date.now();
        });
        this.uptime = this._getuptime();
        // reqmanager('https://discord.com/api/v9/users/@me/guilds',token,{},{method:"get"})
        // this.guilds.cache 
        reqmanager('https://discord.com/api/v9/users/@me', token, {}, {method:"get"}).then(data => {
            this.user = new User(data, token);
        });
    };
    _getuptime() {
        if(!this.up) return;
        return (new Date(Date.now()).getMilliseconds()) - this.readyAt.getMilliseconds();
    };
};
