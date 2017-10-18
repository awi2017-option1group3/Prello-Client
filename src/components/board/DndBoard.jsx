import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Board from './Board'
import './style.css'

class DndBoard extends Component {
  constructor(props) {
    super(props)
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  onDragEnd(result) {
    if (result.destination) {
      switch (result.destination.droppableId.split('-')[1]) {
        case 'board':
          this.moveListInStructure(
            result.source.index,
            result.destination.index,
          )
          break
        case ('list'):
          this.moveCardInStructure(
            result.source.index,
            result.destination.index,
            result.destination,
          )
          break
        default:
          console.log('result.destination.type mismatch')
          break
      }   
    }
  }

  moveListInStructure(originIndex, destinationIndex) {
    const result = Array.from(this.props.lists)
    const [removed] = result.splice(originIndex, 1)
    result.splice(destinationIndex, 0, removed)
    if (destinationIndex < originIndex) {
      for (let i = destinationIndex; i <= originIndex; i++) {
        result[i].rank = i + 1
        this.props.saveListRank(result[i])
      }
    } else {
      for (let i = destinationIndex; i >= originIndex; i--) {
        result[i].rank = i + 1
        this.props.saveListRank(result[i])
      }
    }
    return result
  }

  moveCardInStructure(originIndex, destinationIndex, destination) {
    const result = Array.from(destination.cards)
    const [removed] = result.splice(originIndex, 1)
    result.splice(destinationIndex, 0, removed)
    if (destinationIndex < originIndex) {
      for (let i = destinationIndex; i <= originIndex; i++) {
        result[i].rank = i + 1
        this.props.saveCardRank(result[i], destination.id)
      }
    } else {
      for (let i = destinationIndex; i >= originIndex; i--) {
        result[i].rank = i + 1
        result[i].listId = destination.id
        this.props.saveCardRank(result[i])
      }
    }
    return result
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="main-droppable-board" direction="horizontal" >
          {provided => (
            <div ref={provided.innerRef} className="droppableBoard">
              <Board {...this.props} droppableProvided={provided} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}

DndBoard.propTypes = {
  lists: PropTypes.array.isRequired,
  saveListRank: PropTypes.func.isRequired,
  saveCardRank: PropTypes.func.isRequired,
}

export default DndBoard
