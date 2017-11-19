import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getAllLabelsInBoard, addLabelToBoard, removeLabelFromBoard } from './actions'
import BoardLabels from '../../components/boardLabels/BoardLabels'

class BoardLabelsContainer extends Component {
  componentWillMount() {
    this.props.getAllLabelsInBoard(this.props.boardId)
  }

  render() {
    return <BoardLabels {...this.props} />
  }
}

BoardLabelsContainer.propTypes = {
  boardId: PropTypes.string.isRequired,
  getAllLabelsInBoard: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  labels: state.boardLabels.data,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllLabelsInBoard,
  addLabelToBoard,
  removeLabelFromBoard,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardLabelsContainer)
