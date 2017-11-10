import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd' // A graphical card component is used to display a list
import './style.css'

const Option = Select.Option

class AssigneesSelect extends Component {
  constructor(props) {
    super(props)
    this.handleChangeAssignee = this.handleChangeAssignee.bind(this)
  }

  handleChangeAssignee(value) {
    const memberId = value.substring(this.props.cardId.length)
    if (this.props.assignees.map(element => element.id).includes(memberId) === true) {
      this.props.removeAssigneeFromCard(this.props.cardId, memberId)
    } else {
      this.props.addAssigneeToCard(this.props.cardId, memberId)
    }
  }

  render() {
    return (
      <Select
        className="cardAssignees"
        // mode="tags"
        placeholder="Choose assignees..."
        onChange={this.handleChangeAssignee}
        // value={props.assignees.sort((a, b) => a.initials > b.initials).map(assignee => props.cardId + assignee.id)}
        style={{ width: '100%' }}
        tokenSeparators={[',']}
      >
        { this.props.allUsers.map(user => <Option key={this.props.cardId + user.id}>{ user.fullName }</Option>) }
      </Select>
    )
  }
}

AssigneesSelect.propTypes = {
  cardId: PropTypes.string.isRequired,
  allUsers: PropTypes.array.isRequired,
  assignees: PropTypes.array.isRequired,
  addAssigneeToCard: PropTypes.func.isRequired,
  removeAssigneeFromCard: PropTypes.func.isRequired,
}

export default AssigneesSelect
