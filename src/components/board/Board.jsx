import React from 'react'
import PropTypes from 'prop-types'
import ListsContainer from '../../containers/lists/ListsContainer'
import './style.css'

const Board = props => (
  <div className="board">
    <div className="boardTitle">
      <h1>{props.title}</h1>
    </div>
    <ListsContainer boardId={props.boardId} />
  </div>
)

Board.defaultProps = {
  title: '',
}

Board.propTypes = {
  boardId: PropTypes.string.isRequired,
  title: PropTypes.string,
}

export default Board
