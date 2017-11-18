import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Icon, Popover } from 'antd'

import { joinApp, leaveApp } from '../../websockets'
import './style.css'

class User extends Component {
  constructor(props) {
    super(props)
    this.logOut = this.logOut.bind(this)
  }

  componentWillMount() {
    joinApp(this.props.user.infos.id, () => {})
  }

  logOut() {
    leaveApp(this.props.user.infos.id)
    this.props.onLogOut()
  }

  renderContent() {
    return (
      <div>
        <a onClick={this.logOut}><Icon type="logout" /> Log out</a>
      </div>
    )
  }

  render() {
    return (
      <div className="user">
        <Popover
          content={this.renderContent()}
          title={(<h3>{this.props.user.infos.fullName}</h3>)}
          trigger="click"
          placement="bottomLeft"
        >
          <div>
            <Avatar className="userAvatar" >{this.props.user.infos.initials.toUpperCase()}</Avatar>
            <Icon className="userDropdownIcon" type="down" />
          </div>
        </Popover>
      </div>
    )
  }
}


User.propTypes = {
  user: PropTypes.object.isRequired,
  onLogOut: PropTypes.func.isRequired,
}

export default User
