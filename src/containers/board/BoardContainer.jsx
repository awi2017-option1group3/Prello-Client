import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addList, getAllLists, deleteList } from './actions'
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
  isRemovingList: state.board.isRemovingList,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addList,
  getAllLists,
  deleteList,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardContainer)
