import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ListsContainer from '../../containers/lists/ListsContainer'
import BoardMembersContainer from '../../containers/boardMembers/BoardMembersContainer'
import EditField from '../../commons/editField/EditField'
import './style.css'
import Loader from "../../commons/loader/Loader"

class Board extends Component {
  constructor(props) {
    super(props)
    this.editTitle = this.editTitle.bind(this)
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
          {this.props.user.id === this.props.owner ? (
            <EditField
              text={this.props.board.title}
              save={this.editTitle}
            />
          ) : (
            this.props.board.title
          )}
        </h1>
        <BoardMembersContainer boardId={this.props.board.id} />
      </div>
    )
  }

  render() {
    return this.props.board.id ? (
      <div className="board">
        { this.getHeader() }
        <ListsContainer boardId={this.props.board.id} />
      </div>
    ) : (
      <Loader message="Loading the board..." />
    )
  }
}

Board.propTypes = {
  user: PropTypes.object.isRequired,
  owner: PropTypes.string.isRequired,
  board: PropTypes.object.isRequired,
  saveBoardTitle: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
}

export default Board
