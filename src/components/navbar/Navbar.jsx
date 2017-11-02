import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Layout, Menu } from 'antd'

import routes from '../../config/routes'
import { history } from '../../store'
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

  renderLogout() {
    const isLogoutRequired = history.location.pathname !== '/login' && history.location.pathname !== '/register'
    return isLogoutRequired ? (
      <Link to={routes.logout} className="navbarLogout">
        <Button icon="logout">
          Log out
        </Button>
      </Link>
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
        {this.renderLogout()}
      </Header>
    )
  }
}

export default Navbar
