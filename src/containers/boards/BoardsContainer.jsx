import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getAllBoardsForUser, addBoard, deleteBoard } from './actions'
import Boards from '../../components/boards/Boards'
import Loader from '../../commons/loader/Loader'

class BoardsContainer extends Component {
  componentDidUpdate() {
    if (!this.props.boards.areFetched && !this.props.boards.areFetching && this.props.userId) {
      this.props.getAllBoardsForUser(this.props.userId)
    }
  }

  render() {
    return this.props.boards.areFetched ? (
      <Boards {...this.props} />
    ) : (
      <Loader message="Loading your boards2..." />
    )
  }
}

BoardsContainer.propTypes = {
  boards: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  getAllBoardsForUser: PropTypes.func.isRequired,
  addBoard: PropTypes.func.isRequired,
  deleteBoard: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  boards: state.boards,
  userId: state.user.infos.id,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllBoardsForUser,
  addBoard,
  deleteBoard,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardsContainer)
