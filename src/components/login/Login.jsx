import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Button, Layout, Alert } from 'antd'
import { Grid, Row, Col } from 'react-flexbox-grid'

import './style.css'

const FormItem = Form.Item
const { Content } = Layout

class Login extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.authenticate(values.email, values.password)
      }
    })
  }

  render() {
    return (
      <Layout className="loginLayout">
        <Content className="loginContent" >
          <Grid fluid>
            <Row>
              <Col xs={12} sm={6} md={4} lg={4} smOffset={3} mdOffset={4}>
                <Form onSubmit={this.handleSubmit} className="login-form" layout="vertical">
                  
                  <h1>Login to Prello</h1>
                  <p className="loginTitle"> by Gluon</p>

                  { this.props.failedAuthentication &&
                    <Alert message="It's a bad couple of email and password, so we can't login you to Prello." type="error" />
                  }
                  
                  <FormItem className="loginFormItem">
                    { this.props.form.getFieldDecorator('email', {
                      rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                      <Input prefix={<Icon type="mail" style={{ fontSize: 14 }} />} placeholder="Email" />,
                    )}
                  </FormItem>
                  
                  <FormItem className="loginFormItem">
                    { this.props.form.getFieldDecorator('password', {
                      rules: [{ required: true, message: 'Please input your password!' }],
                    })(
                      <Input prefix={<Icon type="lock" style={{ fontSize: 14 }} />} type="password" placeholder="Password" />,
                    )}
                  </FormItem>

                  <FormItem className="loginFormItemFooter">
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={this.props.isAuthenticating}>
                      Login
                    </Button>
                    <div className="loginGoToRegister">
                      Or&nbsp;
                      <Link to={'/register'}>
                        register
                      </Link>
                    </div>
                  </FormItem>

                </Form>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Layout>
    )
  }
}

Login.propsType = {
  form: PropTypes.object.isRequired,
  isAuthenticating: PropTypes.bool.isRequired,
  failedAuthentication: PropTypes.bool.isRequired,
  authenticate: PropTypes.func.isRequired,
}

const WrappedLogin = Form.create()(Login)

export default WrappedLogin
