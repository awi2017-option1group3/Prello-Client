import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Menu } from 'antd'

import routes from '../../config/routes'
import NotificationsContainer from '../../containers/notifications/NotificationsContainer'
import UserContainer from '../../containers/user/UserContainer'
import './style.css'

const { Header } = Layout

class Navbar extends Component {
  renderLinks() {
    const showUserRelatedHeader =
      this.props.location.pathname !== '/login'
      && this.props.location.pathname !== '/register'
      && !this.props.location.pathname.includes('/registration')
      && !this.props.location.pathname.includes('/forgotPassword')

    let links = null
    if (showUserRelatedHeader) {
      links = [
        { to: routes.root, text: 'Home' },
        { to: routes.profil, text: 'My Profil' },
      ]
    } else {
      links = [
        { to: routes.root, text: 'Home' },
        { to: routes.register, text: 'Register' },
      ]
    }

    return links.map(link =>
      (<Menu.Item key={link.text}>
        <Link to={link.to}>{link.text}</Link>
      </Menu.Item>),
    )
  }

  renderUser() {
    const showUserRelatedHeader =
      this.props.location.pathname !== '/login'
      && this.props.location.pathname !== '/register'
      && !this.props.location.pathname.includes('/registration')
      && !this.props.location.pathname.includes('/forgotPassword')
    return showUserRelatedHeader ? (
      <div className="navbarUserHeader">
        <NotificationsContainer />
        <UserContainer />
      </div>
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
