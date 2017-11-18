import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import DroppableCards from '../../components/cards/DroppableCards'
import { addCard, deleteCard, getAllCardsInList, refreshCard, saveCardPos, saveCardTitle, saveCardDesc } from './actions'
import { addNotification } from '../notifications/actions'

class CardsContainer extends Component {
  componentWillMount() {
    this.props.getAllCardsInList(this.props.listId)
  }

  render() {
    return (
      <DroppableCards {...this.props} />
    )
  }
}

CardsContainer.propTypes = {
  listId: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  getAllCardsInList: PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => ({
  cards: state.cards.data.filter(card => card.listId === props.listId),
  user: state.user.infos,
  isAdding: state.cards.isAddingListIds.includes(props.listId),
  isFetching: state.cards.isFetchingListIds.includes(props.listId),
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addCard,
  deleteCard,
  getAllCardsInList,
  refreshCard,
  saveCardPos,
  saveCardTitle,
  saveCardDesc,
  addNotification,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardsContainer)
