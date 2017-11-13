import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Card as UICard, Dropdown, Icon, Menu } from 'antd'

import Modal from '../../commons/modal/Modal'
import './style.css'

class BoardPreview extends Component {
  getMenu() {
    return (
      <Menu>
        <Menu.Item>
          <Modal
            title={'Delete'}
            message={`Are you sure to delete the board named : ${this.props.title} ? All lists, cards and contributors will be removed !`}
            okText={'Delete'}
            cancelText={'Cancel'}
            handleOk={() => { this.props.deleteBoard(this.props.id) }}
          />
        </Menu.Item>
      </Menu>
    )
  }
  
  getDropdown() {
    return this.props.allowDeleting ? (
      <Dropdown overlay={this.getMenu()}>
        <Button shape="circle">
          <Icon type="ellipsis" />
        </Button>
      </Dropdown>
    ) : (null)
  }

  render() {
    return (
      <Link
        to={`/boards/${this.props.id}`}
        className="boardLink"
      >
        <UICard title={this.props.title} extra={this.getDropdown()} className="boardPreview" />
      </Link>
    )
  }
}

BoardPreview.defaultProps = {
  allowDeleting: true,
  deleteBoard: null,
}

BoardPreview.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  allowDeleting: PropTypes.bool,
  deleteBoard: PropTypes.func,
}

export default BoardPreview
