import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Lists from './Lists'
import './style.css'

class DroppableLists extends Component {
  constructor(props) {
    super(props)
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  onDragEnd(result) {
    if (result.destination) {
      this.moveListInStructure(
        result.source.index,
        result.destination.index,
      )
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

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable-board" direction="horizontal">
          {provided => (
            <div ref={provided.innerRef} className="droppableLists">
              <Lists {...this.props} droppableProvided={provided} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}

DroppableLists.propTypes = {
  lists: PropTypes.array.isRequired,
  saveListRank: PropTypes.func.isRequired,
}

export default DroppableLists