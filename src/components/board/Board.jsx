import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import List from '../list/List'
import './style.css'

const Board = props => (
  <div>
    <h1>Board</h1>
    {props.lists.map(list => (
      <List key={list.id} {...list} />
    ))}
    <Button
      className="addListButton"
      onClick={props.addList}
      disabled={props.isAddingList}
      icon="plus"
      size="large"
    >New list</Button>
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
}

export default Board
