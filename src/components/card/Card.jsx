import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Layout } from 'antd'
import GooglePicker from 'react-google-picker'
import './style.css'
import EditArea from '../../commons/editArea/EditArea'
import LabelsContainer from '../../containers/labels/LabelsContainer'
import AssigneesContainer from '../../containers/assignees/AssigneesContainer'
import TaskListsContainer from '../../containers/taskLists/TaskListsContainer'
import AttachmentsContainer from '../../containers/attachments/AttachmentsContainer'
import CommentsContainer from '../../containers/comments/CommentsContainer'

const { Content } = Layout
const SCOPE = ['https://www.googleapis.com/auth/drive.readonly']

class Card extends Component {
  constructor(props) {
    super(props)
    this.renderLabels = this.renderLabels.bind(this)
    this.renderAssignees = this.renderAssignees.bind(this)
    this.handleChangeGooglePicker = this.handleChangeGooglePicker.bind(this)
  }

  handleChangeGooglePicker(value) {
    if (value !== undefined && value.action === 'picked') {
      value.docs.map(element => this.props.addAttachment(this.props.card.id, element))
    }
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

  renderAttachments() {
    return (
      <AttachmentsContainer cardId={this.props.id} />
    )
  }

  renderTaskLists() {
    return (
      <TaskListsContainer cardId={this.props.id} />
    )
  }

  renderComments() {
    return (
      <CommentsContainer card={this.props.card} />
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
            <GooglePicker
              clientId={process.env.REACT_APP_DRIVE_CLIENT_ID}
              developerKey={process.env.REACT_APP_DRIVE_DEVELOPER_KEY}
              scope={SCOPE}
              onChange={this.handleChangeGooglePicker}
              multiselect
              navHidden
              authImmediate={false}
              mimeTypes={['application/vnd.google-apps.document', 'application/vnd.google-apps.file',
                'application/vnd.google-apps.spreadsheet', 'application/vnd.google-apps.folder', 'application/pdf',
                'image/png', 'image/jpeg', 'image/gif', 'application/vnd.google.drive.ext-type.png',
                'application/vnd.google.drive.ext-type.jpg', 'application/vnd.google.drive.ext-type.gif']}
              viewId={'DOCS'}
            >
              <Button type="primary" className="siderButton">Google Drive</Button>
            </GooglePicker>
            <div>
              {this.renderAttachments()}
            </div>
            {this.renderComments()}
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
  addAttachment: PropTypes.func.isRequired,
  updateDesc: PropTypes.func.isRequired,
  updateDueDate: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  getOneUser: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
}

export default Card
