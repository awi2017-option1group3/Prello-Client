import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getOwnedBoardsForUser, getContributingBoardsForUser, addBoard, deleteBoard } from './actions'
import { addNotification } from '../notifications/actions'
import OwnedBoards from '../../components/boards/OwnedBoards'
import ContributingBoards from '../../components/boards/ContributingBoards'

class BoardsContainer extends Component {
  componentDidMount() {
    if (!this.props.ownedBoards.areFetched && !this.props.ownedBoards.areFetching && this.props.user) {
      this.props.getOwnedBoardsForUser(this.props.user.id)
    }
    if (!this.props.contributingBoards.areFetched && !this.props.contributingBoards.areFetching && this.props.user) {
      this.props.getContributingBoardsForUser(this.props.user.id)
    }
  }

  componentDidUpdate() {
    if (!this.props.ownedBoards.areFetched && !this.props.ownedBoards.areFetching && this.props.user) {
      this.props.getOwnedBoardsForUser(this.props.user.id)
    }
    if (!this.props.contributingBoards.areFetched && !this.props.contributingBoards.areFetching && this.props.user) {
      this.props.getContributingBoardsForUser(this.props.user.id)
    }
  }

  render() {
    return this.props.user ? (
      <div>
        <OwnedBoards boards={this.props.ownedBoards} {...this.props} />
        <ContributingBoards boards={this.props.contributingBoards} {...this.props} />
      </div>
    ) : (null)
  }
}

BoardsContainer.defaultProps = {
  user: null,
}

BoardsContainer.propTypes = {
  ownedBoards: PropTypes.object.isRequired,
  contributingBoards: PropTypes.object.isRequired,
  user: PropTypes.object,
  getOwnedBoardsForUser: PropTypes.func.isRequired,
  getContributingBoardsForUser: PropTypes.func.isRequired,
  addBoard: PropTypes.func.isRequired,
  deleteBoard: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  ownedBoards: state.boards.ownedBoards,
  contributingBoards: state.boards.contributingBoards,
  user: state.user.infos,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getOwnedBoardsForUser,
  getContributingBoardsForUser,
  addBoard,
  deleteBoard,
  addNotification,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardsContainer)
