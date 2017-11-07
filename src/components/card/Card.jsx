
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Button, Select } from 'antd'
import './style.css'
import EditArea from '../../commons/editArea/EditArea'
import Loader from '../../commons/loader/Loader'

const { Sider, Content } = Layout

const Option = Select.Option


class Card extends Component {
  constructor(props) {
    super(props)
    this.selectAssignee = this.selectAssignee.bind(this)
    this.unselectAssignee = this.unselectAssignee.bind(this)
    this.selectLabels = this.selectLabels.bind(this)
    this.unselectLabels = this.unselectLabels.bind(this)
  }

  selectAssignee(value, option) {
    const memberId = value.substring(this.props.id.length)
    this.props.addAssignee(this.props.card.id, memberId)
  }

  unselectAssignee(value) {
    const memberId = value.substring(this.props.id.length)
    this.props.removeAssigneeInCard(this.props.card.id, memberId)
  }

  selectLabels(value, option) {
    const labelId = value.substring(this.props.id.length)
    this.props.addLabel(this.props.card.id, labelId)
  }

  unselectLabels(value) {
    const labelId = value.substring(this.props.id.length)
    this.props.removeLabelInCard(this.props.card.id, labelId)
  }

  render() {
    return (
      <div>
        <Layout>
          { this.props.isLoading ? (
            <Loader message="Loading your card..." />
          ) : (
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
                <p>More...</p>
              </Content>
              <Sider className="sider">
                <Select
                  mode="tags"
                  style={{ width: '60%' }}
                  placeholder="Select users..."
                  onSelect={this.selectAssignee}
                  onDeselect={this.unselectAssignee}
                  value={this.props.card.assignees.map(assignee => this.props.id + assignee.id)}
                  tokenSeparators={[',']}
                >
                  {this.props.users.map(user => <Option key={this.props.id + user.id}>{user.fullName}</Option>)}
                </Select>
                <Select
                  mode="tags"
                  style={{ width: '60%' }}
                  placeholder="Select labels..."
                  onSelect={this.selectLabels}
                  onDeselect={this.unselectLabels}
                  value={this.props.card.labels.map(label => this.props.id + label.id)}
                  tokenSeparators={[',']}
                >
                  {this.props.boardLabels.map(label => <Option key={this.props.id + label.id} style={{ backgroundColor: label.color }}>{label.name}</Option>)}
                </Select>
                <Button type="primary" className="siderButton">Button drive</Button>
              </Sider>
            </Layout>
          )}
        </Layout>

      </div>
    )
  }
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  card: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  boardLabels: PropTypes.array.isRequired,
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
  isLoading: PropTypes.bool.isRequired,
}

export default Card
