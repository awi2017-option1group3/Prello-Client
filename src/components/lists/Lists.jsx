import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import DraggableList from '../list/DraggableList'
import './style.css'

const Lists = props => (
  <div className="listWrapper">
    {props.lists.sort((a, b) => a.rank > b.rank).map(list => (
      <DraggableList key={list.id} {...list} />
    ))}
    <div className="addListBlock">
      <Button
        className="addListButton"
        onClick={() => props.addList(props.lists.length)}
        icon="plus"
        size="large"
      >New list</Button>
    </div>
  </div>
)

Lists.propTypes = {
  lists: PropTypes.array.isRequired,
  addList: PropTypes.func.isRequired,
}

export default Lists