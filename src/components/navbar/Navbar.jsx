import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'

import routes from '../../config/routes'
import './style.css'

const renderLinks = () => {
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

const { Header } = Layout

const Navbar = () => (
  <Header>
    <div className="logo" />
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['Home']}
      style={{ lineHeight: '64px' }}
    >
      {renderLinks()}
    </Menu>
  </Header>
)

export default Navbar
