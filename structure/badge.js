module.exports = class Badges {
    constructor(flags, premium) {
       if (premium && typeof premium == "number"){
            if(premium == 1){
                this.nitro ="nitro classic"
            }
            if(premium == 2){
                this.nitro ="nitro"
            }
            else{
                this.nitro = "none"
            }
       }
        else{
            this.nitro = undefined
        }
        this.flags = flags
    }
}