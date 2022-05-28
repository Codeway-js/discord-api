const badge = require('./badge')
module.exports = class Author {
    constructor(data, token, WS) {
        this.token = token;
        this.username = data.username
        this.bot =  (data.bot != undefined) ? true:false
        this.id = data.id
        this.avatar = data.avatar
        this.badge = new badge(data.public_flags)
    }

}