import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Icon, Layout, Tooltip } from 'antd'
import { Grid, Row, Col } from 'react-flexbox-grid'
import BoardPreview from '../boardPreview/BoardPreview'
import Loader from '../../commons/loader/Loader'
import './style.css'

const { Content } = Layout

const ContributingBoards = props => (
  <Layout className="boardsLayout">
    <Content className="boardsContent">
      { props.boards.areFetching ? (
        <Loader message="Loading boards..." />
      ) : (
        <Grid fluid>
          <h1 className="boardsTitle">
            <Icon type="team" />Contributing Boards
            <Tooltip placement="right" title="You are a contributor of those boards. You don't have any right on them.">
              <Icon className="boardsTitleInfo" type="info-circle-o" />
            </Tooltip>
          </h1>
          {props.boards.data.length > 0 ? (
            <Row>
              {props.boards.data.sort((a, b) => a.title > b.title).map(board => (
                <Col xs={12} sm={6} md={4} lg={3} key={board.id}>
                  <BoardPreview {...board} allowDeleting={false} />
                </Col>
              ))}
            </Row>
          ) : (
            <Alert className="noContributingBoards" message="You are not invited to contribute to any shared boards." type="info" showIcon/>
          )}
        </Grid>
      )}
    </Content>
  </Layout>
)

ContributingBoards.propTypes = {
  boards: PropTypes.object.isRequired,
}

export default ContributingBoards
