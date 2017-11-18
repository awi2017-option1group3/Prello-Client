import io from 'socket.io-client'

const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:8000/')

// App connection
const joinApp = userId => socket.emit('joinApp', userId)
const leaveApp = userId => socket.emit('leaveApp', userId)

// Board connection
const joinBoard = (boardId, useListeners) => {
  socket.emit('joinBoard', boardId)
  socket.on('connect', useListeners)
}
const leaveBoard = boardId => socket.emit('leaveBoard', boardId)

// Emitters
const emitAddList = wrapper => socket.emit('addList', wrapper)
const emitRenameList = wrapper => socket.emit('renameList', wrapper)
const emitMoveList = wrapper => socket.emit('moveList', wrapper)
const emitDeleteList = wrapper => socket.emit('deleteList', wrapper)

const emitAddCard = wrapper => socket.emit('addCard', wrapper)
const emitRenameCard = wrapper => socket.emit('renameCard', wrapper)
const emitMoveCard = wrapper => socket.emit('moveCard', wrapper)
const emitDeleteCard = wrapper => socket.emit('deleteCard', wrapper)
const emitRefreshCard = wrapper => socket.emit('refreshCard', wrapper)

const emitNotify = wrapper => socket.emit('notify', wrapper)

// Listeners
const listenAddList = action => socket.on('addList', wrapper => action(wrapper))
const listenRenameList = action => socket.on('renameList', wrapper => action(wrapper))
const listenMoveList = action => socket.on('moveList', wrapper => action(wrapper))
const listenDeleteList = action => socket.on('deleteList', wrapper => action(wrapper))

const listenAddCard = action => socket.on('addCard', wrapper => action(wrapper))
const listenRenameCard = action => socket.on('renameCard', wrapper => action(wrapper))
const listenMoveCard = action => socket.on('moveCard', wrapper => action(wrapper))
const listenDeleteCard = action => socket.on('deleteCard', wrapper => action(wrapper))
const listenRefreshCard = action => socket.on('refreshCard', wrapper => action(wrapper))

const listenNotify = action => socket.on('notify', wrapper => action(wrapper))

export {
  joinApp, leaveApp, joinBoard, leaveBoard,
  emitAddList, emitRenameList, emitMoveList, emitDeleteList, emitAddCard, emitRenameCard, emitMoveCard, emitDeleteCard, emitRefreshCard, emitNotify,
  listenAddList, listenRenameList, listenMoveList, listenDeleteList, listenAddCard, listenRenameCard, listenMoveCard, listenDeleteCard, listenRefreshCard, listenNotify,
}
