import React from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import List from './List'
import './style.css'

const DraggableList = props => (
  <Draggable draggableId={props.id}>
    {draggableProvided => (
      <div className="draggableList">
        <div
          ref={draggableProvided.innerRef}
          style={draggableProvided.draggableStyle}
          {...draggableProvided.dragHandleProps}
        >
          <List {...props} />
        </div>
        <div className="draggableList">
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