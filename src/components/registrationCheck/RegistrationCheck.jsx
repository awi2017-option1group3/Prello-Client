import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Layout, Modal } from 'antd'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { history } from '../../store'

const { Content } = Layout

class RegistrationCheck extends Component {
  constructor(props) {
    super(props)
    this.handleCheckRegistration = this.handleCheckRegistration.bind(this)
  }

  componentWillMount() {
    this.props.getUserRegistrated(this.props.token)
  }
  checkRegistrationSuccessed() {
    Modal.success({
      title: 'Welcome ',
      content: `Hi ${this.props.user.fullName} !
      Now you can use your validate account information to login !`,
      okText: 'Ok',
      onOk: history.push('/'),
    })
  }

  handleCheckRegistration() {
    this.props.validateUser(this.props.token)
    this.checkRegistrationSuccessed()
  }

  render() {
    return (
      <Layout>
        <Content className="registrationContent" >
          <Grid fluid>
            <Row>
              <Col xs={12} sm={6} md={4} lg={4} smOffset={3} mdOffset={4}>
                { this.props.user ? (
                  <div>
                    <h1 >Validate Registration </h1>
                    <p className="forgotPasswordTitle"> Prello by Gluon</p>
                    <h3>{this.props.user.fullName}</h3>
                    <p>Your email: {this.props.user.email}</p>
                    <p>To validate your registration click on the following button:</p>
                    <Content className="registrationButton">
                      <Button type="primary" onClick={this.handleCheckRegistration}> Validate </Button>
                    </Content>
                  </div>
                ) : (
                  <div>
                    <h1 >Prello </h1>
                    <p className="registrationTitle">by Gluon</p>
                    <h1> This link has expired</h1>
                    <p>Your account was deleted.</p>
                    <p>If you want to connect to prello, you have to register again.</p>
                  </div>
                )}
              </Col>
            </Row>
          </Grid>
        </Content>
      </Layout>
    )
  }
}
RegistrationCheck.defaultProps = {
  user: null,
}

RegistrationCheck.propTypes = {
  getUserRegistrated: PropTypes.func.isRequired,
  validateUser: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  user: PropTypes.object,
}

export default RegistrationCheck
