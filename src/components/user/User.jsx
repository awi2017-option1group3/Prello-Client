import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Dropdown, Icon, Menu } from 'antd'

import './style.css'

class User extends Component {
  getMenu() {
    return (
      <Menu>
        <Menu.Item key="logout">
          <span onClick={this.props.onLogOut}>
            <Icon type="logout" /> Log out
          </span>
        </Menu.Item>
      </Menu>
    )
  }

  render() {
    return (
      <div className="user">
        <Dropdown overlay={this.getMenu()}>
          <Avatar className="userAvatar" size="large" >{this.props.user.infos.initials.toUpperCase()}</Avatar>
        </Dropdown>
      </div>
    )
  }
}


User.propTypes = {
  user: PropTypes.object.isRequired,
  onLogOut: PropTypes.func.isRequired,
}

export default User
