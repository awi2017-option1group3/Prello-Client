
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GooglePicker from 'react-google-picker'
import { Layout, Button, Select } from 'antd'
import './style.css'
import EditArea from '../../commons/editArea/EditArea'
import AttachmentsContainer from '../../containers/attachments/AttachmentsContainer'
import LabelsContainer from '../../containers/labels/LabelsContainer'
import AssigneesContainer from '../../containers/assignees/AssigneesContainer'

const { Sider, Content } = Layout

const SCOPE = ['https://www.googleapis.com/auth/drive.readonly']
const Option = Select.Option

class Card extends Component {
  constructor(props) {
    super(props)
    this.handleChangeAssignee = this.handleChangeAssignee.bind(this)
    this.handleChangeLabels = this.handleChangeLabels.bind(this)
    this.handleChangeGooglePicker = this.handleChangeGooglePicker.bind(this)
    this.getLabels = this.getLabels.bind(this)
    this.getAssignees = this.getAssignees.bind(this)

  }

  getAssignees() {
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

  getLabels() {
    return (
      <LabelsContainer cardId={this.props.id} displayLabels displaySelect />
    )
  }

  handleChangeGooglePicker(value) {
    if (value !== undefined && value.action === 'picked') {
      value.docs.map(element => this.props.addAttachment(this.props.card.id, element))
    }
  }

  getAttachments() {
    return (
      <AttachmentsContainer cardId={this.props.id} />
    )
  }

  render() {
    return (
      <div>
        <Layout>
          <Layout>
            <Content className="content">
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
              <div>
                {this.getAttachments()}
              </div>
              <p>More...</p>
            </Content>
            <Sider className="sider">
              <Select
                mode="tags"
                style={{ width: '60%' }}
                placeholder="Select users..."
                onChange={this.handleChangeAssignee}
                defaultValue={this.props.card.assignees.map(assignee => assignee.fullName)}
                tokenSeparators={[',']}
              >
                {this.props.users.map(user => <Option key={this.props.id + user.id}>{user.fullName}</Option>)}
              </Select>
              <Select
                mode="tags"
                style={{ width: '60%' }}
                placeholder="Select labels..."
                onChange={this.handleChangeLabels}
                defaultValue={this.props.card.labels.map(label => label.name)}
                tokenSeparators={[',']}
              >
                {this.props.labels.map(label => <Option key={this.props.id + label.id}>{label.name}</Option>)}
              </Select>
              <Button type="primary" className="siderButton">Button drive</Button>
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
            </Sider>
          </Layout>
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
  addLabel: PropTypes.func.isRequired,
  addAssignee: PropTypes.func.isRequired,
  addResponsible: PropTypes.func.isRequired,
  addAttachment: PropTypes.func.isRequired,
  updateDesc: PropTypes.func.isRequired,
  updateDueDate: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  getOneUser: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
}

export default Card
