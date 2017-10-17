import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Cards from '../../components/cards/Cards'
import { addCard, deleteCard, getAllCardsInList } from './actions'

class CardsContainer extends Component {
  componentWillMount() {
    this.props.getAllCardsInList(this.props.listId)
  }

  render() {
    return (
      <Cards {...this.props} />
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
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardsContainer)
