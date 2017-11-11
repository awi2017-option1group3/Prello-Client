import React from 'react'
import PropTypes from 'prop-types'
import { Droppable } from 'react-beautiful-dnd'
import Cards from './Cards'
import './style.css'

const DroppableCards = props => (
  <Droppable droppableId={`droppable-cards-${props.listId}`} type="CARD" >
    {provided => (
      <div ref={provided.innerRef} className="droppableCards">
        <Cards {...props} droppableProvided={provided} />
      </div>
    )}
  </Droppable>
)

DroppableCards.propTypes = {
  cards: PropTypes.array.isRequired,
  listId: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  updateOneCardPopulated: PropTypes.func.isRequired,
}

export default DroppableCards
