
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Button } from 'antd'
import './style.css'
import EditArea from '../../commons/editArea/EditArea'

const { Sider, Content } = Layout

class CardDetails extends Component {
  render() {
    console.log(' In cardDetails : this.props.card')
    console.log(this.props.card)
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

CardDetails.propTypes = {
  id: PropTypes.string.isRequired,
  card: PropTypes.object.isRequired,
  cleanCardState: PropTypes.func.isRequired,
  getOneCard: PropTypes.func.isRequired,
  getAllAssigneesInBoard: PropTypes.func.isRequired,
  getAllCommentsInBoard: PropTypes.func.isRequired,
  getAllLabelsInBoard: PropTypes.func.isRequired,
  getResponsibleForBoard: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  addLabel: PropTypes.func.isRequired,
  addMember: PropTypes.func.isRequired,
  addResponsible: PropTypes.func.isRequired,
  updateDesc: PropTypes.func.isRequired,
  updateDueDate: PropTypes.func.isRequired,
}

export default CardDetails
