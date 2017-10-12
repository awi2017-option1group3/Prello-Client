import React from 'react'
import { Route } from 'react-router-dom'
import { Layout } from 'antd'
import Board from '../board/Board'
import './style.css'

const { Content } = Layout

const App = () => (
  <Layout className="appLayout">
    <Content className="appContent">
      <Route exact path="/" component={Board} />
    </Content>
  </Layout>
)

export default App
