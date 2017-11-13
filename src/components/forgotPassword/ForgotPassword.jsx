import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Button, Layout, Modal } from 'antd'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { history } from '../../store'

const FormItem = Form.Item
const { Content } = Layout

class ForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.ForgotPasswordSuccessed = this.ForgotPasswordSuccessed.bind(this)
    this.ForgotPasswordFailed = this.ForgotPasswordFailed.bind(this)
  }

  ForgotPasswordSuccessed(values) {
    Modal.success({
      title: 'Email sent !',
      content: `Check your email: ${values.email} and follow the link to reset your password.`,
      okText: 'Ok',
      onOk: history.push('/'),
    })
  }

  ForgotPasswordFailed(values) {
    Modal.warning({
      title: 'Email not found !',
      content: `This email is not correct: ${values.email} `,
      okText: 'Ok',
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.sendForgotPassword(values)
        if (this.props.success) {
          this.ForgotPasswordSuccessed(values)
        } else {
          this.ForgotPasswordFailed(values)
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Layout className="signupLayout">
        <Content className="forgotPasswordContent" >
          <Grid fluid>
            <Row>
              <Col xs={12} sm={6} md={4} lg={4} smOffset={3} mdOffset={4}>
                <Form onSubmit={this.handleSubmit} className="signup-form" layout="vertical">
                  <h1 >Forgot Password </h1>
                  <p className="forgotPasswordTitle"> Prello by Gluon</p>
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
                  <FormItem className="signupFormItemFooter">
                    <Button type="primary" htmlType="submit" className="signup-form-button"> Send </Button>
                    <div className="forgotPasswordLogin"><Link to={'/'}>Login</Link></div>
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

ForgotPassword.propTypes = {
  form: PropTypes.object.isRequired,
  sendForgotPassword: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
}

const WrappedForgotPassword = Form.create()(ForgotPassword)

export default WrappedForgotPassword
