import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Card as UIList, Dropdown, Icon, Menu } from 'antd' // A graphical card component is used to display a list
import CardsContainer from '../../containers/cards/CardsContainer'
import Modal from '../../commons/modal/Modal'
import './style.css'

class List extends Component {
  getMenu() {
    return (
      <Menu>
        <Menu.Item>
          <Modal
            title={'Delete'}
            message={`Are you sure to delete the list ${this.props.title} ?`}
            okText={'Delete'}
            cancelText={'Cancel'}
            handleOk={() => { this.props.deleteList(this.props.id) }}
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
      <UIList className="list" title={this.props.title} extra={this.getDropdown()} bordered={false}>
        <CardsContainer listId={this.props.id} />
      </UIList>
    )
  }
}

List.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  deleteList: PropTypes.func.isRequired,
}

export default List
