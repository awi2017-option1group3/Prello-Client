
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Button } from 'antd'
import './style.css'
import EditArea from '../../commons/editArea/EditArea'

const { Sider, Content } = Layout

class Card extends Component {
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
              <p>DueDate : {this.props.card.dueComplete.slice(0, 10)}</p>
              <p>Rank : {this.props.card.rank}</p>
              <p>ID : {this.props.id}</p>
              <p>More...</p>
            </Content>
            <Sider className="sider">
              <Button type="primary" className="siderButton">Button Members</Button>
              <Button type="primary" className="siderButton">Button labels</Button>
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
  getResponsibleForCard: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  addLabel: PropTypes.func.isRequired,
  addAssignee: PropTypes.func.isRequired,
  addResponsible: PropTypes.func.isRequired,
  updateDesc: PropTypes.func.isRequired,
  updateDueDate: PropTypes.func.isRequired,
}

export default Card
