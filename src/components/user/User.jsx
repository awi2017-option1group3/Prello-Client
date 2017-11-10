import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Button } from 'antd'

import './style.css'

const User = props => (
  <div className="user">
    <Avatar className="userAvatar" size="large" >{props.user.infos.initials}</Avatar>
    <Button className="userLogoutButton" icon="logout" onClick={props.onLogOut}>
      Log out
    </Button>
  </div>
)

User.propTypes = {
  user: PropTypes.object.isRequired,
  onLogOut: PropTypes.func.isRequired,
}

export default User
