import React from 'react'
import { Route } from 'react-router-dom'
import { Layout } from 'antd'
import DndBoard from '../board/DndBoard'
import './style.css'

const { Content } = Layout

const App = () => (
  <Layout className="appLayout">
    <Content className="appContent">
      <Route exact path="/" component={DndBoard} />
    </Content>
  </Layout>
)

export default App
