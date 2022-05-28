module.exports = class TextInput{
    constructor(title,style,label,id,idtxtimput,maxlenght=4000, minlength=1, required=true){
        this.style =style
        this.label = label
        this.custom_id = id
        this.title = title
        this.idtxt = idtxtimput
        this.maxlenght = maxlenght
        this.minlength = minlength
        this.require = required
    }
    toJSON(){
        let obj = {
            title: this.title,
            custom_id:this.custom_id,
            components:[{
                type:1,
                components:[{type:4,
                    style:this.style,
                    label:this.label,
                    custom_id:this.idtxt,
                    max_length : this.maxlenght,
                    min_length : this.minlength}]
                
            }]
        }
        let obk = {
          type:9,
          data:obj
          }
        return obk
    }
}