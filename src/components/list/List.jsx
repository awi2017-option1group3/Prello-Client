import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card as UIList, Button, Icon, Menu, Dropdown } from 'antd' // A graphical card component is used to display a list
import Modal from '../../utils/Modal'
import './style.css'

class List extends Component {
  getMenu() {
    return (<Menu>
      <Menu.Item key="1">
        <Modal title={'Delete'} handleOk={() => { this.props.deleteList(this.props.id) }} message={`Are you sure to delete the list ${this.props.title} ?`} okText={'Delete'} cancelText={'Cancel'} />
      </Menu.Item>
      <Menu.Item key="2">Rename</Menu.Item>
    </Menu>)
  }

  render() {
    return (
      <UIList className="list" title={this.props.title} extra={<Dropdown overlay={this.getMenu()}><Button shape="circle"><Icon type="ellipsis" /></Button></Dropdown>} bordered={false}>Cards</UIList>
    )
  }
}

List.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  deleteList: PropTypes.func.isRequired,
}


export default List
