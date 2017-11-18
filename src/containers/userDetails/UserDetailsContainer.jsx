import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import UserDetails from '../../components/userDetails/UserDetails'
import { updateUser, deleteUser } from './actions'

class UserDetailsContainer extends Component {
  render() {
    return (
      <UserDetails {...this.props} />
    )
  }
}

UserDetailsContainer.propTypes = {
  updateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
}

const mapStateToProps = () => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
  updateUser,
  deleteUser,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserDetailsContainer)
