import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import './style.css'

const Option = Select.Option

class ResponsibleSelect extends Component {
  constructor(props) {
    super(props)
    this.handleChangeResponsible = this.handleChangeResponsible.bind(this)
    this.state = {
      value: '',
      placeholder: 'Choose responsible...',
    }
  }

  handleChangeResponsible(value) {
    const memberId = value.substring(this.props.card.id.length)
    if (this.props.cardResponsible !== null && typeof this.props.cardResponsible.id !== 'undefined' && this.props.cardResponsible.id === memberId) {
      this.props.removeResponsibleFromCard(this.props.card.id)
      if (memberId !== this.props.user.id) {
        // Notify the user involved
        this.props.addNotification(memberId, this.props.user.id, ` has removed you from the card ${this.props.card.title} in the board `, this.props.boardId)
        // Notify the card assignees about responsible update
        this.props.assignees.forEach((assignee) => {
          this.props.addNotification(assignee.id, memberId, ` is no longer responsible for the card ${this.props.card.title} in the board `, this.props.boardId)
        })
      }
    } else {
      this.props.addResponsibleToCard(this.props.card.id, memberId)
      if (memberId !== this.props.user.id) {
        // Notify the user involved
        this.props.addNotification(memberId, this.props.user.id, ` has added you as responsible of the card ${this.props.card.title} in the board `, this.props.boardId)
        // Notify the card assignees about responsible update
        this.props.assignees.forEach((assignee) => {
          this.props.addNotification(assignee.id, memberId, ` is the new responsible of the card ${this.props.card.title} in the board `, this.props.boardId)
        })
      }
    }
    this.setState({
      placeholder: 'Choose responsible...',
    })
  }

  render() {
    return (
      <Select
        className="cardResponsible"
        placeholder={this.state.placeholder}
        onChange={this.handleChangeResponsible}
        style={{ width: '100%' }}
        value={this.state.value}
        tokenSeparators={[',']}
      >
        { this.props.allUsers.map(user => <Option key={this.props.card.id + user.id}>{ user.fullName }</Option>) }
      </Select>
    )
  }
}

ResponsibleSelect.propTypes = {
  card: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  boardId: PropTypes.string.isRequired,
  allUsers: PropTypes.array.isRequired,
  cardResponsible: PropTypes.object.isRequired,
  assignees: PropTypes.array.isRequired,
  addResponsibleToCard: PropTypes.func.isRequired,
  removeResponsibleFromCard: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
}

export default ResponsibleSelect
