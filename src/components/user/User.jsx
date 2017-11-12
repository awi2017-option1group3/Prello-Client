import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Icon, Popover } from 'antd'

import './style.css'

class User extends Component {
  renderContent() {
    return (
      <div>
        <a onClick={this.props.onLogOut}><Icon type="logout" /> Log out</a>
      </div>
    )
  }

  render() {
    return (
      <div className="user">
        <Popover
          content={this.renderContent()}
          title={this.props.user.infos.fullName}
          trigger="click"
          placement="bottomLeft"
        >
          <div>
            <Avatar className="userAvatar" size="large" >{this.props.user.infos.initials.toUpperCase()}</Avatar>
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
