import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button, Layout, Modal } from 'antd'
import { Grid, Row, Col } from 'react-flexbox-grid'
import './style.css'


const FormItem = Form.Item
const { Content } = Layout


class Register extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.registrationSuccessed = this.registrationSuccessed.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.register(values)
        this.registrationSuccessed(values)
      }
    })
  }

  registrationSuccessed(values) {
    Modal.success({
      title: 'Registration successed ',
      content: `Welcome ${values.firstname} in the Prello team by Gluon!`,
      okText: 'Ok',
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const regExpPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')
    return (
      <Layout className="signupLayout">
        <Content className="signupContent" >
          <Grid fluid>
            <Row>
              <Col xs={12} sm={6} md={4} lg={4} smOffset={3} mdOffset={4}>
                <Form onSubmit={this.handleSubmit} className="signup-form" layout="vertical">
                  <h1 >Register to Prello</h1>
                  <p className="signupTitle"> by Gluon</p>
                  <FormItem className="signupFormItem" label="Last Name">
                    {getFieldDecorator('lastname', {
                      rules: [{ required: true, message: 'Please insert your last name!' }],
                    })(
                      <Input prefix={<Icon type="user" style={{ fontSize: 14 }} />} placeholder="Jon " />,
                    )}
                  </FormItem>
                  <FormItem className="signupFormItem" label="First Name">
                    {getFieldDecorator('firstname', {
                      rules: [{ required: true, message: 'Please insert your first name!' }],
                    })(
                      <Input prefix={<Icon type="user" style={{ fontSize: 14 }} />} placeholder="Snow " />,
                    )}
                  </FormItem>
                  <FormItem className="signupFormItem" label="Email" hasFeedback>
                    {getFieldDecorator('email', {
                      rules: [{
                        type: 'email', message: 'The input is not valid E-mail!',
                      }, {
                        required: true, message: 'Please input your E-mail!',
                      }],
                    })(
                      <Input prefix={<Icon type="mail" style={{ fontSize: 14 }} />} placeholder="ex., jon.snow@domain.com" />,
                    )}
                  </FormItem>
                  <FormItem className="signupFormItem" label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                      rules: [{
                        required: true, message: 'Please input your Password!',
                      }, {
                        pattern: regExpPassword, message: 'Your password must contain at least one number, one special characters, one capital letter and be longer than 8 character!',
                      }],
                    })(
                      <Input prefix={<Icon type="lock" style={{ fontSize: 14 }} />} type="password" placeholder="ex., *********" />,
                    )}
                  </FormItem>
                  <FormItem className="signupFormItemFooter">
                    <Button type="primary" htmlType="submit" className="signup-form-button"> Sign up </Button>
                    <div className="signupLogin">Or <a href="/">Login</a></div>
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

Register.propTypes = {
  register: PropTypes.func.isRequired,
}

const WrappedRegister = Form.create()(Register)

export default WrappedRegister
