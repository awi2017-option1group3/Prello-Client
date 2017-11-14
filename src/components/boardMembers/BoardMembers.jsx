import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Tag, Select, Popover, Popconfirm, Tooltip, Button, Icon } from 'antd'

import { history } from '../../store'
import './style.css'

const Option = Select.Option

class BoardMembers extends Component {
  constructor(props) {
    super(props)
    this.handleSelectorSearch = this.handleSelectorSearch.bind(this)
    this.add = this.add.bind(this)
    this.remove = this.remove.bind(this)
    this.quit = this.quit.bind(this)
    this.state = {
      searchUserToInviteValue: '',
    }
  }

  handleSelectorSearch(value) {
    this.setState({
      searchUserToInviteValue: value,
    })
  }

  add(userOption) {
    const { userId } = JSON.parse(userOption)
    // Reset the search field
    this.setState({
      searchUserToInviteValue: '',
    })
    this.props.addContributorToBoard(userId, this.props.boardId)
  }

  remove(userId) {
    this.props.removeContributorFromBoard(userId, this.props.boardId)
  }

  quit() {
    this.remove(this.props.user.id)
    history.push('/')
  }

  renderMessage() {
    if (this.props.contributors.length === 0) {
      return (<Tag className="boardMemberMessage" color="blue">You are alone here.</Tag>)
    } else if (this.props.owner.id === this.props.user.id) {
      return (<Tag className="boardMemberMessage" color="blue">You are the board's owner.</Tag>)
    }
    return (<Tag className="boardMemberMessage" color="blue">Ask {this.props.owner.fullName} to invite someone.</Tag>)
  }

  renderOwner() {
    if (this.props.owner.id !== this.props.user.id) {
      return (
        <Tooltip
          key={`boardContributor-${this.props.owner.id}`}
          title={`${this.props.owner.fullName} (Owner)`}
          placement="bottom"
        >
          <Avatar key={this.props.owner.initials} className="boardOwnerAvatar" size="small">
            { this.props.owner.initials.toUpperCase() }
          </Avatar>
        </Tooltip>
      )
    }
    return (null)
  }

  renderContributors() {
    return this.props.contributors.sort((a, b) => a.initials > b.initials).map(contributor => (
      this.props.owner.id === this.props.user.id ? (
        <Popover
          key={`boardContributor-${contributor.id}`}
          content={this.renderContributorPopoverContent(contributor)}
          title={contributor.fullName}
          trigger="hover"
          placement="bottom"
        >
          <Avatar className="boardContributorAvatar" size="small">
            { contributor.initials.toUpperCase() }
          </Avatar>
        </Popover>
      ) : (
        <Tooltip
          key={`boardContributor-${contributor.id}`}
          title={contributor.fullName}
          placement="bottom"
        >
          <Avatar className="boardContributorAvatar" size="small">
            { contributor.initials.toUpperCase() }
          </Avatar>
        </Tooltip>
      )
    ))
  }

  renderContributorPopoverContent(contributor) {
    return (
      <Popconfirm
        title={`Do you really want to remove ${contributor.fullName}?`}
        placement="right"
        onConfirm={() => this.remove(contributor.id)}
        okText="Yes"
        cancelText="No"
      >
        <a><Icon type="user-delete" /> Remove from board</a>
      </Popconfirm>
    )
  }

  renderContributorsSelector() {
    if (this.props.owner.id === this.props.user.id) {
      return (<Select
        className="boardContributorsSelector"
        mode="combobox"
        tags={false}
        placeholder="Invite someone..."
        onSelect={this.add}
        onSearch={this.handleSelectorSearch}
        value={this.state.searchUserToInviteValue}
      >
        {this.props.users
          .filter(user => user.id !== this.props.owner.id)
          .filter(user => !this.props.contributors.find(member => user.id === member.id))
          .map(user => (
            <Option
              key={`boardContributorsSelector-${user.id}`}
              value={JSON.stringify({ userId: user.id, userFullName: user.fullName })}
            >
              {user.fullName}
            </Option>
          ))
        }
      </Select>)
    }
    return (null)
  }

  renderQuitBoard() {
    if (this.props.owner.id !== this.props.user.id) {
      return (
        <Popconfirm
          title="Do you really want to quit this board ? You will no longer be able to access it."
          placement="right"
          onConfirm={this.quit}
          okText="Yes"
          cancelText="No"
        >
          <Button className="boardContributorQuit" icon="disconnect" size="small" >Quit this board</Button>
        </Popconfirm>
      )
    }
  }

  render() {
    return (
      <div className="boardMembersBlock">
        { this.renderMessage() }
        <div className="boardMembers">
          { this.renderOwner() }
          { this.renderContributors() }
        </div>
        { this.renderContributorsSelector() }
        { this.renderQuitBoard() }
      </div>
    )
  }
}

BoardMembers.propTypes = {
  boardId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  owner: PropTypes.object.isRequired,
  contributors: PropTypes.array.isRequired,
  addContributorToBoard: PropTypes.func.isRequired,
  removeContributorFromBoard: PropTypes.func.isRequired,
}

export default BoardMembers
