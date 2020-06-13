import MessageModel from './model.js'

function getAll() {
  return MessageModel.find()
}

function post(content) {
  let newMessage = new MessageModel({ content: content })
  return newMessage.save()
}

function deleteMessage(id) {
  return new Promise((resolve, reject) => {
    let result = messageApp.delete(id)
    if (result !== 'Message not found in database') {
      resolve(result)
    } else {
      reject(result)
    }
  })
}

function getSingleMessage(id){
  return MessageModel.findOne({ _id: id })
}

function updateMessage(id, content){
  return new Promise((resolve, reject) => {
    let result = messageApp.update(id, content)
    if (result.length !== 0) {
      resolve(result)
    } else {
      reject("You can't post an empty message")
    }
  })
}

module.exports = {
  getAll,
  getSingleMessage,
  post,
  updateMessage,
  deleteMessage
}