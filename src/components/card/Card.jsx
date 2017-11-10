
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import './style.css'
import EditArea from '../../commons/editArea/EditArea'
import Loader from '../../commons/loader/Loader'
import LabelsContainer from '../../containers/labels/LabelsContainer'
import AssigneesContainer from '../../containers/assignees/AssigneesContainer'

const { Content } = Layout


class Card extends Component {
  constructor(props) {
    super(props)
    this.getLabels = this.getLabels.bind(this)
    this.getAssignees = this.getAssignees.bind(this)
  }

  getAssignees() {
    return (
      <div>
        { this.props.card.isFetchingAssignees ? (
          <Loader message="Loading labels..." />
        ) : (
          <AssigneesContainer cardId={this.props.id} displayAssignees displaySelect />
        )}
      </div>
    )
  }

  getLabels() {
    return (
      <div>
        { this.props.card.isFetchingLabels ? (
          <Loader message="Loading labels..." />
        ) : (
          <LabelsContainer cardId={this.props.id} displayLabels displaySelect />
        )}
      </div>
    )
  }

  render() {
    return (
      <div>
        <Layout>
          { this.props.card.isFetchingAssignees
            && this.props.card.isFetchingLabels
            && this.props.card.isFetchingResponsible
            && this.props.card.isFetchingComments ? (
              <Loader message="Loading your card..." />
            ) : (
              <Layout>
                <Content className="content">
                  <div>
                    {this.getLabels()}
                  </div>
                  <div>
                    {this.getAssignees()}
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
                </Content>
              </Layout>
            )}
        </Layout>

      </div>
    )
  }
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  card: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  boardLabels: PropTypes.array.isRequired,
  addComment: PropTypes.func.isRequired,
  updateDesc: PropTypes.func.isRequired,
  updateDueDate: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  getOneUser: PropTypes.func.isRequired,
}

export default Card
