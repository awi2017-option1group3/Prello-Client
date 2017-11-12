import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { cleanState as cleanCardState,
  getOneCard, getAllCommentsInCard,
  addComment, updateDesc, updateDueDate } from './actions'
import { getOneUser, getAllUsers } from '../users/actions'
import Card from '../../components/card/Card'

class CardContainer extends Component {
  componentWillMount() {
    this.props.cleanCardState()
    this.props.getOneCard(this.props.id)
    this.props.getAllUsers()
  }

  render() {
    return (
      <Card {...this.props} />
    )
  }
}

CardContainer.propTypes = {
  id: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  cleanCardState: PropTypes.func.isRequired,
  getOneCard: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  card: state.currentCard,
  users: state.users.data,
  boardLabels: state.currentBoard.labels,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  cleanCardState,
  getOneCard,
  getAllCommentsInCard,
  addComment,
  updateDesc,
  updateDueDate,
  getOneUser,
  getAllUsers,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardContainer)