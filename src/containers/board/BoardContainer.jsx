import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import DndBoard from '../../components/board/DndBoard'
import ErrorDisplayer from '../../commons/errorDisplayer/ErrorDisplayer'
import { cleanState as cleanBoardState, getAllLabelsInBoard, getAllListsInBoard, getOneBoard, saveBoardTitle } from './actions'
import {
  cleanState as cleanListsState, saveListPos,
  pushNewList, pushNewListName, pushNewListPosition, pushDeleteList,
} from '../lists/actions'
import {
  cleanState as cleanCardsState, getAllCardsInList, saveCardPos,
  pushNewCard, pushNewCardName, pushNewCardPosition, pushDeleteCard, pushRefreshCard,
} from '../cards/actions'
import {
  joinBoard, leaveBoard,
  listenAddList, listenRenameList, listenMoveList, listenDeleteList,
  listenAddCard, listenRenameCard, listenMoveCard, listenDeleteCard, listenRefreshCard,
} from '../../websockets'
import { addNotification } from '../notifications/actions'

class BoardContainer extends Component {
  componentWillMount() {
    this.props.cleanBoardState()
    this.props.cleanListsState()
    this.props.cleanCardsState()
    this.props.getAllLabelsInBoard(this.props.match.params.boardId)
    this.props.getAllListsInBoard(this.props.match.params.boardId)
    this.props.getOneBoard(this.props.match.params.boardId)
    joinBoard(this.props.match.params.boardId, () => {
      listenAddList(this.props.pushNewList)
      listenRenameList(this.props.pushNewListName)
      listenMoveList(this.props.pushNewListPosition)
      listenDeleteList(this.props.pushDeleteList)
      listenAddCard(this.props.pushNewCard)
      listenRenameCard(this.props.pushNewCardName)
      listenMoveCard(this.props.pushNewCardPosition)
      listenDeleteCard(this.props.pushDeleteCard)
      listenRefreshCard(this.props.pushRefreshCard)
    })
  }

  componentWillUnmount() {
    leaveBoard(this.props.match.params.boardId)
  }

  render() {
    if (this.props.user) {
      return this.props.board.hasFailed
        || ((this.props.board.owner !== this.props.user.id)
          && (this.props.board.contributors.filter(contributorId => contributorId === this.props.user.id).length === 0))
        ? (
          <ErrorDisplayer message="Failed to load this board. Maybe it doesn't exist, or you don't have access to it." />
        ) : (
          <DndBoard {...this.props} {...this.props.board} boardId={this.props.match.params.boardId} />
        )
    }
    return (null)
  }
}

BoardContainer.defaultProps = {
  user: null,
}

BoardContainer.propTypes = {
  match: PropTypes.object.isRequired,
  board: PropTypes.object.isRequired,
  user: PropTypes.object,
  cleanBoardState: PropTypes.func.isRequired,
  cleanListsState: PropTypes.func.isRequired,
  cleanCardsState: PropTypes.func.isRequired,
  getAllLabelsInBoard: PropTypes.func.isRequired,
  getAllListsInBoard: PropTypes.func.isRequired,
  getAllCardsInList: PropTypes.func.isRequired,
  saveCardPos: PropTypes.func.isRequired,
  saveListPos: PropTypes.func.isRequired,
  getOneBoard: PropTypes.func.isRequired,
  saveBoardTitle: PropTypes.func.isRequired,
  // Realtime actions
  pushNewList: PropTypes.func.isRequired,
  pushNewListName: PropTypes.func.isRequired,
  pushNewListPosition: PropTypes.func.isRequired,
  pushDeleteList: PropTypes.func.isRequired,
  pushNewCard: PropTypes.func.isRequired,
  pushNewCardName: PropTypes.func.isRequired,
  pushNewCardPosition: PropTypes.func.isRequired,
  pushDeleteCard: PropTypes.func.isRequired,
  pushRefreshCard: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  board: state.currentBoard,
  lists: state.lists.data,
  cards: state.cards.data,
  user: state.user.infos,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  cleanBoardState,
  cleanListsState,
  cleanCardsState,
  getAllLabelsInBoard,
  getAllListsInBoard,
  getAllCardsInList,
  saveCardPos,
  saveListPos,
  getOneBoard,
  saveBoardTitle,
  addNotification,
  // Realtime actions
  pushNewList,
  pushNewListName,
  pushNewListPosition,
  pushDeleteList,
  pushNewCard,
  pushNewCardName,
  pushNewCardPosition,
  pushDeleteCard,
  pushRefreshCard,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardContainer)
