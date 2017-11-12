import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import ForgotPassword from '../../components/forgotPassword/ForgotPassword'
import { sendForgotPassword } from './actions'

class ForgotPasswordContainer extends Component {
  render() {
    return (<ForgotPassword {...this.props} sendForgotPassword={this.props.sendForgotPassword} />)
  }
}

ForgotPasswordContainer.propTypes = {
  sendForgotPassword: PropTypes.func.isRequired,
}

const mapStateToProps = () => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
  sendForgotPassword,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPasswordContainer)
