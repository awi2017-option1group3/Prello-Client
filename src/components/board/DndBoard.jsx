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

  moveCardInList(originIndex, destinationIndex, listId) {
    const result = Array.from(this.props.cards.filter(card => card.listId === listId))
    const [removed] = result.splice(originIndex, 1)
    result.splice(destinationIndex, 0, removed)
    if (destinationIndex < originIndex) {
      for (let i = destinationIndex; i <= originIndex; i++) {
        result[i].rank = i + 1
        this.props.saveCardRank(result[i])
      }
    } else {
      for (let i = destinationIndex; i >= originIndex; i--) {
        result[i].rank = i + 1
        result[i].listId = listId
        this.props.saveCardRank(result[i])
      }
    }
    return result
  }

  moveCardBewteenLists(originIndex, destinationIndex, initialListId, destinationListId) {
    const cardToMove = this.props.cards.filter(card => card.listId === destinationListId
      && card.rank === originIndex)[0]
    // const originList = this.props.cards.filter(card => card.listId === initialListId)
    const destinationList = Array.from(this.props.cards.filter(card => card.listId === destinationListId))
    const [removed] = destinationList.splice(originIndex, 1)
    destinationList.splice(destinationIndex, 0, removed)
    for (let i = destinationIndex; i <= originIndex; i++) {
      destinationList[i].rank = i + 1
      destinationList[i].listId = destinationListId
      this.props.saveCardRank(destinationList[i])
    }
    destinationList.push(cardToMove)
    return destinationList
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
