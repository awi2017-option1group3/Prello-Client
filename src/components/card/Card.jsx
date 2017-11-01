
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.css'
import { Layout, Button } from 'antd'

const { Sider, Content } = Layout

class CardDetails extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Layout>
            <Content className="content">
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
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
  id: PropTypes.string,
  title: PropTypes.string,

}

export default CardDetails