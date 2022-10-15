module.exports = class comdanswering {
    /**
     * Not finish I think...
     * @param {string} answer 
     */
    constructor(answer) {
        this.content = answer;
    };
    /**
     * Return you a JSON representation of the command
     */
    toJSON() {
        let obk = {
            type:4,
            data:{content:this.content}
        };
        return obk;
    };
};