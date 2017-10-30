import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { Layout } from 'antd'
import moment from 'moment'

import BoardsContainer from '../../containers/boards/BoardsContainer'
import LoginContainer from '../../containers/login/LoginContainer'
import BoardContainer from '../../containers/board/BoardContainer'
import './style.css'
import { history } from '../../store'

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
          <Content className="appContent">
            <Switch>
              <Route exact path="/login" component={LoginContainer} />
              <Route exact path="/" render={this.boardsRender} />
              <Route exact path="/boards/:boardId" render={this.boardRender} />
            </Switch>
          </Content>
        </Layout>
      </ConnectedRouter>
    )
  }
}

export default App
