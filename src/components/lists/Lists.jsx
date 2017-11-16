import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Spin } from 'antd'
import DraggableList from '../list/DraggableList'
import Loader from '../../commons/loader/Loader'
import './style.css'
import CreateWithName from '../../commons/createWithName/CreateWithName'

class Lists extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adding: false,
      title: '',
    }
    this.add = this.add.bind(this)
    this.saveList = this.saveList.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  onCancel() {
    this.setState({
      adding: false,
    })
  }

  saveList(Newtitle) {
    this.setState({
      adding: false,
      title: Newtitle,
    })
    this.props.addList(this.props.boardId, this.props.lists.length, Newtitle)
  }

  add() {
    return (
      <div>
        <CreateWithName
          title="New List"
          save={(Newtitle) => {
            this.saveList(Newtitle)
          }}
          cancel={this.onCancel}
        />
      </div>
    )
  }

  render() {
    return (
      <div className="lists">
        { this.props.isFetching ? (
          <Loader message="Loading the lists..." />
        ) : (
          <div className="listsWrapper">
            {this.props.lists.sort((a, b) => a.pos > b.pos).map(list => (
              <DraggableList {...list} key={list.id} deleteList={this.props.deleteList} saveTitleList={this.props.saveTitleList} />
            ))}
            <div className="addListBlock">
              {this.state.adding ? (
                this.add()
              ) : (
                <Spin spinning={this.props.isAdding}>
                  <Button
                    className="addListButton"
                    onClick={() => this.setState({
                      adding: true,
                    })}
                    icon="plus"
                    size="large"
                  >
                  New list
                  </Button>
                </Spin>)}
            </div>
          </div>
        )}
      </div>
    )
  }
}


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
