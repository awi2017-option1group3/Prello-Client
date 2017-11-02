import React from 'react'
import PropTypes from 'prop-types'
import { Button, Spin } from 'antd'
import DraggableList from '../list/DraggableList'
import Loader from '../../commons/loader/Loader'
import './style.css'

const Lists = props => (
  <div className="lists">
    { props.isFetching ? (
      <Loader message="Loading the lists..." />
    ) : (
      <div className="listsWrapper">
        {props.lists.sort((a, b) => a.pos > b.pos).map(list => (
          <DraggableList {...list} key={list.id} deleteList={props.deleteList} saveTitleList={props.saveTitleList} />
        ))}
        <div className="addListBlock">
          <Spin spinning={props.isAdding}>
            <Button
              className="addListButton"
              onClick={() => props.addList(props.boardId, props.lists.length)}
              icon="plus"
              size="large"
            >
              New list
            </Button>
          </Spin>
        </div>
      </div>
    )}
  </div>
)

Lists.propTypes = {
  boardId: PropTypes.string.isRequired,
  lists: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isAdding: PropTypes.bool.isRequired,
  addList: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
  saveTitleList: PropTypes.func.isRequired,
}

export default Lists
