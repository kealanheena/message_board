class MessageApp {
  constructor() {
    this.messages = []
  }

  post (content) {
    let item = {
      id: this.messages.length,
      content: content,
      date: new Date()
    }
    this.messages.push(item)
    return this.message;
  };

  get (id) {
    return this.messages[id];
  }

  update(id, content) {
    this.messages[id].content = content;
  }

  delete(id) {
    this.messages.splice(id, 1);
  }
}

export default MessageApp