import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Register from '../../components/register/Register'
import { register } from './actions'

class RegisterContainer extends Component {
  render() {
    return (
      <Register {...this.props} register={this.props.register} />
    )
  }
}

RegisterContainer.propTypes = {
  register: PropTypes.func.isRequired,
}

const mapStateToProps = () => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
  register,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterContainer)
