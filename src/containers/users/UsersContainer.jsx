import { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { cleanState as cleanUserState, getOneUser, getAllUsers } from './actions'

class UsersContainer extends Component {
  componentWillMount() {
    this.props.cleanUserState()
    // this.props.getAllUsers()
  }
}

UsersContainer.propTypes = {
  cleanUserState: PropTypes.func.isRequired,
  // getAllUsers: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  users: state.data,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  cleanUserState,
  getOneUser,
  getAllUsers,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersContainer)
