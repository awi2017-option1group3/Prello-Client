import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Layout, Tooltip } from 'antd'
import { Grid, Row, Col } from 'react-flexbox-grid'

import BoardPreview from '../boardPreview/BoardPreview'
import Loader from '../../commons/loader/Loader'
import './style.css'

const { Content } = Layout

const OwnedBoards = props => (
  <Layout className="boardsLayout">
    <Content className="boardsContent">
      { props.boards.areFetching ? (
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
            {props.boards.data.sort((a, b) => a.title > b.title).map(board => (
              <Col xs={12} sm={6} md={4} lg={3} key={board.id}>
                <BoardPreview {...board} deleteBoard={props.deleteBoard} />
              </Col>
            ))}
            <Col xs={12} sm={6} md={4} lg={3}>
              <div className="addBoardBlock">
                <Button
                  className="addBoardButton"
                  onClick={() => props.addBoard(props.user.id)}
                  icon="plus"
                  size="large"
                >
                  New board
                </Button>
              </div>
            </Col>
          </Row>
        </Grid>
      )}
    </Content>
  </Layout>
)

OwnedBoards.propTypes = {
  boards: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  addBoard: PropTypes.func.isRequired,
  deleteBoard: PropTypes.func.isRequired,
}

export default OwnedBoards
