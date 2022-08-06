let Collection = Map
Collection.prototype.array = function (){
    return [...this.values()]
}
Collection.prototype.keyArray = function (){
    return [...this.keys()]
}
Collection.prototype.first = function (number){
    if(number == undefined){
        return this.values().first()
    }
    let iter = this.values()
    return Array.from({length:number},()=>iter.next().value)
}
Collection.prototype.firstKey = function (number){
    if(number == undefined){
        return this.keys().first()
    }
    let iter = this.keys()
    return Array.from({length:number},()=>iter.next().value)
}
Collection.prototype.last = function (number){
    let arr = this.array()
    if(number == undefined){
        return arr[arr.length-1]
    }
    return arr.slice(-number)
}
Collection.prototype.lastKey = function (number){
    let arr = this.keyArray()
    if(number == undefined){
        return arr[arr.length-1]
    }
    return arr.slice(-number)
}
Collection.prototype.random = function (){
    let arr = this.array()
    return arr[Math.floor(Math.random(),arr.length)]
}
Collection.prototype.randomKey = function (){
    let arr = this.keyArray()
    return arr[Math.floor(Math.random(),arr.length)]
}
Collection.prototype.find = function (condition){
    let arr = this.array()
    return arr.find()
}
Collection.prototype.findKey = function (condition){
    let arr = this.keyArray()
    return arr.find()
}
module.exports = Collection