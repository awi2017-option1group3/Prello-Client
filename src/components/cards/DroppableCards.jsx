import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Droppable } from 'react-beautiful-dnd'
import Cards from './Cards'
import './style.css'

class DroppableCards extends Component {
  render() {
    return (
      <Droppable droppableId={`droppable-list-${this.props.listId}`} type="Card" >
        {provided => (
          <div ref={provided.innerRef} className="droppableCards">
            <Cards {...this.props} droppableProvided={provided} />
          </div>
        )}
      </Droppable>
    )
  }
}

DroppableCards.propTypes = {
  cards: PropTypes.array.isRequired,
  listId: PropTypes.string.isRequired,
}

export default DroppableCards
