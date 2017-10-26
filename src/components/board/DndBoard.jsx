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
    const lists = this.props.lists.sort((a, b) => a.rank > b.rank)

    const [removed] = lists.splice(originIndex, 1)
    lists.splice(destinationIndex, 0, removed)

    for (let i = 0; i < lists.length; i++) {
      lists[i].rank = i + 1
      this.props.saveListRank(lists[i])
    }
  }

  moveCardInList(originIndex, destinationIndex, listId) {
    const cards = this.props.cards.filter(card => card.listId === listId)
      .sort((a, b) => a.rank > b.rank)

    const [removed] = cards.splice(originIndex, 1)
    cards.splice(destinationIndex, 0, removed)

    for (let i = 0; i < cards.length; i++) {
      cards[i].rank = i + 1
      this.props.saveCardRank(cards[i])
    }
  }

  moveCardBewteenLists(originIndex, destinationIndex, initialListId, destinationListId) {
    const originCards = this.props.cards.filter(card => card.listId === initialListId)
      .sort((a, b) => a.rank > b.rank)
    const destinationCards = this.props.cards.filter(card => card.listId === destinationListId)
      .sort((a, b) => a.rank > b.rank)

    const [removed] = originCards.splice(originIndex, 1)
    destinationCards.splice(destinationIndex, 0, removed)

    for (let i = 0; i < originCards.length; i++) {
      originCards[i].rank = i + 1
      this.props.saveCardRank(originCards[i])
    }
    for (let i = 0; i < destinationCards.length; i++) {
      destinationCards[i].rank = i + 1
      destinationCards[i].listId = destinationListId
      this.props.saveCardRank(destinationCards[i])
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
  cards: PropTypes.array.isRequired,
  lists: PropTypes.array.isRequired,
  saveListRank: PropTypes.func.isRequired,
  saveCardRank: PropTypes.func.isRequired,
}

export default DndBoard
