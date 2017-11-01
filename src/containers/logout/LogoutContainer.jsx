import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { history } from '../../store'
import Logout from '../../components/logout/Logout'
import { cleanState as cleanLoginState } from '../login/actions'

class LogoutContainer extends Component {
  componentDidMount() {
    localStorage.removeItem('auth')
    if (this.props.token) {
      this.props.cleanLoginState()
    } else {
      history.push('/login')
    }
  }

  componentDidUpdate() {
    if (!this.props.token) {
      history.push('/login')
    }
  }

  render() {
    return (
      <Logout />
    )
  }
}

LogoutContainer.propsType = {
  token: PropTypes.string.isRequired,
  cleanLoginState: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  ...state.login,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  cleanLoginState,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogoutContainer)
