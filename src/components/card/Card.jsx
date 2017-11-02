import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GooglePicker from 'react-google-picker'
import './style.css'
import { Layout, Button } from 'antd'

const { Sider, Content } = Layout

const SCOPE = ['https://www.googleapis.com/auth/drive.readonly']

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
              <GooglePicker
                clientId={process.env.REACT_APP_DRIVE_CLIENT_ID}
                developerKey={process.env.REACT_APP_DRIVE_DEVELOPER_KEY}
                scope={SCOPE}
                onChange={data => console.log('on change:', data)}
                multiselect
                navHidden
                authImmediate={false}
                mimeTypes={['image/png', 'image/jpeg', 'image/jpg']}
                viewId={'DOCS'}
              >
                <Button type="primary" className="siderButton">Google Drive</Button>
              </GooglePicker>
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
