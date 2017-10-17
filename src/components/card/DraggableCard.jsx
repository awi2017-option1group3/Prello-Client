import React from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import Card from './Card'
import './style.css'

const DraggableCard = props => (
  <Draggable draggableId={props.id}>
    {draggableProvided => (
      <div className="draggableCard">
        <div
          ref={draggableProvided.innerRef}
          style={draggableProvided.draggableStyle}
          {...draggableProvided.dragHandleProps}
        >
          <Card {...props} />
        </div>
        <div className="draggableCard">
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
