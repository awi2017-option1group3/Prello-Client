import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import './style.css'

const Option = Select.Option

class AssigneesSelect extends Component {
  constructor(props) {
    super(props)
    this.handleChangeAssignee = this.handleChangeAssignee.bind(this)
  }

  handleChangeAssignee(value) {
    const memberId = value.substring(this.props.card.id.length)
    if (this.props.assignees.map(element => element.id).includes(memberId) === true) {
      this.props.removeAssigneeFromCard(this.props.card.id, memberId)
      this.props.addNotification(memberId, this.props.user.id, ` has removed you from the card ${this.props.card.title} in the board `, this.props.boardId)
    } else {
      this.props.addAssigneeToCard(this.props.card.id, memberId)
      this.props.addNotification(memberId, this.props.user.id, ` has added you as assignee of the card ${this.props.card.title} in the board `, this.props.boardId)
    }
  }

  render() {
    return (
      <Select
        className="cardAssignees"
        placeholder="Choose assignees..."
        onChange={this.handleChangeAssignee}
        style={{ width: '100%' }}
        tokenSeparators={[',']}
      >
        { this.props.allUsers.map(user => <Option key={this.props.card.id + user.id}>{ user.fullName }</Option>) }
      </Select>
    )
  }
}

AssigneesSelect.propTypes = {
  card: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  boardId: PropTypes.string.isRequired,
  allUsers: PropTypes.array.isRequired,
  assignees: PropTypes.array.isRequired,
  addAssigneeToCard: PropTypes.func.isRequired,
  removeAssigneeFromCard: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
}

export default AssigneesSelect
