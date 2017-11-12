import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Card as UICard, Dropdown, Icon, Menu, Row, Col, Modal as UIModal } from 'antd'
import Modal from '../../commons/modal/Modal'
import './style.css'
import EditField from '../../commons/editField/EditField'
import CardContainer from '../../containers/card/CardContainer'
import Assignees from '../assignees/Assignees'
import Labels from "../labels/Labels"
import moment from 'moment'


class Card extends Component {
  state = { visible: false }

  getHeader() {
    return (
      <div className="cardHeader">
        <EditField
          text={this.props.title}
          save={(newTitle) => { this.props.saveCardTitle(this.props.id, newTitle) }}
          hint="A card has no name"
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
      <Labels cardLabels={this.props.labels} cardId={this.props.id} />
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
    return (
      <Assignees cardId={this.props.id}
                 cardResponsible={this.props.responsible}
                 assignees={this.props.assignees}
                 maxDisplayedAssignees={2}
                 target="cardPreview"
      />
    )
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
    this.props.updateOneCardPopulated(this.props.id)
  }

  render() {
    return (
      <UICard
        title={this.getHeader()}
        extra={this.getDropdown()} 
        {...this.props.dragHandleProps} 
        className="card"
      >
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
            <CardContainer id={this.props.id} boardId={this.props.boardId} />
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
  boardId: PropTypes.string.isRequired,
  pos: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  dueComplete: PropTypes.string,
  labels: PropTypes.array,
  comments: PropTypes.array,
  responsible: PropTypes.object,
  assignees: PropTypes.array,
  deleteCard: PropTypes.func.isRequired,
  saveCardTitle: PropTypes.func.isRequired,
  saveCardDesc: PropTypes.func.isRequired,
  dragHandleProps: PropTypes.object.isRequired,
  updateOneCardPopulated: PropTypes.func.isRequired,
}

export default Card
