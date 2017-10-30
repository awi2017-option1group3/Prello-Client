import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DndBoard from '../../components/board/DndBoard'
import { cleanState as cleanBoardState, getAllListsInBoard, getOneBoard, saveBoardTitle } from './actions'
import { cleanState as cleanListsState, saveListRank } from '../lists/actions'
import { cleanState as cleanCardsState, getAllCardsInList, saveCardRank } from '../cards/actions'

class BoardContainer extends Component {
  componentWillMount() {
    this.props.cleanBoardState()
    this.props.cleanListsState()
    this.props.cleanCardsState()
    this.props.getAllListsInBoard(this.props.match.params.boardId)
    this.props.getOneBoard(this.props.match.params.boardId)    
  }

  render() {
    return (
      <DndBoard {...this.props} {...this.props.board} boardId={this.props.match.params.boardId} />
    )
  }
}

BoardContainer.propTypes = {
  match: PropTypes.object.isRequired,
  cleanBoardState: PropTypes.func.isRequired,
  cleanListsState: PropTypes.func.isRequired,
  cleanCardsState: PropTypes.func.isRequired,
  getAllListsInBoard: PropTypes.func.isRequired,
  getAllCardsInList: PropTypes.func.isRequired,
  saveCardRank: PropTypes.func.isRequired,
  saveListRank: PropTypes.func.isRequired,
  getOneBoard: PropTypes.func.isRequired,
  saveBoardTitle: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  board: state.currentBoard,
  lists: state.lists.data,
  cards: state.cards.data,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  cleanBoardState,
  cleanListsState,
  cleanCardsState,
  getAllListsInBoard,
  getAllCardsInList,
  saveCardRank,
  saveListRank,
  getOneBoard,
  saveBoardTitle,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardContainer)
