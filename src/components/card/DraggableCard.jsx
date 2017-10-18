import React from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import Card from './Card'
import './style.css'

const DraggableCard = props => (
  <Draggable draggableId={`droppable-card-${props.id}`} type="Card" >
    {draggableProvided => (
      <div className="draggableCard">
        <div
          ref={draggableProvided.innerRef}
          style={draggableProvided.draggableStyle}
        >
          <Card {...props} dragHandleProps={draggableProvided.dragHandleProps}/>
        </div>
        <div>
          {draggableProvided.placeholder}
        </div>
      </div>
    )}
  </Draggable>
)

DraggableCard.propTypes = {
  id: PropTypes.string.isRequired,
}

export default DraggableCard
