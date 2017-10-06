import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addList, getAllLists } from './actions'
import Board from '../../components/board/Board'

class BoardContainer extends Component {
  componentDidMount() {
    this.props.getAllLists()
  }

  render() {
    return (
      <Board {...this.props} />
    )
  }
}

BoardContainer.propTypes = {
  getAllLists: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  lists: state.board.lists,
  isAddingList: state.board.isAddingList,
  isGettingAllLists: state.board.isGettingAllLists,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addList,
  getAllLists,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardContainer)
