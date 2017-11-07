import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { cleanState as cleanCardState,
  getOneCard, getAllAssigneesInCard, getAllCommentsInCard, getAllLabelsInCard, getResponsibleForCard,
  addComment, addLabel, addAssignee, addResponsible,
  updateDesc, updateDueDate,
  removeAssigneeInCard, removeLabelInCard,
  setIsLoading } from './actions'
import { getOneUser, getAllUsers } from '../users/actions'
import { getAllLabelsForBoard } from '../labels/actions'
import Card from '../../components/card/Card'

class CardContainer extends Component {
  componentWillMount() {
    this.props.cleanCardState()


    this.props.setIsLoading(true)

    this.props.getAllUsers()
    this.props.getAllLabelsForBoard(this.props.boardId)
    this.props.getOneCard(this.props.id)
    this.props.getAllAssigneesInCard(this.props.id)
    this.props.getAllCommentsInCard(this.props.id)
    this.props.getAllLabelsInCard(this.props.id)
    this.props.getResponsibleForCard(this.props.id)

    this.props.setIsLoading(false)
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
  getAllAssigneesInCard: PropTypes.func.isRequired,
  getAllCommentsInCard: PropTypes.func.isRequired,
  getAllLabelsInCard: PropTypes.func.isRequired,
  getResponsibleForCard: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  getAllLabelsForBoard: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  card: state.currentCard,
  users: state.users.data,
  boardLabels: state.labels.data,
  isLoading: state.currentCard.isLoading,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  cleanCardState,
  getOneCard,
  getAllAssigneesInCard,
  getAllCommentsInCard,
  getAllLabelsInCard,
  getResponsibleForCard,
  addComment,
  addLabel,
  addAssignee,
  addResponsible,
  updateDesc,
  updateDueDate,
  removeAssigneeInCard,
  removeLabelInCard,
  getAllUsers,
  getOneUser,
  getAllLabelsForBoard,
  setIsLoading,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardContainer)
