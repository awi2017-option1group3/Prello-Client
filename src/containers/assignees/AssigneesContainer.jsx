import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import { getAllAssigneesInCard, getResponsibleForCard, addAssigneeToCard, addResponsibleToCard, removeAssigneeFromCard, removeResponsibleFromCard } from './actions'
import Assignees from '../../components/assignees/Assignees'
import AssigneesSelect from '../../components/assignees/AssigneesSelect'
import ResponsibleSelect from '../../components/assignees/ResponsibleSelect'

class AssigneesContainer extends Component {
  componentWillMount() {
    this.props.getAllAssigneesInCard(this.props.card.id)
    this.props.getResponsibleForCard(this.props.card.id)
  }

  render() {
    return (
      <div>
        <Row>
          {this.props.displayAssignees ? (
            <Col span={11}>
              <Assignees {...this.props} cardId={this.props.card.id} maxDisplayedAssignees={3} />
            </Col>
          ) : (
            <Col span={0} />
          )}
          {this.props.displaySelectAssignees ? (
            <Col span={9} className="cardSelector">
              <AssigneesSelect {...this.props} />
            </Col>
          ) : (
            <Col span={0} />
          )}
        </Row>
        {this.props.displaySelectResponsible ? (
          <Row>
            <Col span={9} className="cardSelector">
              <ResponsibleSelect {...this.props} />
            </Col>
          </Row>
        ) :
          (null)
        }
      </div>
    )
  }
}


AssigneesContainer.defaultProps = {
  displaySelectResponsible: false,
}

AssigneesContainer.propTypes = {
  card: PropTypes.object.isRequired,
  getAllAssigneesInCard: PropTypes.func.isRequired,
  getResponsibleForCard: PropTypes.func.isRequired,
  displayAssignees: PropTypes.bool.isRequired,
  displaySelectAssignees: PropTypes.bool.isRequired,
  displaySelectResponsible: PropTypes.bool,
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