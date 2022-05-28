module.exports = class Button{
    constructor(style,label,id){
        this.type = 2
        this.style =style
        this.label = label
        this.custom_id = id

    }
    toJSON(){
        let obj = {
            type:1,
            components:[{
                type:this.type,
                style:this.style,
                label:this.label,
                custom_id:this.custom_id
            }]
        }
        return obj
    }
}