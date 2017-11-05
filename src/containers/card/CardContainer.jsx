import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { cleanState as cleanCardState,
  getOneCard, getAllAssigneesInBoard, getAllCommentsInBoard, getAllLabelsInBoard, getResponsibleForBoard,
  addComment, addLabel, addMember, addResponsible,
  updateDesc, updateDueDate} from './actions'
import CardDetails from '../../components/card/Card'

class CardContainer extends Component {
  componentWillMount() {
    this.props.cleanCardState()
    this.props.getOneCard(this.props.id)
    this.props.getAllAssigneesInBoard(this.props.id)
    this.props.getAllCommentsInBoard(this.props.id)
    this.props.getAllLabelsInBoard(this.props.id)
    this.props.getResponsibleForBoard(this.props.id)
  }

  render() {
    return (
      <CardDetails id={this.props.id} {...this.props} />
    )
  }
}

CardContainer.propTypes = {
  id: PropTypes.string.isRequired,
  cleanCardState: PropTypes.func.isRequired,
  getOneCard: PropTypes.func.isRequired,
  getAllAssigneesInBoard: PropTypes.func.isRequired,
  getAllCommentsInBoard: PropTypes.func.isRequired,
  getAllLabelsInBoard: PropTypes.func.isRequired,
  getResponsibleForBoard: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  addLabel: PropTypes.func.isRequired,
  addMember: PropTypes.func.isRequired,
  addResponsible: PropTypes.func.isRequired,
  updateDesc: PropTypes.func.isRequired,
  updateDueDate: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  card: state.currentCard.data,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  cleanCardState,
  getOneCard,
  getAllAssigneesInBoard,
  getAllCommentsInBoard,
  getAllLabelsInBoard,
  getResponsibleForBoard,
  addComment,
  addLabel,
  addMember,
  addResponsible,
  updateDesc,
  updateDueDate,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardContainer)
