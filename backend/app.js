function newID(array) {
  if (array.length > 0) {
    return array[array.length-1].id + 1
  } else {
    return 0
  }
}

class MessageApp {
  constructor() {
    this.messages = []
  }

  post (content) {
    let item = {
      id: newID(this.messages),
      content: content,
      date: new Date()
    }
    this.messages.push(item)
    return this.messages;
  };

  get (id) {
    return this.messages[id];
  }

  update(id, content) {
    this.messages[id].content = content;
    return this.messages[id]
  }

  delete(id) {
    this.messages.splice(id, 1);
    return this.messages
  }
}

export default MessageApp