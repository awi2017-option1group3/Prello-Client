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
          if (result.destination.droppableId.split('-')[2] === result.source.droppableId.split('-')[2]) {
            this.moveCardInList(
              result.source.index,
              result.destination.index,
              result.source.droppableId.split('-')[2],
            )
          } else {
            const initialListId = result.source.droppableId.split('-')[2]
            const destinationListId = result.destination.droppableId.split('-')[2]
            this.moveCardBewteenLists(
              result.source.index,
              result.destination.index,
              initialListId,
              destinationListId,
            )
          }
          break
        default:
          console.log('result.destination.type mismatch')
          break
      }   
    }
  }

  moveListInStructure(originIndex, destinationIndex) {
    const result = Array.from(this.props.lists)
      .sort((a, b) => a.rank > b.rank)
    const [removed] = result.splice(originIndex, 1)
    result.splice(destinationIndex, 0, removed)
    for (let i = 0; i < result.length; i++) {
      result[i].rank = i + 1
      this.props.saveListRank(result[i])
    }
    return result
  }

  moveCardInList(originIndex, destinationIndex, listId) {
    const result = Array.from(this.props.cards.filter(card => card.listId === listId)
      .sort((a, b) => a.rank > b.rank))
    const [removed] = result.splice(originIndex, 1)
    result.splice(destinationIndex, 0, removed)
    for (let i = 0; i < result.length; i++) {
      result[i].rank = i + 1
      this.props.saveCardRank(result[i])
    }
    return result
  }

  moveCardBewteenLists(originIndex, destinationIndex, initialListId, destinationListId) {
    const originList = this.props.cards.filter(card => card.listId === initialListId)
      .sort((a, b) => a.rank > b.rank)
    const destinationList = Array.from(this.props.cards.filter(card => card.listId === destinationListId))
      .sort((a, b) => a.rank > b.rank)
    const [removed] = originList.splice(originIndex, 1)
    // reorder origin list where the card was taken from
    for (let i = 0; i < originList.length; i++) {
      originList[i].rank = i + 1
      this.props.saveCardRank(originList[i])
    }
    destinationList.splice(destinationIndex, 0, removed)
    for (let i = 0; i < destinationList.length; i++) {
      destinationList[i].rank = i + 1
      destinationList[i].listId = destinationListId
      this.props.saveCardRank(destinationList[i])
    }
    return (originList, destinationList)
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
  cards: PropTypes.array.isRequired,
  lists: PropTypes.array.isRequired,
  saveListRank: PropTypes.func.isRequired,
  saveCardRank: PropTypes.func.isRequired,
}

export default DndBoard
