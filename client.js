const eventmodule = require('events')
const websocket = require('./websocket')
const Guilds = require('./structure/Guilds');
const User = require('./structure/User')
const reqmanager = require('./reqmanager')
module.exports = class Client extends eventmodule {
    constructor(option){
        super();
        if(option){
            this.option = option
        }
        this.up = false

    }
    async login(token){
        this.token = token
        this.WS = new websocket(token,this)
        this.guilds=await new Guilds(token)
        this.on("ready",()=>{
            this.up = true
            this.readyAt = new Date(Date.now())
            this.readyTimestamp = Date.now()
        })
        this.uptime = this._getuptime()
        reqmanager('https://discord.com/api/v9/users/@me',token,{},{method:"get"}).then(data=>{
            this.user = new User(data, token)
        })
    }
    _getuptime(){
        if(!this.up) return
        return (new Date(Date.now()).getMilliseconds()) - this.readyAt.getMilliseconds()
    }
}
