import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import ForgotPassword from '../../components/forgotPassword/ForgotPassword'
import SetForgotPassword from '../../components/setForgotPassword/SetForgotPassword'
import { sendForgotPassword, getUserForgotPassword } from './actions'

class ForgotPasswordContainer extends Component {
  renderForgotPassword() {
    const showSetPassword = this.props.location.pathname === '/forgotPassword'
    return showSetPassword ? (
      <ForgotPassword{...this.props} />
    ) : (
      <SetForgotPassword {...this.props} token={this.props.match.params.token} />
    )
  }
  render() {
    return (
      <div>
        {this.renderForgotPassword()}
      </div>
    )
  }
}

ForgotPasswordContainer.propTypes = {
  sendForgotPassword: PropTypes.func.isRequired,
  getUserForgotPassword: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  userInfo: state.user,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  sendForgotPassword,
  getUserForgotPassword,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPasswordContainer)
