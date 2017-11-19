import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal as UIModal } from 'antd'

import ListsContainer from '../../containers/lists/ListsContainer'
import BoardMembersContainer from '../../containers/boardMembers/BoardMembersContainer'
import BoardLabelsContainer from '../../containers/boardLabels/BoardLabelsContainer'
import EditField from '../../commons/editField/EditField'
import Loader from '../../commons/loader/Loader'
import './style.css'

class Board extends Component {
  constructor(props) {
    super(props)
    this.editTitle = this.editTitle.bind(this)
    this.showBoardLabels = this.showBoardLabels.bind(this)
    this.hideBoardLabels = this.hideBoardLabels.bind(this)
    this.state = {
      boardLabelsVisible: false,
    }
  }

  showBoardLabels() {
    this.setState({
      boardLabelsVisible: true,
    })
  }

  hideBoardLabels() {
    this.setState({
      boardLabelsVisible: false,
    })
  }

  editTitle(newTitle) {
    this.props.saveBoardTitle(this.props.board.id, newTitle)
    this.props.board.contributors.forEach((contributorId) => {
      this.props.addNotification(contributorId, this.props.board.owner, ` has changed the board's title from ${this.props.board.title} to `, this.props.board.id)
    })
  }

  getHeader() {
    return (
      <div className="boardHeader">
        <h1 className="boardTitle">
          {this.props.user.id === this.props.board.owner ? (
            <EditField
              text={this.props.board.title}
              save={this.editTitle}
            />
          ) : (
            this.props.board.title
          )}
        </h1>
        <div className="boardOptions">
          <BoardMembersContainer boardId={this.props.board.id} />
          {this.renderBoardLabelsButton()}
        </div>
      </div>
    )
  }

  renderBoardLabelsButton() {
    return this.props.user.id === this.props.board.owner ? (
      <Button className="boardLabelsButton" icon="tags-o" onClick={this.showBoardLabels}>Labels</Button>
    ) : (null)
  }

  render() {
    return this.props.board.id ? (
      <div className="board">
        { this.getHeader() }
        <ListsContainer boardId={this.props.board.id} />
        <div>
          <UIModal
            title={`Labels of ${this.props.board.title}`}
            visible={this.state.boardLabelsVisible}
            footer={null}
            onCancel={this.hideBoardLabels}
          >
            <BoardLabelsContainer boardId={this.props.board.id} />
          </UIModal>
        </div>
      </div>
    ) : (
      <Loader message="Loading the board..." />
    )
  }
}

Board.propTypes = {
  user: PropTypes.object.isRequired,
  board: PropTypes.object.isRequired,
  saveBoardTitle: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
}

export default Board
