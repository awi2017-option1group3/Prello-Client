import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import DraggableCard from '../card/DraggableCard'
import './style.css'

const Cards = props => (
  <div className="cardsWrapper">
    {props.cards.sort((a, b) => a.rank > b.rank).map(card => (
      <DraggableCard {...card} key={card.id} deleteCard={props.deleteCard} />
    ))}
    <div className="addCardBlock">
      <Button
        className="addCardButton"
        onClick={() => props.addCard(props.listId, props.cards.length)}
        icon="plus"
        size="large"
        type="primary"
      >New Card</Button>
    </div>
  </div>
)

Cards.propTypes = {
  listId: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,  
  addCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
}

export default Cards
