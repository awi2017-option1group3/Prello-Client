import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Card as UIList, Dropdown, Icon, Menu } from 'antd' // A graphical card component is used to display a list
import CardsContainer from '../../containers/cards/CardsContainer'
import Modal from '../../commons/modal/Modal'
import './style.css'
import EditField from '../../commons/editField/EditField'

class List extends Component {
  getHeader() {
    return (
      <div className="listHeader">
        <EditField
          text={this.props.title}
          save={(newTitle) => { this.props.saveTitleList(this.props.id, newTitle) }}
          dragHandleProps={this.props.dragHandleProps}
          hint="A list has no name"
        />
      </div>
    )
  }

  getMenu() {
    return (
      <Menu>
        <Menu.Item>
          <Modal
            title={'Delete'}
            message={`Are you sure to delete this list named : ${this.props.title} ?`}
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
      <UIList 
        className="list" 
        title={this.getHeader()} 
        extra={this.getDropdown()} 
        bordered={false}
      >
        <CardsContainer listId={this.props.id} />
      </UIList>
    )
  }
}

List.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dragHandleProps: PropTypes.object.isRequired,
  deleteList: PropTypes.func.isRequired,
  saveTitleList: PropTypes.func.isRequired,
}

export default List
