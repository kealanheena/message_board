function newId(array) {
  if (array.length > 0) {
    return array[array.length-1].id + 1
  } else {
    return 1
  }
}

class MessageApp {
  constructor() {
    this.messages = []
  }

// CREATE
  post(content){
    let item = {
      id: newId(this.messages),
      content: content,
      date: new Date()
    }
    this.messages.push(item)
    return this.messages
  }
// READ
  get(id){
    return this.messages.filter(message => message.id === id)[0]
  }
// UPDATE
  update(id, update){
    let index = this.messages.findIndex(message => message.id === id )
    this.messages[index].content = update
  }
// DESTROY
  delete(id){
    this.messages = this.messages.filter(message => message.id != id)
    return this.messages
  }
}

export default MessageApp