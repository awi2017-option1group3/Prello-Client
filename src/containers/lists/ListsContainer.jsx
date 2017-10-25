import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DroppableLists from '../../components/lists/DroppableLists'
import { addList, deleteList, getAllListsInBoard, saveListRank, saveTitleList } from './actions'

class ListsContainer extends Component {
  componentWillMount() {
    this.props.getAllListsInBoard(this.props.boardId)
  }

  render() {
    return (
      <DroppableLists {...this.props} />
    )
  }
}

ListsContainer.propTypes = {
  boardId: PropTypes.string.isRequired,
  getAllListsInBoard: PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => ({
  lists: state.lists.data.filter(list => list.boardId === props.boardId),
  isFetching: state.lists.isFetching,
  isAdding: state.lists.isAdding,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addList,
  deleteList,
  getAllListsInBoard,
  saveListRank,
  saveTitleList,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListsContainer)
