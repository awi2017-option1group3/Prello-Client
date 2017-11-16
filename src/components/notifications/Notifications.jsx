import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Alert, Avatar, Badge, Button, Popover } from 'antd'

import './style.css'

class Notifications extends Component {
  constructor(props) {
    super(props)
    this.markAllAsRead = this.markAllAsRead.bind(this)
    this.setVisibility = this.setVisibility.bind(this)
    this.state = {
      visible: false,
    }
  }

  markAllAsRead() {
    this.props.notifications.filter(notification => !notification.isRead).forEach((notification) => {
      this.props.markNotificationAsRead(notification.id)
    })
    this.setVisibility(false)
  }

  setVisibility(visible) {
    this.setState({ visible })
  }

  goToBoard(notification) {
    this.props.markNotificationAsRead(notification.id)
    window.location.replace(`/boards/${notification.board.id}`)
  }

  renderHeader() {
    return (
      <div className="notificationsHeader">
        <h3>Notifications</h3>
        <Button
          className="notificationsMarkAllAsRead"
          type={this.props.notifications.filter(notification => !notification.isRead).length > 0 ? 'primary' : 'default'}
          icon="check"
          size="small"
          onClick={this.markAllAsRead}
        >
          Mark all as read
        </Button>
      </div>
    )
  }

  renderContent() {
    return this.props.notifications.length > 0 ? (
      <div className="notificationsList">
        {this.props.notifications
          .filter(notification => !notification.isRead)
          .sort((a, b) => moment(b.occuredAt) - moment(a.occuredAt))
          .map(notification => (
            <Alert
              key={`notification-${notification.id}`}
              className="notificationBox"
              message={this.renderNotificationContent(notification)}
              type="info"
              closable
              onClose={() => this.props.markNotificationAsRead(notification.id)}
            />
          ))
        }
        {this.props.notifications
          .filter(notification => notification.isRead)
          .sort((a, b) => moment(b.occuredAt) - moment(a.occuredAt))
          .map(notification => (
            <Alert
              key={`notification-${notification.id}`}
              className="notificationBox read"
              message={this.renderNotificationContent(notification)}
            />
          ))
        }
      </div>
    ) : (
      <p>
        No notifications.
      </p>
    )
  }

  renderNotificationContent(notification) {
    return (
      <div className="notification">
        <Avatar className="notificationAvatar" size="small">{notification.sourceUser.initials.toUpperCase()}</Avatar>
        <div className="notificationMessage">
          <div>
            <strong>{`${notification.sourceUser.fullName} `}</strong>
            {notification.message}
            {notification.board ? (
              <strong>
                <a onClick={() => this.goToBoard(notification)}>
                  {notification.board.title}
                </a>
              </strong>
            ) : (null)}
          </div>
          <div>
            <em>{moment(notification.occuredAt).format('MMMM Do YYYY, h:mm:ss a')}</em>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="notifications">
        <Popover
          overlayClassName="notificationsPopover"
          title={this.renderHeader()}
          content={this.renderContent()}
          trigger="click"
          placement="bottomLeft"
          visible={this.state.visible}
          onVisibleChange={this.setVisibility}
        >
          <div>
            <Badge count={this.props.notifications.filter(notification => !notification.isRead).length} overflowCount={5}>
              <Avatar className="notificationsButton" shape="square" icon="notification" />
            </Badge>
          </div>
        </Popover>
      </div>
    )
  }
}

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
  markNotificationAsRead: PropTypes.func.isRequired,
}

export default Notifications
