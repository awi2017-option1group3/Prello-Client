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
      switch (result.type) {
        case 'LIST':
          this.moveListInStructure(
            result.source.index,
            result.destination.index,
          )
          break
        case 'CARD':
          if (result.destination.droppableId === result.source.droppableId) {
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
          break
      }
    }
  }

  moveListInStructure(originIndex, destinationIndex) {
    const lists = this.props.lists.sort((a, b) => a.pos > b.pos)

    const [removed] = lists.splice(originIndex, 1)
    lists.splice(destinationIndex, 0, removed)

    for (let i = 0; i < lists.length; i++) {
      lists[i].pos = i + 1
      this.props.saveListPos(this.props.board.id, lists[i])
    }
  }

  moveCardInList(originIndex, destinationIndex, listId) {
    const cards = this.props.cards.filter(card => card.listId === listId)
      .sort((a, b) => a.pos > b.pos)

    const [removed] = cards.splice(originIndex, 1)
    cards.splice(destinationIndex, 0, removed)

    for (let i = 0; i < cards.length; i++) {
      cards[i].pos = i + 1
      this.props.saveCardPos(this.props.board.id, cards[i])
    }
  }

  moveCardBewteenLists(originIndex, destinationIndex, initialListId, destinationListId) {
    const originCards = this.props.cards.filter(card => card.listId === initialListId)
      .sort((a, b) => a.pos > b.pos)
    const destinationCards = this.props.cards.filter(card => card.listId === destinationListId)
      .sort((a, b) => a.pos > b.pos)

    const [removed] = originCards.splice(originIndex, 1)
    destinationCards.splice(destinationIndex, 0, removed)

    for (let i = 0; i < originCards.length; i++) {
      originCards[i].pos = i + 1
      this.props.saveCardPos(this.props.board.id, originCards[i])
    }
    for (let i = 0; i < destinationCards.length; i++) {
      destinationCards[i].pos = i + 1
      destinationCards[i].listId = destinationListId
      this.props.saveCardPos(this.props.board.id, destinationCards[i])
    }

    const destinationList = this.props.lists.find(list => list.id === destinationListId)
    if (destinationList) {
      removed.assignees.filter(assignee => assignee.id !== this.props.user.id).forEach((assignee) => {
        this.props.addNotification(assignee.id, this.props.user.id, ` has moved the card ${removed.title} to the list ${destinationList.title} in the board `, this.props.board.id)
      })
      if (removed.responsible && removed.responsible.id !== this.props.user.id) {
        this.props.addNotification(removed.responsible.id, this.props.user.id, ` has moved the card ${removed.title} to the list ${destinationList.title} in the board `, this.props.board.id)
      }
    }
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
  board: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  lists: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  saveListPos: PropTypes.func.isRequired,
  saveCardPos: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
}

export default DndBoard
