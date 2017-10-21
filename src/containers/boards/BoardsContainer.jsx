import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DndBoard from '../../components/board/DndBoard'
import { getAllListsInBoard, getAllCardsInList, saveCardRank, saveListRank } from './actions'

class BoardsContainer extends Component {
  componentWillMount() {
    this.props.getAllListsInBoard(this.props.boardId)
  }

  render() {
    return (
      <DndBoard {...this.props} />
    )
  }
}

BoardsContainer.propTypes = {
  boardId: PropTypes.string.isRequired,
  getAllListsInBoard: PropTypes.func.isRequired,
  getAllCardsInList: PropTypes.func.isRequired,
  saveCardRank: PropTypes.func.isRequired,
  saveListRank: PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => ({
  lists: state.lists.data, // .filter(list => list.boardId === props.boardId),
  cards: state.cards.data,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllListsInBoard,
  getAllCardsInList,
  saveCardRank,
  saveListRank,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardsContainer)
