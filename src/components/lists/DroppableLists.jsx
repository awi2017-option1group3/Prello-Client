import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Droppable } from 'react-beautiful-dnd'
import Lists from './Lists'
import './style.css'

class DroppableLists extends Component {
  render() {
    return (
      <Droppable droppableId="droppable-board" direction="horizontal" type="List">
        {provided => (
          <div ref={provided.innerRef} className="droppableLists">
            <Lists {...this.props} droppableProvided={provided} />
          </div>
        )}
      </Droppable>
    )
  }
}

DroppableLists.propTypes = {
  lists: PropTypes.array.isRequired,
}

export default DroppableLists
