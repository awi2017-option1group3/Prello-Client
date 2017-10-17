import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Card as UICard, Dropdown, Icon, Menu } from 'antd'
import Modal from '../../commons/modal/Modal'
import './style.css'

class Card extends Component {
  getHeader() {
    return (
      <div className="cardHeader" {...this.props.dragHandleProps}>
        {this.props.title}
      </div>
    )
  }

  getMenu() {
    return (
      <Menu>
        <Menu.Item>
          <Modal
            title={'Delete'}
            message={`Are you sure to delete this card named : ${this.props.title} ?`}
            okText={'Delete'}
            cancelText={'Cancel'}
            handleOk={() => { this.props.deleteCard(this.props.listId, this.props.id) }}
          />
        </Menu.Item>
      </Menu>
    )
  }

  getDropdown() {
    return (
      <Dropdown overlay={this.getMenu()}>
        <Button shape="circle">
          <Icon type="ellipsis" />
        </Button>
      </Dropdown>
    )
  }

  render() {
    return (
      <UICard title={this.getHeader()} extra={this.getDropdown()} className="card" />
    )
  }
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  deleteCard: PropTypes.func.isRequired,
  dragHandleProps: PropTypes.object.isRequired,
}

export default Card
