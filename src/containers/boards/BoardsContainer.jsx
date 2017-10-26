import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getAllBoards, addBoard } from './actions'
import Boards from '../../components/boards/Boards'

class BoardsContainer extends Component {
  componentWillMount() {
    this.props.getAllBoards() // TODO: need to use `getALlBoardsForUser(this.props.userId)` in the future
  }

  render() {
    return (
      <Boards {...this.props} />
    )
  }
}

BoardsContainer.propTypes = {
  getAllBoards: PropTypes.func.isRequired,
  addBoard: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  boards: state.boards,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllBoards,
  addBoard,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardsContainer)
