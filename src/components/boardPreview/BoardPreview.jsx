import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Card as UICard, Dropdown, Icon, Menu } from 'antd'

import Modal from '../../commons/modal/Modal'
import './style.css'

class BoardPreview extends Component {
  constructor(props) {
    super(props)
    this.deleteBoard = this.deleteBoard.bind(this)
  }

  deleteBoard() {
    this.props.deleteBoard(this.props.id)
    this.props.contributors.forEach((contributorId) => {
      this.props.addNotification(contributorId, this.props.owner, ` has deleted the board ${this.props.title}`, this.props.id)
    })
  }

  renderMenu() {
    return (
      <Menu>
        <Menu.Item>
          <Modal
            title={'Delete'}
            message={`Are you sure to delete the board named : ${this.props.title} ? All lists, cards and contributors will be removed !`}
            okText={'Delete'}
            cancelText={'Cancel'}
            handleOk={this.deleteBoard}
          />
        </Menu.Item>
      </Menu>
    )
  }
  
  renderDropdown() {
    return this.props.allowDeleting ? (
      <Dropdown overlay={this.renderMenu()}>
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
        <UICard title={this.props.title} extra={this.renderDropdown()} className="boardPreview" />
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
  contributors: PropTypes.array.isRequired, // Array of ids
  owner: PropTypes.string.isRequired, // An id
  allowDeleting: PropTypes.bool,
  deleteBoard: PropTypes.func,
  addNotification: PropTypes.func.isRequired,
}

export default BoardPreview
