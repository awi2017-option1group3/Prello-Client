import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { Layout } from 'antd'
import moment from 'moment'

import BoardsContainer from '../../containers/boards/BoardsContainer'
import LoginContainer from '../../containers/login/LoginContainer'
import RegisterContainer from '../../containers/register/RegisterContainer'
import BoardContainer from '../../containers/board/BoardContainer'
import NotFound from '../../containers/notFound/NotFound'
import Navbar from '../navbar/Navbar'
import { history } from '../../store'
import './style.css'

const { Content } = Layout

class App extends Component {
  constructor(props) {
    super(props)
    this.checkLogged = this.checkLogged.bind(this)
    this.boardsRender = this.boardsRender.bind(this)
    this.boardRender = this.boardRender.bind(this)
  }

  checkLogged(componentToRender) {
    const auth = JSON.parse(localStorage.getItem('auth'))
    return auth && moment().isBefore(auth.expiresAt) ? componentToRender : <Redirect to="/login" />
  }
        

  boardsRender() {
    return this.checkLogged(<BoardsContainer />)
  }

  boardRender({ match }) {
    return this.checkLogged(<BoardContainer match={match} />)
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <Layout className="appLayout">
          <Navbar />
          <Content className="appContent">
            <Switch>
              <Route exact path="/login" component={LoginContainer} />
              <Route exact path="/register" component={RegisterContainer} />
              <Route exact path="/" render={this.boardsRender} />
              <Route exact path="/boards/:boardId" render={this.boardRender} />
              <Route exact path="*" component={NotFound} />
            </Switch>
          </Content>
        </Layout>
      </ConnectedRouter>
    )
  }
}

export default App
