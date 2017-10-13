import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal as UIModal } from 'antd'

class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.showModal = this.showModal.bind(this)
  }

  handleOk() {
    this.setState({
      visible: false,
    })
  }

  handleCancel() {
    this.setState({
      visible: false,
    })
  }

  showModal() {
    this.setState({
      visible: true,
    })
  }

  render() {
    return (
      <div>
        <a type="primary" onClick={this.showModal}>{this.props.title}</a>
        <UIModal
          title={this.props.title}
          visible={this.state.visible}
          okText={this.props.okText}
          cancelText={this.props.cancelText}
          onOk={this.props.handleOk}
          onCancel={this.handleCancel}
        >
          <p>{this.props.message}</p>
        </UIModal>
      </div>
    )
  }
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  okText: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
  handleOk: PropTypes.func.isRequired,
}

export default Modal
