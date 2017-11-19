import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getAllAssigneesInCard, getResponsibleForCard, addAssigneeToCard, addResponsibleToCard, removeAssigneeFromCard, removeResponsibleFromCard } from './actions'
import AssigneesGroup from '../../components/assignees/AssigneesGroup'

class AssigneesContainer extends Component {
  componentWillMount() {
    this.props.getAllAssigneesInCard(this.props.card.id)
    this.props.getResponsibleForCard(this.props.card.id)
  }

  render() {
    return (
      <AssigneesGroup {...this.props} />
    )
  }
}

AssigneesContainer.propTypes = {
  card: PropTypes.object.isRequired,
  getAllAssigneesInCard: PropTypes.func.isRequired,
  getResponsibleForCard: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  assignees: state.cardAssignees.data,
  responsible: state.cardAssignees.responsible,
  allUsers: state.users.data,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllAssigneesInCard,
  getResponsibleForCard,
  addAssigneeToCard,
  addResponsibleToCard,
  removeAssigneeFromCard,
  removeResponsibleFromCard,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssigneesContainer)
