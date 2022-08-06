const Message = require('./structure/Message')
const Channel = require('./structure/Channel')
const reaction = require("./structure/Reaction.js")
const ws = require('ws')
const interaction = require("./structure/Interaction")
const reqmanager = require("./reqmanager")
class WebSocket {



    constructor(token, clientthis) {
        this.clientthis = clientthis
        this.token = token
        this.heardbeat = {
            last: 0,
            lastreceive: Date.now(),
            lastsend: Infinity,
            interval: 0,
            lastping: Infinity
        }

        this.lastping = Date.now()
        

        const webs = new ws("wss://gateway.discord.gg/?v=9&encoding=json")
        this.webs = webs
        webs.once("open", () => {
            this.online = true
        })
        webs.on("message", msg => {
            // console.log(msg)
            let rresult
            try {
                rresult = JSON.parse(msg)
            } catch {
                return /*console.log("buffer")*/
            }
            // console.log(rresult)
            if (rresult.s) {
                this.heardbeat.last = rresult.s
            }
            // {op:10,d:{hearbeat_interval: 40000}}
            if (rresult.op === 10) {
                let obj = {
                    intents: 65535,
                    token: token,
                    compress: true,
                    large_threshold: 350,
                    properties: {
                        $os: "windows",
                        $browser: "discordapi",
                        $device: "discordapi",
                    },
                    presence: {
                        status: "online",
                        afk: false,
                    },
                };
                webs.send(JSON.stringify({ op: 2, d: obj }))
                this.clientthis.emit("ready")
                setInterval(() => this.getping(this), 2000)
                this.heardbeat.interval = rresult.d.heartbeat_interval;
                setInterval(() => {
                    this.heardbeat.lastSent = Date.now();
                    webs.send(JSON.stringify({ op: 1, d: this.heardbeat.last }))
                }, this.heardbeat.interval);
            }
            if (rresult.op == 0) {
                this.handleevent(rresult)
            }
        })

        webs.on("error", err => console.error(err))
        webs.on('close', cd => console.log(cd))
        webs.on("pong", () => {
            return Date.now() - this.heardbeat.lastping
        })
    }
    getping(ob) {
        this.heardbeat.lastping = Date.now()
        return this.webs.ping()
    }
    handleevent(message) {
        if (message.d.mentions) {
            console.log(message.d.mentions[0])

        }
        console.log(message)
        switch (message.t) {
            
            case "READY" :{
                console.log(message+"READY")
                break
            }
            case "MESSAGE_CREATE":
                this.clientthis.emit("message", new Message(message.d, this.token, this.clientthis))
                break
            case "MESSAGE_DELETE":
                this.clientthis.emit("messageDelete", new Message(message.d, this.token, this.clientthis))
                break
            case "CHANNEL_CREATE":
                this.clientthis.emit("channel_create", new Channel(message.d, this.token, this.clientthis))
                break
            case 'MESSAGE_REACTION_ADD':
                this.clientthis.emit('messageRecationAdd', new reaction(message.d, this.token, this.clientthis))
                break
            case 'MESSAGE_REACTION_REMOVE':
                this.clientthis.emit('messageRecationRemove', new reaction(message.d, this.token, this.clientthis))
                break                                                                           
            case "INTERACTION_CREATE":
                this.clientthis.emit('interactionCreate', new interaction(message.d,this.token,this.clientthis))
                
                // if (message.d.data.custom_id == "test") {
                //     console.log(message.d.id)
                //     reqmanager(`https://discord.com/api/v10/interactions/${message.d.id}/${message.d.token}/callback`, this.token, {
                //         type: 9,
                //         data: {
                //             "title": "New Tag",
                //             "custom_id": "TAG_Modal",
                //             "components": [{
                //                 "type": 1,
                //                 "components": [{
                //                     "type": 4,
                //                     "custom_id": "TAG_Modal_Name",
                //                     "style": 1,
                //                     "label": "Tag Name",
                //                     "max_length": 32
                //                 }]
                //             }]
                //         }
                //     }, { method: "post" }).then(t => console.log(t + "finish"))
                // }
                // else{
                //     console.log(message.d.data.components[0].components)
                //     // reqmanager(`https://discord.com/api/v10/interactions/${message.d.id}/${message.d.token}/callback`, this.token,
                //     //     {"type": 1}, { method: "post" }
                //     //     )
                // }

        }
    }

}
module.exports = WebSocket