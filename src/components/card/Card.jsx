
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Button, Select } from 'antd'
import './style.css'
import EditArea from '../../commons/editArea/EditArea'

const { Sider, Content } = Layout

const Option = Select.Option


class Card extends Component {
  constructor(props) {
    super(props)
    this.handleChangeAssignee = this.handleChangeAssignee.bind(this)
    this.handleChangeLabels = this.handleChangeLabels.bind(this)
  }

  handleChangeAssignee(value) {
    const memberId = value[value.length - 1].slice(this.props.id.length, value.toString().length)
    if (this.props.card.assignees.map(element => element.id).includes(memberId) === true) {
      this.props.removeAssigneeInCard(this.props.card.id, memberId)
    } else {
      this.props.addAssignee(this.props.card.id, memberId)
    }
  }

  handleChangeLabels(value) {
    const labelId = value[value.length - 1].slice(this.props.id.length, value.toString().length)
    if (this.props.card.labels.map(element => element.id).includes(labelId) === true) {
      this.props.removeLabelInCard(this.props.card.id, labelId)
    } else {
      this.props.addLabel(this.props.card.id, labelId)
    }
  }

  render() {
    console.log(this.props.card.labels)
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
              <p>Rank : {this.props.card.rank}</p>
              <p>List ID : {this.props.card.listId}</p>
              <p>ID : {this.props.id}</p>
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
            </Sider>
          </Layout>
        </Layout>

      </div>
    )
  }
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  card: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  getResponsibleForCard: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  addLabel: PropTypes.func.isRequired,
  addAssignee: PropTypes.func.isRequired,
  addResponsible: PropTypes.func.isRequired,
  updateDesc: PropTypes.func.isRequired,
  updateDueDate: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  getOneUser: PropTypes.func.isRequired,
  removeAssigneeInCard: PropTypes.func.isRequired,
  removeLabelInCard: PropTypes.func.isRequired,
}

export default Card
