import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Cards from './Cards'
import './style.css'

class DroppableCards extends Component {
  constructor(props) {
    super(props)
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  onDragEnd(result) {
    if (result.destination) {
      this.moveCardInStructure(
        result.source.index,
        result.destination.index,
      )
    }
  }

  moveCardInStructure(originIndex, destinationIndex) {
    const result = Array.from(this.props.cards)
    const [removed] = result.splice(originIndex, 1)
    result.splice(destinationIndex, 0, removed)
    if (destinationIndex < originIndex) {
      for (let i = destinationIndex; i <= originIndex; i++) {
        result[i].rank = i + 1
        this.props.saveCardRank(result[i])
      }
    } else {
      for (let i = destinationIndex; i >= originIndex; i--) {
        result[i].rank = i + 1
        this.props.saveCardRank(result[i])
      }
    }
    return result
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable-list" direction="vertical">
          {provided => (
            <div ref={provided.innerRef} className="droppableCards">
              <Cards {...this.props} droppableProvided={provided} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}

DroppableCards.propTypes = {
  cards: PropTypes.array.isRequired,
  saveCardRank: PropTypes.func.isRequired,
}

export default DroppableCards
