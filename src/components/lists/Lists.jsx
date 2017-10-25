import React from 'react'
import PropTypes from 'prop-types'
import { Button, Spin } from 'antd'
import DraggableList from '../list/DraggableList'
import './style.css'

const Lists = props => (
  <div className="lists">
    { props.isFetching ? (
      <div className="listsLoader">
        <Spin tip="Loading the lists..." />
      </div>
    ) : (
      <div className="listsWrapper">
        {props.lists.sort((a, b) => a.rank > b.rank).map(list => (
          <DraggableList {...list} key={list.id} deleteList={props.deleteList} saveTitleList={props.saveTitleList} />
        ))}
        <div className="addListBlock">
          <Button
            className="addListButton"
            onClick={() => props.addList(props.boardId, props.lists.length)}
            icon="plus"
            size="large"
          >
            New list
          </Button>
        </div>
      </div>
    )}
  </div>
)

Lists.propTypes = {
  boardId: PropTypes.string.isRequired,
  lists: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  addList: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
  saveTitleList: PropTypes.func.isRequired,
}

export default Lists
