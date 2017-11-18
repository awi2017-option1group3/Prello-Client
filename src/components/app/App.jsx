import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { Layout } from 'antd'
import moment from 'moment'

import BoardsContainer from '../../containers/boards/BoardsContainer'
import LoginContainer from '../../containers/login/LoginContainer'
import RegisterContainer from '../../containers/register/RegisterContainer'
import ForgotPasswordContainer from '../../containers/forgotPassword/ForgotPasswordContainer'
import CheckRegistrationContainer from '../../containers/checkRegistration/CheckRegistrationContainer'
import BoardContainer from '../../containers/board/BoardContainer'
import UserDetailsContainer from '../../containers/userDetails/UserDetailsContainer'
import ErrorDisplayer from '../../commons/errorDisplayer/ErrorDisplayer'
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
    this.pageNotFound = this.pageNotFound.bind(this)
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

  pageNotFound() {
    return (<ErrorDisplayer message="Page not found." icon="compass" />)
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
              <Route exact path="/forgotPassword" component={ForgotPasswordContainer} />
              <Route exact path="/forgotPassword/:token" component={ForgotPasswordContainer} />
              <Route exact path="/registration/:token" component={CheckRegistrationContainer} />
              <Route exact path="/myprofil" component={UserDetailsContainer} />
              <Route exact path="/" render={this.boardsRender} />
              <Route exact path="/boards/:boardId" render={this.boardRender} />
              <Route exact path="*" render={this.pageNotFound} />
            </Switch>
          </Content>
        </Layout>
      </ConnectedRouter>
    )
  }
}

export default App
