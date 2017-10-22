import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DndBoard from '../../components/board/DndBoard'
import { cleanState as cleanBoardState, getAllListsInBoard } from './actions'
import { cleanState as cleanListsState, saveListRank } from '../lists/actions'
import { cleanState as cleanCardsState, getAllCardsInList, saveCardRank } from '../cards/actions'

class BoardsContainer extends Component {
  componentWillMount() {
    this.props.cleanBoardState()
    this.props.cleanListsState()
    this.props.cleanCardsState()
    this.props.getAllListsInBoard(this.props.match.params.boardId)
  }

  render() {
    return (
      <DndBoard {...this.props} boardId={this.props.match.params.boardId} />
    )
  }
}

BoardsContainer.propTypes = {
  match: PropTypes.object.isRequired,
  cleanBoardState: PropTypes.func.isRequired,
  cleanListsState: PropTypes.func.isRequired,
  cleanCardsState: PropTypes.func.isRequired,
  getAllListsInBoard: PropTypes.func.isRequired,
  getAllCardsInList: PropTypes.func.isRequired,
  saveCardRank: PropTypes.func.isRequired,
  saveListRank: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  lists: state.lists, // .filter(list => list.boardId === props.boardId),
  cards: state.cards,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  cleanBoardState,
  cleanListsState,
  cleanCardsState,
  getAllListsInBoard,
  getAllCardsInList,
  saveCardRank,
  saveListRank,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardsContainer)
