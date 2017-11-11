import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ListsContainer from '../../containers/lists/ListsContainer'
import BoardMembersContainer from '../../containers/boardMembers/BoardMembersContainer'
import EditField from '../../commons/editField/EditField'
import './style.css'

class Board extends Component {
  getHeader() {
    return (
      <div className="boardHeader">
        <h1 className="boardTitle">
          <EditField
            text={this.props.title}
            save={(newTitle) => { this.props.saveBoardTitle(this.props.boardId, newTitle) }}
          />
        </h1>
        <BoardMembersContainer boardId={this.props.boardId} />
      </div>
    )
  }

  render() {
    return (
      <div className="board">
        { this.getHeader() }
        <ListsContainer boardId={this.props.boardId} />
      </div>
    )
  }
}

Board.defaultProps = {
  title: '',
}

Board.propTypes = {
  boardId: PropTypes.string.isRequired,
  title: PropTypes.string,
  saveBoardTitle: PropTypes.func.isRequired,  
}

export default Board
