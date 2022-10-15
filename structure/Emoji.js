module.exports = class Emoji {
    /**
     * Basic class for Discord Emoji (Why there is a token here ?)
     * @param {EmojiData} data 
     * @param {string} token 
     */
    constructor(data, token) {
        this.id = data.id;
        this.name = data.name;
        this.token=token;
    };  
};