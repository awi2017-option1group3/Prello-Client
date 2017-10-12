import React from 'react'
import PropTypes from 'prop-types'
import Card from '../card/Card'
import './style.css'

const Cards = props => (
  <div>
    {props.cards.map(card => (
      <Card key={card.id} {...card} />
    ))}
  </div>
)

Cards.propTypes = {
  cards: PropTypes.array.isRequired,
}

export default Cards
