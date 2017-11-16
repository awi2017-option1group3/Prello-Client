import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Popover } from 'antd'

import './style.css'

class Assignees extends Component {
  renderReponsible() {
    return this.props.cardResponsible !== null && typeof this.props.cardResponsible.id !== 'undefined' ? (
      <div
        key={this.props.target + this.props.cardId + this.props.cardResponsible}
        className="cardAvatar responsible"
      >
        <span>{this.props.cardResponsible.initials.toUpperCase()}</span>
      </div>
    ) : (null)
  }

  renderAssignees() {
    const sortedAssignees = this.props.assignees.sort((a, b) => a.initials.toUpperCase() > b.initials.toUpperCase())
    if (this.props.cardResponsible !== null && typeof this.props.cardResponsible.id !== 'undefined') {
      // if responsible is in members, sets responsible to be the first user
      if (sortedAssignees.map(assignee => assignee.id).includes(this.props.cardResponsible.id) === true) {
        const indexOfResponsible = sortedAssignees.findIndex(assignee => assignee.id === this.props.cardResponsible.id)
        sortedAssignees.splice(indexOfResponsible, 1)
      }
    }
    const displayedAssignees = sortedAssignees.slice(0, this.props.maxDisplayedAssignees)
    const hiddenAssignees = sortedAssignees.slice(this.props.maxDisplayedAssignees, sortedAssignees.length)
    return (
      <span>
        {displayedAssignees.map(assignee => (
          <div
            key={this.props.target + this.props.cardId + assignee.id}
            className="cardAvatar assignee"
          >
            <span>{assignee.initials.toUpperCase()}</span>
          </div>
        ))}
        {hiddenAssignees.length > 0 ? (
          <Popover content={this.renderHiddenAssignees(hiddenAssignees)} trigger="hover">
            <div
              key={`${this.props.target}${this.props.cardId}additionnals`}
              className="cardAvatar assignee"
            >
              <span>{`+${hiddenAssignees.length}`}</span>
            </div>
          </Popover>
        ) : (null)}
      </span>
    )
  }

  renderHiddenAssignees(hiddenAssignees) {
    return (
      hiddenAssignees.map(assignee => (
        <div key={this.props.target + this.props.cardId + assignee.id} >
          {assignee.fullName}
        </div>
      ))
    )
  }

  render() {
    return (
      <div>
        { this.renderReponsible() }
        { this.renderAssignees() }
      </div>
    )
  }
}

Assignees.defaultProps = {
  cardResponsible: null,
}

Assignees.propTypes = {
  target: PropTypes.string.isRequired,
  cardId: PropTypes.string.isRequired,
  assignees: PropTypes.array.isRequired,
  cardResponsible: PropTypes.object,
  maxDisplayedAssignees: PropTypes.number.isRequired,
}

export default Assignees
