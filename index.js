const Client = require("./client")
const Embed = require("./structure/Embeds")
const messageAttachment = require("./structure/MessageAttachment")
const button = require("./structure/MessageComponents/Button")
const Modal = require("./structure/MessageComponents/TextInput")
const answeringcmd = require("./structure/MessageComponents/comandanswering")
const comdanswering = require("./structure/MessageComponents/comandanswering")
module.exports = {
    Client :Client,
    Embed:Embed,
    MessageAttachment:messageAttachment
}
const bot = new Client()

bot.on("message",msg=>{
    if(msg.author.bot) return
    msg.channel.send("txt",{components:new button(2,"clickme","test")})
})
bot.on("interactionCreate",interaction=>{
    if(interaction.custom_id == "test"){
        interaction.reply(new Modal("the final test down",1,"label","mymodal","ùytxtinput"))
    }
    if(interaction.custom_id == "mymodal"){
        console.log(interaction.data.components[0].components)
        interaction.reply(new comdanswering("finish"))
    }
})
bot.login("")