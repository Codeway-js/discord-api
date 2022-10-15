module.exports = class Button {
    /**
     * Basic class for Discord Button
     * @param {number} style 
     * @param {string} label 
     * @param {number} id 
     */
    constructor(style, label, id) {
        this.type = 2;
        this.style = style;
        this.label = label;
        this.custom_id = id;
    };
    /**
     * Return a JSON representation of the Button
     */
    toJSON() {
        let obj = {
            type:1,
            components:[{
                type:this.type,
                style:this.style,
                label:this.label,
                custom_id:this.custom_id
            }]
        };
        return obj;
    };
};