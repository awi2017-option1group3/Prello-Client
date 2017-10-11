import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import List from '../../components/list/List'
import './style.css'

class DraggableList extends Component {
  render() {
    return (
      <Draggable draggableId={this.props.id}>
        {draggableProvided => (
          <div className="draggableList">
            <div
              ref={draggableProvided.innerRef}
              style={draggableProvided.draggableStyle}
              {...draggableProvided.dragHandleProps}
            >
              <List {...this.props} />
            </div>
            <div className="draggableList">
              {draggableProvided.placeholder}
            </div>
          </div>
        )}
      </Draggable>
    )
  }
}

DraggableList.propTypes = {
  id: PropTypes.string.isRequired,
}

export default DraggableList
