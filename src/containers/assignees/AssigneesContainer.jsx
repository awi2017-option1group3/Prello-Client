import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import { getAllAssigneesInCard, getResponsibleForCard, addAssigneeToCard, addResponsibleToCard, removeAssigneeFromCard, removeResponsibleFromCard } from './actions'
import Assignees from '../../components/assignees/Assignees'
import AssigneesSelect from '../../components/assignees/AssigneesSelect'

class AssigneesContainer extends Component {
  componentWillMount() {
    this.props.getAllAssigneesInCard(this.props.cardId)
    this.props.getResponsibleForCard(this.props.cardId)
  }

  render() {
    return (
      <Row className="cardDetailLabels">
        { this.props.displayAssignees ? (
          <Col span={11}>
            <Assignees {...this.props} maxNumberOfPeopleInALine={4} />
          </Col>
        ) : (
          <Col span={0} />
        )}
        { this.props.displaySelect ? (
          <Col span={9} className="cardSelector">
            <AssigneesSelect {...this.props} />
          </Col>
        ) : (
          <Col span={0} />
        )}
      </Row>
    )
  }
}

AssigneesContainer.propTypes = {
  cardId: PropTypes.string.isRequired,
  getAllAssigneesInCard: PropTypes.func.isRequired,
  getResponsibleForCard: PropTypes.func.isRequired,
  displayAssignees: PropTypes.bool.isRequired,
  displaySelect: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  assignees: state.cardAssignees.assignees,
  cardResponsible: state.cardAssignees.cardResponsible,
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