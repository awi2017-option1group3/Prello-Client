import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Spin } from 'antd'

import DraggableCard from '../cardPreview/DraggableCard'
import Loader from '../../commons/loader/Loader'
import CreateWithName from '../../commons/createWithName/CreateWithName'
import './style.css'

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

  saveCard(newTitle) {
    this.setState({
      adding: false,
      title: newTitle,
    })
    this.props.addCard(this.props.boardId, this.props.listId, this.props.cards.length, newTitle)
  }

  add() {
    return (
      <div>
        <CreateWithName
          title="New Card"
          save={(newTitle) => {
            this.saveCard(newTitle)
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
                user={this.props.user}
                deleteCard={this.props.deleteCard}
                saveCardTitle={this.props.saveCardTitle}
                saveCardDesc={this.props.saveCardDesc}
                refreshCard={this.props.refreshCard}
                addNotification={this.props.addNotification}
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
  user: PropTypes.object.isRequired,
  droppableProvided: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isAdding: PropTypes.bool.isRequired,
  addCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  saveCardTitle: PropTypes.func.isRequired,
  saveCardDesc: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
  refreshCard: PropTypes.func.isRequired,
}

export default Cards
