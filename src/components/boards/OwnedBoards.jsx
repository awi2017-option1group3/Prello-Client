import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Layout, Tooltip } from 'antd'
import { Grid, Row, Col } from 'react-flexbox-grid'

import BoardPreview from '../boardPreview/BoardPreview'
import CreateWithName from '../../commons/createWithName/CreateWithName'
import Loader from '../../commons/loader/Loader'
import './style.css'

const { Content } = Layout

class OwnedBoards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adding: false,
      title: '',
    }
    this.add = this.add.bind(this)
    this.saveBoard = this.saveBoard.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  onCancel() {
    this.setState({
      adding: false,
    })
  }

  saveBoard(Newtitle) {
    this.setState({
      adding: false,
      title: Newtitle,
    })
    this.props.addBoard(this.props.user.id, Newtitle)
  }

  add() {
    return (
      <div>
        <CreateWithName
          title="Board"
          save={(Newtitle) => {
            this.saveBoard(Newtitle)
          }}
          cancel={this.onCancel}
        />
      </div>
    )
  }

  render() {
    return (
      <Layout className="boardsLayout">
        <Content className="boardsContent">
          { this.props.boards.areFetching ? (
            <Loader message="Loading your boards..." />
          ) : (
            <Grid fluid>
              <h1 className="boardsTitle">
                <Icon type="user" />Owned Boards
                <Tooltip placement="right" title="You are the owner of those boards. You can share them with other people or keep them for yourself.">
                  <Icon className="boardsTitleInfo" type="info-circle-o" />
                </Tooltip>
              </h1>
              <Row>
                {this.props.boards.data.sort((a, b) => a.title > b.title).map(board => (
                  <Col xs={12} sm={6} md={4} lg={3} key={board.id}>
                    <BoardPreview {...board} deleteBoard={this.props.deleteBoard} addNotification={this.props.addNotification} />
                  </Col>
                ))}
                <Col xs={12} sm={6} md={4} lg={3}>
                  <div className="addBoardBlock">
                    {this.state.adding ? (
                      this.add()
                    ) : (
                      <Button
                        className="addBoardButton"
                        onClick={() => this.setState({
                          adding: true,
                        })}
                        icon="plus"
                        size="large"
                      >
                        New board
                      </Button>

                    ) }
                  </div>
                </Col>
              </Row>
            </Grid>
          )}
        </Content>
      </Layout>
    )
  }
}


OwnedBoards.propTypes = {
  boards: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  addBoard: PropTypes.func.isRequired,
  deleteBoard: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
}

export default OwnedBoards
