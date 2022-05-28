const fs = require("fs")
module.exports = class {
    constructor(file,name){
        if(typeof file == "string"){
            this.name = file.split("/").at(-1)
            this.file = fs.readFileSync(file)
        }else{
            this.name = name
            this.file = file
        }
    }
}