import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import { getAllLabelsInCard, addLabelInCard, removeLabelInCard } from './actions'
import Labels from '../../components/labels/Labels'
import LabelsSelect from '../../components/labels/LabelsSelect'


class LabelsContainer extends Component {
  componentWillMount() {
    this.props.getAllLabelsInCard(this.props.cardId)
  }

  render() {
    return (
      <Row className="cardDetailLabels">
        { this.props.displayLabels ? (
          <Col span={12}>
            <Labels {...this.props} />
          </Col>
        ) : (
          <Col span={0} />
        )}
        { this.props.displaySelect ? (
          <Col span={9} className="cardSelector">
            <LabelsSelect {...this.props} />
          </Col>
        ) : (
          <Col span={0} />
        )}
      </Row>
    )
  }
}

LabelsContainer.propTypes = {
  cardId: PropTypes.string.isRequired,
  getAllLabelsInCard: PropTypes.func.isRequired,
  addLabelInCard: PropTypes.func.isRequired,
  removeLabelInCard: PropTypes.func.isRequired,
  displayLabels: PropTypes.bool.isRequired,
  displaySelect: PropTypes.bool.isRequired,
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
