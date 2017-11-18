
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import './style.css'
import EditArea from '../../commons/editArea/EditArea'
import LabelsContainer from '../../containers/labels/LabelsContainer'
import AssigneesContainer from '../../containers/assignees/AssigneesContainer'
import TaskListsContainer from '../../containers/taskLists/TaskListsContainer'

const { Content } = Layout

class Card extends Component {
  constructor(props) {
    super(props)
    this.renderLabels = this.renderLabels.bind(this)
    this.renderAssignees = this.renderAssignees.bind(this)
  }

  renderAssignees() {
    return (
      <AssigneesContainer
        card={this.props.card}
        user={this.props.user}
        boardId={this.props.boardId}
        target="cardDetails"
        displayAssignees
        displaySelectAssignees
        displaySelectResponsible
        addNotification={this.props.addNotification}
      />
    )
  }

  renderLabels() {
    return (
      <LabelsContainer cardId={this.props.id} displayLabels displaySelect />
    )
  }

  renderTaskLists() {
    return (
      <TaskListsContainer cardId={this.props.id} />
    )
  }
  render() {
    return (
      <div>
        <Layout>
          <Content className="cardContent">
            <div>
              {this.renderLabels()}
            </div>
            <div>
              {this.renderAssignees()}
            </div>
            <EditArea
              text={this.props.card.desc}
              save={(newDesc) => { this.props.updateDesc(this.props.id, newDesc) }}
              hint="Add a description"
            />
            <p>Desc : {this.props.card.desc}</p>
            <p>DueDate : {this.props.card.dueComplete}</p>
            <p>Pos : {this.props.card.pos}</p>
            <p>List ID : {this.props.card.listId}</p>
            <p>ID : {this.props.id}</p>
            <p>More...</p>
            {this.renderTaskLists()}
          </Content>
        </Layout>
      </div>
    )
  }
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  card: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  boardLabels: PropTypes.array.isRequired,
  addComment: PropTypes.func.isRequired,
  updateDesc: PropTypes.func.isRequired,
  updateDueDate: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  getOneUser: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
}

export default Card
