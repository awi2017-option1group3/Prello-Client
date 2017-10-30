import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ListsContainer from '../../containers/lists/ListsContainer'
import './style.css'
import EditField from '../../commons/editField/EditField'

class Board extends Component {
  getHeader() {
    return (
      <EditField
        text={this.props.title}
        save={(newTitle) => { this.props.saveBoardTitle(this.props.id, newTitle) }}
      />
    )
  }

  render() {
    return (
      <div className="board">
        <div className="boardTitle">
          <h1>{this.getHeader()}</h1>
        </div>
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
