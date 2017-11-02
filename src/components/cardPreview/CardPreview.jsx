import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Card as UICard, Dropdown, Popover, Icon, Menu, Tag, Avatar, Row, Col, Modal as UIModal } from 'antd'
import Modal from '../../commons/modal/Modal'
import './style.css'
import EditField from '../../commons/editField/EditField'
import CardDetails from '../card/Card'
import moment from 'moment'


class Card extends Component {
  state = { visible: false }

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

  getDueDate() {
    let diff = 10000
    if (this.props.dueComplete !== null) {
      const dueDate = moment(this.props.dueComplete.slice(0, 10), "YYYY-MM-DD")
      diff = dueDate.diff(moment(), 'days') + 1
    }
    return (
      <div className="dueCompleteDisplay">
        <span
          className={this.updateStyle(diff)}
        >
          <Icon
            type={this.props.dueComplete !== null ? 'clock-circle-o' : ''}
            className="clockIcon"
          />
          {this.props.dueComplete !== null ? this.props.dueComplete.slice(0, 10) : ''}
        </span>
      </div>
    )
  }

  updateStyle(diffDays) {
    const warning = 7
    const urgent = 3
    if (diffDays > warning) {
      return ""
    } else if ( diffDays <= warning && diffDays > urgent) {
      return "dueDateWarning"
    } else {
      return "dueDateUrgent"
    }
  }

  getComments() {
    return (
      <div>
        <span>
          <Icon
            type={this.props.comments.length > 0 ? 'message' : ''}
            className="commentsIcon"
          />
          {this.props.comments.length > 0 ? this.props.comments.length : ''}
        </span>
      </div>
    )
  }

  getAssignees() {
    const maxNumberOfPeopleInALine = 3
    const members = this.props.assignees.sort((a, b) => a.initials > b.initials).slice(0)
    if (this.props.cardResponsible !== null) {
      // if responsible is in members, sets responsible to be the first user
      if (members.find(element => element.id === this.props.cardResponsible.id) === true) {
        const indexOfResponsible = members.findIndex(this.props.cardResponsible)
        members.splice(indexOfResponsible, 0)
      }
      members.splice(0, 0, this.props.cardResponsible)
    }
    if (members.length > maxNumberOfPeopleInALine) {
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
        {members.map(assignee => (
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

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <UICard title={this.getHeader()} extra={this.getDropdown()} className="card">
        <div className="topLabels">
          {this.getLabels()}
        </div>
        <div onClick={this.showModal}>
          <p>Pos     : {this.props.pos}</p>
          <p>List ID : {this.props.listId}</p>
          <p>ID      : {this.props.id}</p>
          <p>Desc    : {this.props.desc}</p>
          <Row className="cardFooter">
            <Col span={8}>
              {this.getDueDate()}
            </Col>
            <Col span={3}>
              <div className="commentsDisplay">
                {this.getComments()}
              </div>
            </Col>
            <Col span={12}>
              <div className="assignees">
                {this.getAssignees()}
              </div>
            </Col>
          </Row>
        </div>
        <div>
          <UIModal
            title={this.props.title}
            visible={this.state.visible}
            footer={null}
            onCancel={this.handleCancel}
          >
            <CardDetails {...this.props} />
          </UIModal>
        </div>
      </UICard>
    )
  }
}

Card.defaultProps = {
  labels: [],
  comments: [],
  assignees: [],
  cardResponsible: {},
  dueComplete: '',
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  pos: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  dueComplete: PropTypes.string,
  labels: PropTypes.array,
  comments: PropTypes.array,
  cardResponsible: PropTypes.object,
  assignees: PropTypes.array,
  deleteCard: PropTypes.func.isRequired,
  saveCardTitle: PropTypes.func.isRequired,
  saveCardDesc: PropTypes.func.isRequired,
  dragHandleProps: PropTypes.object.isRequired,
}

export default Card
