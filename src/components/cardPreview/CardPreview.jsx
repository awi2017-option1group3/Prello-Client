import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Card as UICard, Dropdown, Icon, Menu, Row, Col, Modal as UIModal } from 'antd'
import moment from 'moment'

import Modal from '../../commons/modal/Modal'
import EditField from '../../commons/editField/EditField'
import CardContainer from '../../containers/card/CardContainer'
import Assignees from '../assignees/Assignees'
import Labels from '../labels/Labels'
import './style.css'

class CardPreview extends Component {
  constructor(props) {
    super(props)
    this.renameCard = this.renameCard.bind(this)
    this.deleteCard = this.deleteCard.bind(this)
    this.showModal = this.showModal.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.state = {
      visible: false,
    }
  }

  renameCard(newTitle) {
    this.props.saveCardTitle(this.props.boardId, this.props.id, newTitle)
    this.props.assignees.forEach((assignee) => {
      this.props.addNotification(assignee.id, this.props.user.id, ` has changed the card from ${this.props.title} to ${newTitle} in the board `, this.props.boardId)
    })
  }

  deleteCard() {
    this.props.deleteCard(this.props.boardId, this.props.listId, this.props.id)
    this.props.assignees.forEach((assignee) => {
      this.props.addNotification(assignee.id, this.props.user.id, ` has deleted the card ${this.props.title} in the board `, this.props.boardId)
    })
  }

  showModal() {
    this.setState({
      visible: true,
    })
  }

  handleCancel() {
    this.setState({
      visible: false,
    })
    this.props.refreshCard(this.props.boardId, this.props.id)
  }

  chooseDueDateStyle(diffDays) {
    const warning = 7
    const urgent = 3
    if (diffDays > warning) {
      return ''
    } else if (diffDays <= warning && diffDays > urgent) {
      return 'dueDateWarning'
    }
    return 'dueDateUrgent'
  }

  renderHeader() {
    return (
      <div className="cardHeader">
        <EditField
          text={this.props.title}
          save={this.renameCard}
          hint="A card has no name"
        />
      </div>
    )
  }

  renderMenu() {
    return (
      <Menu>
        <Menu.Item>
          <Modal
            title={'Delete'}
            message={`Are you sure to delete this card named : ${this.props.title} ?`}
            okText={'Delete'}
            cancelText={'Cancel'}
            handleOk={this.deleteCard}
          />
        </Menu.Item>
      </Menu>
    )
  }

  renderDropdown() {
    return (
      <Dropdown overlay={this.renderMenu()}>
        <Button shape="circle">
          <Icon type="ellipsis" />
        </Button>
      </Dropdown>
    )
  }

  renderLabels() {
    return (
      <Labels cardLabels={this.props.labels} cardId={this.props.id} />
    )
  }

  renderDueDate() {
    let diff = 10000
    if (this.props.dueComplete !== null) {
      const dueDate = moment(this.props.dueComplete.slice(0, 10), 'YYYY-MM-DD')
      diff = dueDate.diff(moment(), 'days') + 1
    }
    return (
      <div className="dueCompleteDisplay">
        <span
          className={this.chooseDueDateStyle(diff)}
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

  renderComments() {
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

  renderAssignees() {
    return (
      <Assignees
        cardId={this.props.id}
        cardResponsible={this.props.responsible}
        assignees={this.props.assignees}
        maxDisplayedAssignees={2}
        target="cardPreview"
      />
    )
  }

  renderTaskListsCompleted() {
    if (this.props.taskLists.length > 0) {
      const total = this.props.taskLists
        .map(taskList => taskList.tasks.length)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      const done = this.props.taskLists
        .map(taskList => taskList.tasks
          .map(task => (task.done ? 1 : 0))
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
        )
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      const display = `${done} / ${total}`
      return (
        <div className={done / total === 1 ? 'taskCompleted' : 'taskUncompleted'}>
          <span>
            <Icon type="check-square-o" /> {display}
          </span>
        </div>
      )
    } 
    return (null)
  }

  render() {
    return (
      <UICard
        title={this.renderHeader()}
        extra={this.renderDropdown()}
        {...this.props.dragHandleProps} 
        className="card"
      >
        <div className="topLabels">
          {this.renderLabels()}
        </div>
        <div onClick={this.showModal}>
          <p>Pos     : {this.props.pos}</p>
          <p>List ID : {this.props.listId}</p>
          <p>ID      : {this.props.id}</p>
          <p>Desc    : {this.props.desc}</p>
          <Row className="cardFooter">
            { this.props.dueComplete !== '' ? (
              <Col span={8}>
                {this.renderDueDate()}
              </Col>
            ) : (null)
            }
            {
              typeof this.props.comments !== 'undefined' && this.props.comments.length > 0 ? (
                <Col span={3}>
                  <div className="commentsDisplay">
                    {this.getComments()}
                  </div>
                </Col>
              ) : (null)
            }
            {
              this.props.taskLists.length > 0 ? (
                <Col span={5}>
                  <div className="taskListsDisplay">
                    {this.renderTaskListsCompleted()}
                  </div>
                </Col>
              ) : (null)
            }
            <Col span={12}>
              <div className="assignees">
                {this.renderAssignees()}
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
            <CardContainer id={this.props.id} boardId={this.props.boardId} />
          </UIModal>
        </div>
      </UICard>
    )
  }
}

CardPreview.defaultProps = {
  labels: [],
  comments: [],
  assignees: [],
  taskLists: [],
  responsible: {},
  dueComplete: '',
}

CardPreview.propTypes = {
  id: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  pos: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  dueComplete: PropTypes.string,
  labels: PropTypes.array,
  comments: PropTypes.array,
  taskLists: PropTypes.array,
  responsible: PropTypes.object,
  assignees: PropTypes.array,
  user: PropTypes.object.isRequired,
  deleteCard: PropTypes.func.isRequired,
  saveCardTitle: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
  dragHandleProps: PropTypes.object.isRequired,
  refreshCard: PropTypes.func.isRequired,
}

export default CardPreview
