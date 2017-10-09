import React from 'react'
import { Route } from 'react-router-dom'
import { Layout } from 'antd'
import BoardContainer from '../../containers/board/BoardContainer'
import './style.css'

const { Content } = Layout

const App = () => (
  <Layout className="appLayout">
    <Content className="appContent">
      <Route exact path="/" component={BoardContainer} />
    </Content>
  </Layout>
)

export default App
