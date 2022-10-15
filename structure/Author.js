const Badge = require('./badge');

module.exports = class Author {
    /**
     * IDK! (Why there is a token here ?)
     * @param {AuthorData} data 
     * @param {string} token 
     * @param {*} WS 
     */
    constructor(data, token, WS) {
        this.token = token;
        this.username = data.username
        this.bot =  (data.bot != undefined) ? true:false;
        this.id = data.id;
        this.avatar = data.avatar;
        this.badge = new Badge(data.public_flags);
    }

}