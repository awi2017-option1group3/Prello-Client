import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Login from '../../components/login/Login'
import { authenticate, cleanState } from './actions'
import { setToken } from '../user/actions'
import { history } from '../../store'

class LoginContainer extends Component {
  componentWillMount() {
    const auth = JSON.parse(localStorage.getItem('auth'))
    if (auth) {
      this.props.setToken(auth)
      history.push('/')
    } else {
      this.props.cleanState()
    }
  }

  componentDidUpdate() {
    if (this.props.token) {
      const tokenData = {
        token: this.props.token,
        tokenToRefresh: this.props.tokenToRefresh,
        expiresAt: this.props.expiresAt,
      }
      localStorage.setItem('auth', JSON.stringify(tokenData))
      this.props.setToken(tokenData)
      history.push('/')
    }
  }

  render() {
    return (<Login {...this.props} />)
  }
}

LoginContainer.propsType = {
  token: PropTypes.string.isRequired,
  tokenToRefresh: PropTypes.string.isRequired,
  expiresAt: PropTypes.object.isRequired,
  cleanState: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  ...state.login,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  authenticate,
  cleanState,
  setToken,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginContainer)
