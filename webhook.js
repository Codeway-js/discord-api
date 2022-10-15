const axios = require("axios").default;
const Websoket = require('./websocket');
const eventemiter = require("events");
// axios({
//     method:"post",
//     url:"https://discord.com/api/webhooks/906563197186768946/7YDjK1WRmMg_0OKDin51K1FAE02HrjAfAWFVnMl2Y9n1hkAle9yvv444jwHhVyHfxVRC",
//     data:{content:"tranquille et toi ?"}
// })
token = "7YDjK1WRmMg_0OKDin51K1FAE02HrjAfAWFVnMl2Y9n1hkAle9yvv444jwHhVyHfxVRC";
// const WS = new websoket(token)
class clientwebhook extends eventemiter {
    constructor(url="") {
        super();
        this.url = url;
        this.token = url.split("/")[url.split("/").length-1];
    };
    connect() {
        this.WS = new Websoket(this.token,this);
    };
};
const wh = new clientwebhook("https://discord.com/api/webhooks/906563197186768946/7YDjK1WRmMg_0OKDin51K1FAE02HrjAfAWFVnMl2Y9n1hkAle9yvv444jwHhVyHfxVRC");
wh.connect();