import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import routes from '../../config/routes'
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

  render() {
    return (
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['Home']}
          className="navbarMenu"
        >
          {this.renderLinks()}
        </Menu>
      </Header>
    )
  }
}

export default Navbar
