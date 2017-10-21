import React from 'react'
import { Route } from 'react-router-dom'
import { Layout } from 'antd'
import BoardsContainer from '../../containers/boards/BoardsContainer'
import './style.css'

const { Content } = Layout

const App = () => (
  <Layout className="appLayout">
    <Content className="appContent">
      <Route exact path="/" component={BoardsContainer} />
    </Content>
  </Layout>
)

export default App
