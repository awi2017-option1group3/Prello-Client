import React from 'react'
import { Layout } from 'antd'
import Loader from '../../commons/loader/Loader'

const { Content } = Layout

const Logout = () => (
  <Layout>
    <Content>
      <Loader message="Log out of Prello..." />
    </Content>
  </Layout>
)

export default Logout
