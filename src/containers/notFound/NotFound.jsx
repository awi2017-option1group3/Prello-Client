import React, { Component } from 'react'
import { connect } from 'react-redux'

class NotFound extends Component {
  render() {
    return (
      <p>Page not found.</p>
    )
  }
}

export default connect()(NotFound)
