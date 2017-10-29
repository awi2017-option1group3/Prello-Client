import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Card as UICard, Dropdown, Popover, Icon, Menu, Tag, Avatar, Row, Col } from 'antd'
import Modal from '../../commons/modal/Modal'
import './style.css'
import EditField from '../../commons/editField/EditField'


class Card extends Component {
  getHeader() {
    return (
      <div className="cardHeader">
        <EditField
          text={this.props.title}
          save={(newTitle) => { this.props.saveCardTitle(this.props.id, newTitle) }}
          dragHandleProps={this.props.dragHandleProps}
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

  getLabels() {
    return (
      <div>
        {this.props.labels.map(label => (
          <Tag color={label.color} key={this.props.id + label.id} className="cardLabel">
            {label.name}
          </Tag>
        ))}
      </div>
    )
  }

  getAssignees() {
    if (this.props.assignees.length > 2) {
      const members = this.props.assignees
      const moreMembers = (
        <div>
          {members.slice(2, members.length).map(assignee => (
            <p key={this.props.id + assignee.id} className="assigneeInitials">
              {assignee.initials.toUpperCase()}
            </p>
          ))}
        </div>
      )
      return (
        <div>
          {members.slice(0, 2).map(assignee => (
            <Avatar key={this.props.id + assignee.id} className="assigneeInitials">
              {assignee.initials.toUpperCase()}
            </Avatar>
          ))}
          <Popover content={moreMembers} trigger="hover">
            <Avatar key={`${this.props.id}additionnals`} className="assigneeInitials">
              + {(members.length - 2)}
            </Avatar>
          </Popover>
        </div>
      )
    }
    return (
      <div>
        {this.props.assignees.map(assignee => (
          <Avatar key={this.props.id + assignee.id} className="assigneeInitials">
            {assignee.initials.toUpperCase()}
          </Avatar>
        ))}
      </div>
    )
  }

  render() {
    return (
      <UICard title={this.getHeader()} extra={this.getDropdown()} className="card">
        <p>Rank    : {this.props.rank}</p>
        <p>List ID : {this.props.listId}</p>
        <p>ID      : {this.props.id}</p>
        <Row className="cardFooter">
          <Col span={12}>
            <div className="labels">
              {this.getLabels()}
            </div>
          </Col>
          <Col span={12}>
            <div className="assignees">
              {this.getAssignees()}
            </div>
          </Col>
        </Row>
      </UICard>
    )
  }
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  labels: PropTypes.array.isRequired,
  assignees: PropTypes.array.isRequired,
  deleteCard: PropTypes.func.isRequired,
  saveCardTitle: PropTypes.func.isRequired,
  dragHandleProps: PropTypes.object.isRequired,
}

export default Card
