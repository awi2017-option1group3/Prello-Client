import React from 'react'
import PropTypes from 'prop-types'
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

Board.propTypes = {
  lists: PropTypes.array.isRequired,
}

export default Board
