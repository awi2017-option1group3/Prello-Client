import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DroppableCards from '../../components/cards/DroppableCards'
import { addCard, deleteCard, getAllCardsInList, saveCardRank } from './actions'

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
  getAllCardsInList: PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => ({
  cards: state.cards.data.filter(card => card.listId === props.listId),
})

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteCard,
  addCard,
  getAllCardsInList,
  saveCardRank,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardsContainer)
