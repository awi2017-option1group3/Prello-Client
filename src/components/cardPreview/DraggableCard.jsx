import React from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import Card from './CardPreview'
import './style.css'

const DraggableCard = props => (
  <Draggable draggableId={`draggable-card-${props.id}`} type="CARD" >
    {draggableProvided => (
      <div className="draggableCard">
        <div
          ref={draggableProvided.innerRef}
          style={draggableProvided.draggableStyle}
        >
          <Card {...props} dragHandleProps={draggableProvided.dragHandleProps} />
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
