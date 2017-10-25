import React from 'react'
import { Route } from 'react-router-dom'
import { Layout } from 'antd'
import BoardsContainer from '../../containers/boards/BoardsContainer'
import RegisterContainer from '../../containers/register/RegisterContainer'
import BoardContainer from '../../containers/board/BoardContainer'
import Navbar from '../navbar/Navbar'
import './style.css'


const { Content } = Layout

const App = () => (
  <Layout className="appLayout">
    <Navbar />
    <Content className="appContent">
      <Route exact path="/" component={BoardsContainer} />
      <Route exact path="/register" component={RegisterContainer} />
      <Route exact path="/boards/:boardId" component={BoardContainer} />

    </Content>
  </Layout>
)

export default App
