import React from 'react'
import ListsContainer from '../../containers/lists/ListsContainer'
import './style.css'

const Board = () => (
  <div className="board">
    <div className="boardTitle">
      <h1>Board</h1>
    </div>
    <ListsContainer boardId="b1" />
  </div>
)

export default Board
