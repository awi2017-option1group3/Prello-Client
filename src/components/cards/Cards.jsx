import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Spin } from 'antd'
import DraggableCard from '../cardPreview/DraggableCard'
import Loader from '../../commons/loader/Loader'
import './style.css'
import CreateWithName from '../../commons/createWithName/CreateWithName'

class Cards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adding: false,
      title: '',
    }
    this.add = this.add.bind(this)
    this.saveCard = this.saveCard.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  onCancel() {
    this.setState({
      adding: false,
    })
  }

  saveCard(Newtitle) {
    this.setState({
      adding: false,
      title: Newtitle,
    })
    this.props.addCard(this.props.listId, this.props.cards.length, Newtitle)
  }

  add() {
    return (
      <div>
        <CreateWithName
          title="New Card"
          save={(Newtitle) => {
            this.saveCard(Newtitle)
          }}
          cancel={this.onCancel}
        />
      </div>
    )
  }

  render() {
    return (
      <div className="cards">
        { this.props.isFetching ? (
          <Loader message="Loading..." />
        ) : (
          <div className="cardsWrapper">
            { this.props.cards.sort((a, b) => a.pos > b.pos).map(card => (
              <DraggableCard
                {...card}
                key={card.id}
                boardId={this.props.boardId}
                deleteCard={this.props.deleteCard}
                saveCardTitle={this.props.saveCardTitle}
                saveCardDesc={this.props.saveCardDesc}
                updateOneCardPopulated={this.props.updateOneCardPopulated}
              />
            ))}
            { this.props.droppableProvided.placeholder }
            { this.props.isAdding ? (
              <div className="cardsLoader">
                <Spin tip="Creating a card..." />
              </div>
            ) : (
              <div className="addCardBlock">
                {this.state.adding ? (
                  this.add()
                ) : (
                  <Button
                    className="addCardButton"
                    onClick={() => this.setState({
                      adding: true,
                    })}
                    icon="plus"
                    size="large"
                    type="primary"
                  >New Card</Button>)}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}


Cards.propTypes = {
  listId: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  droppableProvided: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isAdding: PropTypes.bool.isRequired,
  addCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  saveCardTitle: PropTypes.func.isRequired,
  updateOneCardPopulated: PropTypes.func.isRequired,
}

export default Cards
