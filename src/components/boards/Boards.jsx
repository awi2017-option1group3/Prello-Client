import React from 'react'
import PropTypes from 'prop-types'
import { Button, Layout, Spin } from 'antd'
import { Grid, Row, Col } from 'react-flexbox-grid'
import BoardPreview from '../boardPreview/BoardPreview'
import './style.css'

const { Content } = Layout

const Boards = props => (
  <Layout className="boardsLayout">
    <Content className="boardsContent">
      { props.isFetching ? (
        <div className="boardsLoader">
          <Spin tip="Loading your boards..." />
        </div>
      ) : (
        <Grid fluid>
          <Row>
            {props.boards.map(board => (
              <Col xs={12} sm={6} md={4} lg={3} key={board.id}>
                <BoardPreview {...board} />
              </Col>
            ))}
            <Col xs={12} sm={6} md={4} lg={3}>
              <div className="addBoardBlock">
                <Button
                  className="addBoardButton"
                  onClick={() => props.addBoard()}
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
  boards: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  addBoard: PropTypes.func.isRequired,
}

export default Boards
