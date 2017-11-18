import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Notifications from '../../components/notifications/Notifications'
import { getUserNotifications, markNotificationAsRead, pushNotification } from './actions'
import { listenNotify } from '../../websockets'

class NotificationsContainer extends Component {
  componentDidUpdate() {
    if (this.props.user && !this.props.notificationsFetched) {
      this.props.getUserNotifications(this.props.user.id)
      listenNotify(this.props.pushNotification)
    }
  }

  render() {
    return <Notifications {...this.props} />
  }
}

NotificationsContainer.defaultProps = {
  user: null,
}

NotificationsContainer.propTypes = {
  user: PropTypes.object,
  notificationsFetched: PropTypes.bool.isRequired,
  getUserNotifications: PropTypes.func.isRequired,
  pushNotification: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user.infos,
  notifications: state.notifications.data,
  notificationsFetched: state.notifications.areFetched,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserNotifications,
  markNotificationAsRead,
  pushNotification,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationsContainer)
