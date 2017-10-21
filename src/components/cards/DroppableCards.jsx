import React from 'react'
import PropTypes from 'prop-types'
import { Droppable } from 'react-beautiful-dnd'
import Cards from './Cards'
import './style.css'

const DroppableCards = props => (
  <Droppable droppableId={`droppable-list-${props.listId}`} listId={props.listId} type="Card" >
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
}

export default DroppableCards
