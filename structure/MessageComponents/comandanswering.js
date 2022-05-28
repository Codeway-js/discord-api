module.exports = class comdanswering{
    constructor(answer){
        this.content =answer
    }
    toJSON(){
        let obk = {
          type:4,
          data:{content:this.content}
          }
        return obk
    }
}