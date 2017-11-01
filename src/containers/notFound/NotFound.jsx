import React, { Component } from 'react'
import { connect } from 'react-redux'
import ErrorDisplayer from '../../commons/errorDisplayer/ErrorDisplayer'

class NotFound extends Component {
  render() {
    return (
      <ErrorDisplayer
        icon="compass"
        message="Page not found."
      />
    )
  }
}

export default connect()(NotFound)
