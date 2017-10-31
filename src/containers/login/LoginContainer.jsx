import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'

import Loader from '../../commons/loader/Loader'
import Login from '../../components/login/Login'
import { authenticate, refreshToken } from './actions'
import { history } from '../../store'

class LoginContainer extends Component {
  componentDidMount() {
    const auth = JSON.parse(localStorage.getItem('auth'))
    if (auth && moment().isAfter(auth.expiresAt)) {
      this.props.refreshToken(auth.tokenToRefresh)
    }
  }

  componentDidUpdate() {
    if (this.props.token) {
      localStorage.setItem('auth', JSON.stringify({
        token: this.props.token,
        tokenToRefresh: this.props.tokenToRefresh,
        expiresAt: this.props.expiresAt,
      }))
      history.push('/')
    }
  }

  render() {
    return this.props.isRefreshingToken ? (
      <Loader />
    ) : (
      <Login {...this.props} />
    )
  }
}

LoginContainer.propsType = {
  token: PropTypes.string.isRequired,
  tokenToRefresh: PropTypes.string.isRequired,
  expiresAt: PropTypes.object.isRequired,
  isRefreshingToken: PropTypes.bool.isRequired,
  refreshToken: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  ...state.login,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  authenticate,
  refreshToken,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginContainer)
