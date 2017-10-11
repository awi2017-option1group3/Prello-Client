import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addList, getAllLists, saveListRank } from './actions'
import DroppableBoard from './DroppableBoard'

class BoardContainer extends Component {
  componentDidMount() {
    this.props.getAllLists()
  }

  render() {
    return (
      <DroppableBoard {...this.props} />
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
  saveListRank,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardContainer)
