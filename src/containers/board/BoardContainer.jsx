import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DndBoard from '../../components/board/DndBoard'
import ErrorDisplayer from '../../commons/errorDisplayer/ErrorDisplayer'
import { cleanState as cleanBoardState, getAllListsInBoard, getOneBoard, saveBoardTitle } from './actions'
import { cleanState as cleanListsState, saveListPos } from '../lists/actions'
import { cleanState as cleanCardsState, getAllCardsInList, saveCardPos } from '../cards/actions'

class BoardContainer extends Component {
  componentWillMount() {
    this.props.cleanBoardState()
    this.props.cleanListsState()
    this.props.cleanCardsState()
    this.props.getAllListsInBoard(this.props.match.params.boardId)
    this.props.getOneBoard(this.props.match.params.boardId)
  }

  render() {
    if (this.props.board.isFailed) {
      return (<ErrorDisplayer message="Failed to load this board. Maybe it doesn't exist, or you don't have access to it." />)
    } else if (this.props.user) {
      return (<DndBoard {...this.props} {...this.props.board} boardId={this.props.match.params.boardId} />)
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
  getAllListsInBoard: PropTypes.func.isRequired,
  getAllCardsInList: PropTypes.func.isRequired,
  saveCardPos: PropTypes.func.isRequired,
  saveListPos: PropTypes.func.isRequired,
  getOneBoard: PropTypes.func.isRequired,
  saveBoardTitle: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user.infos,
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
  saveCardPos,
  saveListPos,
  getOneBoard,
  saveBoardTitle,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardContainer)
