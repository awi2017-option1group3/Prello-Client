import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button, Layout, Modal } from 'antd'
import { Grid, Row, Col } from 'react-flexbox-grid'

import './style.css'


const FormItem = Form.Item
const { Content } = Layout
const confirm = Modal.confirm


class UserDetails extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
    this.showDeleteConfirm = this.showDeleteConfirm.bind(this)
  }


  onChangeText(e) {
    e.preventDefault()
    this.setState({
      textDelete: e.target.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.updateUser(this.props.user.id, values)
        this.updateSuccessed()
      }
    })
  }


  updateSuccessed() {
    Modal.success({
      title: 'Update successed ',
      content: 'Your information is up to date',
      okText: 'Ok',
    })
  }

  showDeleteConfirm() {
    confirm({
      title: 'Are you sure to delete your account ?',
      content: 'This action is irreversible.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        this.props.deleteUser(this.props.user.id)
        // Clean local storage
        localStorage.removeItem('auth')
        // Hard routing to clean the entire state
        window.location.replace('/login')
      },
    })
  }


  render() {
    const { getFieldDecorator } = this.props.form
    const regExpPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\\!@#$%&\\*\\_\\-\\"\'£€+/.?,;:=^])(?=.{8,})')
    const fullName = this.props.user.fullName.split(' ')
    return (
      <Layout className="signupLayout">
        <Content className="signupContent" >
          <Grid fluid>
            <Row>
              <Col xs={12} sm={6} md={4} lg={4} smOffset={3} mdOffset={4}>
                <Form onSubmit={this.handleSubmit} className="signup-form" layout="vertical">
                  <h1 >My Profil</h1>
                  <p className="signupTitle"> Prello by Gluon</p>
                  <FormItem className="signupFormItem" label="Last Name">
                    {getFieldDecorator('lastname', { initialValue: fullName[0] })(
                      <Input prefix={<Icon type="user" style={{ fontSize: 14 }} placeholder="Snow " />} />,
                    )}
                  </FormItem>
                  <FormItem className="signupFormItem" label="First Name">
                    {getFieldDecorator('firstname', { initialValue: fullName[1] })(
                      <Input prefix={<Icon type="user" style={{ fontSize: 14 }} />} placeholder="Jon " />,
                    )}
                  </FormItem>
                  <FormItem className="signupFormItem" label="Email" hasFeedback>
                    {getFieldDecorator('email', { initialValue: `${this.props.user.email}` })(
                      <Input prefix={<Icon type="mail" style={{ fontSize: 14 }} />} disabled />,
                    )}
                  </FormItem>
                  <FormItem className="signupFormItem" label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                      rules: [{
                        pattern: regExpPassword, message: 'Your password must contain at least one number, one special character, one capital letter and be longer than 8 characters!',
                      }],
                    })(
                      <Input prefix={<Icon type="lock" style={{ fontSize: 14 }} />} type="password" placeholder="ex., *********" />,
                    )}
                  </FormItem>
                  <FormItem className="signupFormItemFooter">
                    <Button type="primary" htmlType="submit" className="signup-form-button"> Save </Button>
                  </FormItem>
                </Form>
                <div className="deleteButton">
                  <Button type="danger" onClick={this.showDeleteConfirm} > <Icon type="close-circle" /> Delete my account </Button>
                </div>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Layout>
    )
  }
}

UserDetails.defaultProps = {
  user: null,
}

UserDetails.propTypes = {
  updateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  user: PropTypes.object,
}

const WrappedUserDetails = Form.create()(UserDetails)

export default WrappedUserDetails
