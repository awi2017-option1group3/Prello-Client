import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getAllLabelsInCard, addLabelInCard, removeLabelInCard } from './actions'
import LabelsGroup from '../../components/labels/LabelsGroup'

class LabelsContainer extends Component {
  componentWillMount() {
    this.props.getAllLabelsInCard(this.props.cardId)
  }

  render() {
    return (
      <LabelsGroup {...this.props} />
    )
  }
}

LabelsContainer.propTypes = {
  cardId: PropTypes.string.isRequired,
  getAllLabelsInCard: PropTypes.func.isRequired,
  addLabelInCard: PropTypes.func.isRequired,
  removeLabelInCard: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  cardLabels: state.currentCardLabels.data,
  boardLabels: state.currentBoard.labels,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllLabelsInCard,
  addLabelInCard,
  removeLabelInCard,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LabelsContainer)
