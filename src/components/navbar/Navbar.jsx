import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Menu } from 'antd'

import routes from '../../config/routes'
import UserContainer from '../../containers/user/UserContainer'
import './style.css'

const { Header } = Layout

class Navbar extends Component {
  renderLinks() {
    const links = [
      { to: routes.root, text: 'Home' },
      { to: routes.register, text: 'Register' },
    ]

    return links.map(link =>
      (<Menu.Item key={link.text}>
        <Link to={link.to}>{link.text}</Link>
      </Menu.Item>),
    )
  }

  renderUser() {
    const showUser = this.props.location.pathname !== '/login' && this.props.location.pathname !== '/register'
      && !this.props.location.pathname.includes('/forgotPassword')
    return showUser ? (
      <UserContainer />
    ) : (
      null
    )
  }

  render() {
    return (
      <Header className="navbarHeader">
        <a href="/">
          <div className="navbarLogo">
            <img src="/prello_white.png" alt="Prello" />
          </div>
        </a>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['Home']}
          className="navbarMenu"
        >
          {this.renderLinks()}
        </Menu>
        {this.renderUser()}
      </Header>
    )
  }
}

export default withRouter(Navbar)
