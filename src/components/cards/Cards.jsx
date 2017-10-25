import React from 'react'
import PropTypes from 'prop-types'
import { Button, Spin } from 'antd'
import DraggableCard from '../card/DraggableCard'
import './style.css'

const Cards = props => (
  <div className="cards">
    { props.isFetching ? (
      <div className="cardsLoader">
        <Spin tip="Loading..." />
      </div>
    ) : (
      <div className="cardsWrapper">
        {props.cards.sort((a, b) => a.rank > b.rank).map(card => (
          <DraggableCard {...card} key={card.id} deleteCard={props.deleteCard} saveCardTitle={props.saveCardTitle} />
        ))}
        { props.isAdding ? (
          <div className="cardsLoader">
            <Spin tip="Creating a card..." />
          </div>
        ) : (
          <div className="addCardBlock">
            <Button
              className="addCardButton"
              onClick={() => props.addCard(props.listId, props.cards.length)}
              icon="plus"
              size="large"
              type="primary"
            >New Card</Button>
          </div>
        )}
      </div>
    )}
  </div>
)

Cards.propTypes = {
  listId: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isAdding: PropTypes.bool.isRequired,
  addCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  saveCardTitle: PropTypes.func.isRequired,
}

export default Cards
