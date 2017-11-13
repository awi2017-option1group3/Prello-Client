import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

import { history } from '../../store'
import { cleanState, getOneUserByToken, refreshToken } from './actions'
import { cleanState as cleanBoardsState } from '../boards/actions'
import User from '../../components/user/User'

class UserContainer extends Component {
  constructor(props) {
    super(props)
    this.onLogOut = this.onLogOut.bind(this)
    this.checkAuth = this.checkAuth.bind(this)
  }

  componentDidMount() {
    this.checkAuth()
  }

  componentDidUpdate() {
    if (!this.props.user.auth.isRefreshingToken) {
      // Save the latest version of tokens in local storage and clean state
      if (this.props.user.auth.token) {
        localStorage.setItem('auth', JSON.stringify({
          token: this.props.user.auth.token,
          tokenToRefresh: this.props.user.auth.tokenToRefresh,
          expiresAt: this.props.user.auth.expiresAt,
        }))
      }
      this.checkAuth()
    }
  }

  onLogOut() {
    // Clean local storage
    localStorage.removeItem('auth')
    // Hard routing to clean the entire state
    window.location.replace('/login')
  }

  checkAuth() {
    // Bypass auth checking for page not requiring that
    if (this.props.location.pathname !== '/login' && this.props.location.pathname !== '/register'
      && !this.props.location.pathname.includes('/forgotPassword')) {
      const auth = JSON.parse(localStorage.getItem('auth'))
      // Check if there is an auth in local storage
      if (auth) {
        // Refresh the token if it is expired
        if (moment().isAfter(auth.expiresAt)) {
          localStorage.removeItem('auth')
          this.props.refreshToken(auth.tokenToRefresh)
        } else if (!this.props.user.infos) { // Fetch user if infos not already known
          this.props.getOneUserByToken(auth.token)
        }
      } else {
        history.push('/login')
      }
    }
  }

  render() {
    return this.props.user.infos ? (<User {...this.props} onLogOut={this.onLogOut} />) : (null)
  }
}

UserContainer.propTypes = {
  user: PropTypes.object.isRequired,
  cleanState: PropTypes.func.isRequired,
  cleanBoardsState: PropTypes.func.isRequired,
  getOneUserByToken: PropTypes.func.isRequired,
  refreshToken: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  cleanState,
  cleanBoardsState,
  getOneUserByToken,
  refreshToken,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(UserContainer))
