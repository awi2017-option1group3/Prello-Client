import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import DraggableList from '../../containers/list/DraggableList'
import './style.css'

const Board = props => (
  <div className="board">
    <div className="boardTitle">
      <h1>Board</h1>
    </div>
    <div className="listWrapper">
      {props.lists.sort((a, b) => a.rank > b.rank).map(list => (
        <DraggableList key={list.id} {...list} />
      ))}
      {props.droppableProvided.placeholder}
      <div className="addListBlock">
        <Button
          className="addListButton"
          onClick={() => props.addList(props.lists.length)}
          disabled={props.isAddingList}
          icon="plus"
          size="large"
        >New list</Button>
      </div>
    </div>
  </div>
)

Board.propTypes = {
  lists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  addList: PropTypes.func.isRequired,
  isAddingList: PropTypes.bool.isRequired,
  // React drag and drop related
  droppableProvided: PropTypes.shape().isRequired,
}

export default Board
