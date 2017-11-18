import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import UserDetails from '../../components/userDetails/UserDetails'
import { updateUser, deleteUser } from './actions'

class UserDetailsContainer extends Component {
  render() {
    if (this.props.user) {
      return (<UserDetails {...this.props} />)
    }
    return (null)
  }
}

UserDetailsContainer.propTypes = {
  updateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  user: PropTypes.object,
}

const mapStateToProps = state => ({
  user: state.user.infos,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  updateUser,
  deleteUser,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserDetailsContainer)
