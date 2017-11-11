import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getOwnedBoardsForUser, getContributingBoardsForUser, addBoard, deleteBoard } from './actions'
import OwnedBoards from '../../components/boards/OwnedBoards'
import ContributingBoards from '../../components/boards/ContributingBoards'

class BoardsContainer extends Component {
  componentDidUpdate() {
    if (!this.props.ownedBoards.areFetched && !this.props.ownedBoards.areFetching && this.props.userId) {
      this.props.getOwnedBoardsForUser(this.props.userId)
    }
    if (!this.props.contributingBoards.areFetched && !this.props.contributingBoards.areFetching && this.props.userId) {
      this.props.getContributingBoardsForUser(this.props.userId)
    }
  }

  render() {
    return (
      <div>
        <OwnedBoards boards={this.props.ownedBoards} {...this.props} />
        <ContributingBoards boards={this.props.contributingBoards} {...this.props} />
      </div>
    )
  }
}

BoardsContainer.propTypes = {
  ownedBoards: PropTypes.object.isRequired,
  contributingBoards: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  getOwnedBoardsForUser: PropTypes.func.isRequired,
  getContributingBoardsForUser: PropTypes.func.isRequired,
  addBoard: PropTypes.func.isRequired,
  deleteBoard: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  ownedBoards: state.boards.ownedBoards,
  contributingBoards: state.boards.contributingBoards,
  userId: state.user.infos.id,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getOwnedBoardsForUser,
  getContributingBoardsForUser,
  addBoard,
  deleteBoard,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardsContainer)
