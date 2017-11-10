import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Button, Spin } from 'antd'

import './style.css'

const User = props => (
  <div>
    { props.user.infos.id ? (
      <Avatar size="large" icon="user" >{props.user.infos.initials}</Avatar>
    ) : (
      <Spin />
    )}
    <Button icon="logout" onClick={props.onLogOut}>
      Log out
    </Button>
  </div>
)

User.propTypes = {
  user: PropTypes.object.isRequired,
  onLogOut: PropTypes.func.isRequired,
}

export default User
