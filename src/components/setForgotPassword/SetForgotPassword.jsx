import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Button, Layout } from 'antd'
import { Grid, Row, Col } from 'react-flexbox-grid'

const FormItem = Form.Item
const { Content } = Layout

class SetForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    this.props.getUserForgotPassword(this.props.token)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.setPassword(values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const regExpPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\\!@#$%&\\*\\_\\-\\"\'£€+/.?,;:=^])(?=.{8,})')
    return (
      <Layout className="signupLayout">
        <Content className="forgotPasswordContent" >
          <Grid fluid>
            <Row>
              <Col xs={12} sm={6} md={4} lg={4} smOffset={3} mdOffset={4}>
                <Form onSubmit={this.handleSubmit} className="signup-form" layout="vertical">
                  <h1 >Reset your Password </h1>
                  <p className="forgotPasswordTitle"> Prello by Gluon</p>
                  <p>{this.props.token}</p>
                  <FormItem className="signupFormItem" label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                      rules: [{
                        required: true, message: 'Please input your Password!',
                      }, {
                        pattern: regExpPassword, message: 'Your password must contain at least one number, one special character, one capital letter and be longer than 8 characters!',
                      }],
                    })(
                      <Input prefix={<Icon type="lock" style={{ fontSize: 14 }} />} type="password" placeholder="ex., *********" />,
                    )}
                  </FormItem>
                  <FormItem className="signupFormItemFooter">
                    <Button type="primary" htmlType="submit" className="signup-form-button"> Reset </Button>
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

SetForgotPassword.propTypes = {
  form: PropTypes.object.isRequired,
  getUserForgotPassword: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
}

const WrappedSetForgotPassword = Form.create()(SetForgotPassword)

export default WrappedSetForgotPassword
