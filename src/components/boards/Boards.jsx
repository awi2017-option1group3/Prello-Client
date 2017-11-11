import React from 'react'
import PropTypes from 'prop-types'
import { Button, Layout } from 'antd'
import { Grid, Row, Col } from 'react-flexbox-grid'
import BoardPreview from '../boardPreview/BoardPreview'
import Loader from '../../commons/loader/Loader'
import './style.css'

const { Content } = Layout

const Boards = props => (
  <Layout className="boardsLayout">
    <Content className="boardsContent">
      { props.boards.areFetching ? (
        <Loader message="Loading your boards..." />
      ) : (
        <Grid fluid>
          <Row>
            {props.boards.data.map(board => (
              <Col xs={12} sm={6} md={4} lg={3} key={board.id}>
                <BoardPreview {...board} deleteBoard={props.deleteBoard} />
              </Col>
            ))}
            <Col xs={12} sm={6} md={4} lg={3}>
              <div className="addBoardBlock">
                <Button
                  className="addBoardButton"
                  onClick={() => props.addBoard(props.userId)}
                  icon="plus"
                  size="large"
                >New Board</Button>
              </div>
            </Col>
          </Row>
        </Grid>
      )}
    </Content>
  </Layout>
)

Boards.propTypes = {
  boards: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  addBoard: PropTypes.func.isRequired,
  deleteBoard: PropTypes.func.isRequired,
}

export default Boards
