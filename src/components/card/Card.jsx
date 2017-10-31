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
    const maxNumberOfPeopleInALine = 3
    if (this.props.assignees.length > maxNumberOfPeopleInALine) {
      const members = this.props.assignees.sort((a, b) => a.initials > b.initials)
      if (this.props.cardResponsible !== {}) {
        // if responsible is in members, sets responsible to be the first user
        if (members.find(element => element.id === this.props.cardResponsible.id) === true) {
          const indexOfResponsible = members.findIndex(this.props.cardResponsible)
          members.splice(indexOfResponsible, 0)
          members.sort((a, b) => a.initials < b.initials)
          members.splice(0, 0, this.props.cardResponsible)
        }
      }
      const moreMembers = (
        <div>
          {members.slice(maxNumberOfPeopleInALine - 1, members.length)
            .map(assignee => (
              <p key={this.props.id + assignee.id} className="assigneeInitials">
                {assignee.initials.toUpperCase()}
              </p>
            ))}
        </div>
      )
      return (
        <div>
          {members.slice(0, maxNumberOfPeopleInALine - 1).map(assignee => (
            <Avatar
              key={this.props.id + assignee.id}
              style={(this.props.cardResponsible !== null && assignee.id === this.props.cardResponsible.id) ? { backgroundColor: '#3586EA' } : {}}
              className="assigneeInitials"
            >
              {assignee.initials.toUpperCase()}
            </Avatar>
          ))}
          <Popover content={moreMembers} trigger="hover">
            <Avatar key={`${this.props.id}additionnals`} className="assigneeInitials">
              +{(members.length - maxNumberOfPeopleInALine + 1)}
            </Avatar>
          </Popover>
        </div>
      )
    }
    return (
      <div>
        {this.props.assignees.sort((a, b) => a.initials > b.initials).map(assignee => (
          <Avatar
            key={this.props.id + assignee.id}
            style={(this.props.cardResponsible !== null && assignee.id === this.props.cardResponsible.id) ? { backgroundColor: '#3586EA' } : {}}
            className="assigneeInitials"
          >
            {assignee.initials.toUpperCase()}
          </Avatar>
        ))}
      </div>
    )
  }

  render() {
    return (
      <UICard title={this.getHeader()} extra={this.getDropdown()} className="card">
        <div className="topLabels">
          {this.getLabels()}
        </div>
        <p>Rank    : {this.props.rank}</p>
        <p>List ID : {this.props.listId}</p>
        <p>ID      : {this.props.id}</p>
        <Row className="cardFooter">
          <Col span={12}>
            <div className="dueCompleteDisplay">
              <span>
                <Icon
                  type={this.props.dueComplete !== null ? 'clock-circle-o' : ''}
                  className="clockIcon"
                />
                {this.props.dueComplete !== null ? this.props.dueComplete.slice(0, 10) : ''}
              </span>
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

Card.defaultProps = {
  cardResponsible: {},
  dueComplete: '',
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  dueComplete: PropTypes.string,
  labels: PropTypes.array.isRequired,
  cardResponsible: PropTypes.object,
  assignees: PropTypes.array.isRequired,
  deleteCard: PropTypes.func.isRequired,
  saveCardTitle: PropTypes.func.isRequired,
  dragHandleProps: PropTypes.object.isRequired,
}

export default Card
