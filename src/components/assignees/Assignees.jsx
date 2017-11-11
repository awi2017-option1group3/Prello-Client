import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Popover } from 'antd'
import './style.css'


class Assignees extends Component {
  getAssignees() {
    const members = this.props.assignees.sort((a, b) => a.initials > b.initials).slice(0)
    if (this.props.cardResponsible !== null && typeof this.props.cardResponsible.id !== 'undefined') {
      // if responsible is in members, sets responsible to be the first user
      if (members.map(element => element.id).includes(this.props.cardResponsible.id) === true) {
        const indexOfResponsible = members.findIndex(x => x.id === this.props.cardResponsible.id)
        members.splice(indexOfResponsible, 1)
      }
      members.splice(0, 0, this.props.cardResponsible)
    }

    if (members.length > this.props.maxNumberOfPeopleInALine) {
      const moreMembers = (
        <div>
          {members.slice(this.props.maxNumberOfPeopleInALine - 1, members.length)
            .map(assignee => (
              <p key={this.props.cardId + assignee.id} className="assigneeInitials">
                {assignee.initials.toUpperCase()}
              </p>
            ))}
        </div>
      )
      return (
        <div>
          {members.slice(0, this.props.maxNumberOfPeopleInALine - 1).map(assignee => (
            <Avatar
              key={this.props.cardId + assignee.id}
              style={(this.props.cardResponsible !== null && typeof this.props.cardResponsible.id !== 'undefined' && assignee.id === this.props.cardResponsible.id) ?
                { backgroundColor: '#3586EA' }
                :
                {}}
              className="assigneeInitials"
            >
              {assignee.initials.toUpperCase()}
            </Avatar>
          ))}
          <Popover content={moreMembers} trigger="hover">
            <Avatar key={`${this.props.cardId}additionnals`} className="assigneeInitials">
              +{(members.length - this.props.maxNumberOfPeopleInALine + 1)}
            </Avatar>
          </Popover>
        </div>
      )
    }
    return (
      <div>
        {members.map(assignee => (
          <Avatar
            key={this.props.cardId + assignee.id}
            style={(this.props.cardResponsible !== null && typeof this.props.cardResponsible.id !== 'undefined' && assignee.cardId === this.props.cardResponsible.id) ?
              { backgroundColor: '#3586EA' }
              :
              {}}
            className="assigneeInitials"
          >
            {assignee.initials.toUpperCase()}
          </Avatar>
        ))}
      </div>
    )
  }

  render() {
    return (
      this.getAssignees()
    )
  }
}
/*
Assignees.defaultProps = {
  cardResponsible: null,
}
*/
Assignees.propTypes = {
  cardId: PropTypes.string.isRequired,
  assignees: PropTypes.array.isRequired,
  cardResponsible: PropTypes.object.isRequired,
  maxNumberOfPeopleInALine: PropTypes.number.isRequired,
}

export default Assignees
