import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button, Layout } from 'antd'
import './style.css'

const FormItem = Form.Item
const { Content } = Layout


class Register extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        this.props.register(values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Layout className="signupLayout">
        <Content className="signupContent" xs={20} sm={16} md={12} lg={8} xl={4}>
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
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 14 }} />} type="password" placeholder="ex., *********" />,
              )}
            </FormItem>
            <FormItem className="signupFormItemFooter">
              <Button type="primary" htmlType="submit" className="signup-form-button"> Sign up </Button>
              <div className="signupLogin">Or <a href="/">Login</a></div>
            </FormItem>
          </Form>
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
