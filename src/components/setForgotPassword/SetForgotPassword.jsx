import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button, Layout, Modal } from 'antd'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { history } from '../../store'

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
  resetPasswordSuccessed() {
    Modal.success({
      title: 'Reset Password successed ',
      content: `Goog job ${this.props.user.fullName} !
      Now you can use your new password to access your Prello account !`,
      okText: 'Ok',
      onOk: history.push('/'),
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.resetPassword(this.props.token, values)
        this.resetPasswordSuccessed()
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
                  { this.props.user ? (
                    <div>
                      <h1 >Reset your Password </h1>
                      <p className="forgotPasswordTitle"> Prello by Gluon</p>
                      <h3>{this.props.user.fullName}</h3>
                      <p>Your email: {this.props.user.email}</p>
                      <FormItem className="signupFormItem" label="New Password" hasFeedback>
                        {getFieldDecorator('password', {
                          rules: [{
                            required: true, message: 'Please input your Password!',
                          }, {
                            pattern: regExpPassword, message: 'Your password must contain at least one number, one special character, one capital letter and be longer than 8 characters.',
                          }],
                        })(
                          <Input prefix={<Icon type="lock" style={{ fontSize: 14 }} />} type="password" placeholder="ex., *********" />,
                        )}
                      </FormItem>
                      <FormItem className="signupFormItemFooter">
                        <Button type="primary" htmlType="submit" className="signup-form-button"> Reset </Button>
                      </FormItem>
                    </div>
                  ) : (
                    <div>
                      <h1 >Prello </h1>
                      <p className="forgotPasswordTitle">by Gluon</p>
                      <h1> This link has expired</h1>
                    </div>
                  )}
                </Form>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Layout>
    )
  }
}
SetForgotPassword.defaultProps = {
  user: null,
}

SetForgotPassword.propTypes = {
  form: PropTypes.object.isRequired,
  getUserForgotPassword: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  user: PropTypes.object,
}

const WrappedSetForgotPassword = Form.create()(SetForgotPassword)

export default WrappedSetForgotPassword
