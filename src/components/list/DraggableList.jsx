import React from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import List from './List'
import './style.css'

const DraggableList = props => (
  <Draggable draggableId={`draggable-list-${props.id}`} type="LIST">
    {draggableProvided => (
      <div className="draggableList">
        <div
          ref={draggableProvided.innerRef}
          style={draggableProvided.draggableStyle}
        >
          <List {...props} dragHandleProps={draggableProvided.dragHandleProps} />
        </div>
        <div>
          {draggableProvided.placeholder}
        </div>
      </div>
    )}
  </Draggable>
)

DraggableList.propTypes = {
  id: PropTypes.string.isRequired,
}

export default DraggableList
