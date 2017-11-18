import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getUserRegistrated, validateUser } from './actions'
import RegistrationCheck from '../../components/registrationCheck/RegistrationCheck'

class CheckRegistrationContainer extends Component {
  render() {
    return (
      <div>
        <RegistrationCheck {...this.props} token={this.props.match.params.token} />
      </div>
    )
  }
}

CheckRegistrationContainer.propTypes = {
  getUserRegistrated: PropTypes.func.isRequired,
  validateUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  ...state.checkRegistration,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserRegistrated,
  validateUser,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckRegistrationContainer)
