const restmanager = require("../reqmanager")
const guild = require("./Guild")
module.exports = class Guilds{
    init(){
        this.chanels = {}
        let self = this
        restmanager("https://discord.com/api/v9/users/@me/guilds",this.token,{},{method:"get"}).then(data=>{
            console.log("1",data.data)
            data.data.forEach((el,i) => {
                restmanager("https://discord.com/api/v9/guilds/"+el.id,this.token,{},{method:'get',return:true}).then(data2=>{
                    console.log("2 ", data2.data)
                    
                    this[data2.data.id]= new guild(data2.data,this.token)
                    console.log(this)
                    console.log('finish')
                })
            });
        })
       
    }
    constructor(token){
        this.token = token
        this.init()
    }
    
    async getbyid(id){
        let guidsdata = await restmanager("https://discord.com/api/v9/guilds/"+id,this.token,{},{method:'get',return:true})
        return guild(guidsdata.id,this.token)
    }
}