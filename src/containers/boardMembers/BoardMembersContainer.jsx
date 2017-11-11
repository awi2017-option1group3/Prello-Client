import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getBoardOwner, getBoardContributors, addContributorToBoard, removeContributorFromBoard } from './actions'
import { getAllUsers } from '../users/actions'
import BoardMembers from '../../components/boardMembers/BoardMembers'

class BoardMembersContainer extends Component {
  componentWillMount() {
    this.props.getBoardOwner(this.props.boardId)
    this.props.getBoardContributors(this.props.boardId)
    this.props.getAllUsers()
  }

  render() {
    if (this.props.user.id && this.props.owner.id) {
      return (<BoardMembers {...this.props} />)
    }
    return (null)
  }
}

BoardMembersContainer.propTypes = {
  boardId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  owner: PropTypes.object.isRequired,
  getBoardOwner: PropTypes.func.isRequired,
  getBoardContributors: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user.infos,
  users: state.users.data,
  owner: state.boardMembers.owner,
  contributors: state.boardMembers.contributors,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getBoardOwner,
  getBoardContributors,
  addContributorToBoard,
  removeContributorFromBoard,
  getAllUsers,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardMembersContainer)
