import fs from 'fs'
import path from 'path'

function newId(array) {
  if (array.length > 0) {
    return array[array.length-1].id + 1
  } else {
    return 1
  }
}

class MessageApp {
  constructor(filepath) {
    this.filepath = filepath
    this.messages = filepath ? this.readFromJson() : []
  }

// CREATE
  post(content){
    if(content) {
      this.messages.push({
        id: newId(this.messages),
        content: content,
        date: new Date()
      })
      this.writeToJson()
      return this.messages
    } else if(!content){
      return []
    }
  }

// READ
  get(id){
    return this.messages.filter(message => message.id === id)[0]
  }

  getAll(){
    return this.messages
  }

// UPDATE
  update(id, update){
    let index = this.messages.findIndex(message => message.id == id)
    if(index >= 0){
      this.messages[index].content = update
      this.writeToJson()
      return this.messages
    } else {
      return []
    }
  }

// DESTROY
  delete(id){
    let index = this.messages.findIndex(message => message.id == id)
    if(index >= 0) {
      this.messages.splice(index, 1);
      this.writeToJson()
      return this.messages
    } else {
      return "Message not found in database"
    }
  }

  readFromJson(){
    return JSON.parse(fs.readFileSync(
      __dirname+path.normalize(this.filepath),"utf8",(err,data)=>{
      if (err) throw err
      })
    )
  }

  writeToJson(){
    if(this.filepath) {
      const jsonItem = JSON.stringify(this.messages)
      fs.writeFileSync(__dirname+path.normalize(this.filepath),
      jsonItem, (err) => {
        if(err) throw err;
      });
    }
  }
}

export default MessageApp