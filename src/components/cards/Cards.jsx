import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import Card from '../card/Card'
import './style.css'

const Cards = props => (
  <div className="cardsWrapper">
    {props.cards.map(card => (
      <Card key={card.id} {...card} />
    ))}
    <div className="addCardBlock">
      <Button
        className="addCardButton"
        // TODO : fix listID call in route.
        onClick={() => props.addCard(props.listId)}
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
}

export default Cards
