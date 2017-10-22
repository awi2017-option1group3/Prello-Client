import React from 'react'
import PropTypes from 'prop-types'
import ListsContainer from '../../containers/lists/ListsContainer'
import './style.css'

const Board = props => (
  <div className="board">
    <div className="boardTitle">
      <h1>Board</h1>
    </div>
    <ListsContainer boardId={props.boardId} />
  </div>
)

Board.propTypes = {
  boardId: PropTypes.string.isRequired,
}

export default Board
