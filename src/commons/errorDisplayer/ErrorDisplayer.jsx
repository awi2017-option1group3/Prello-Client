import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Button } from 'antd'
import './style.css'

const ErrorDisplayer = props => (
  <div className="errorDisplayer">
    <Icon type={props.icon} />
    <p>{props.message}</p>

    <a href="/">
      <Button
        className="errorButton"
        icon="left"
      >Return to your boards</Button>
    </a>
  </div>

)

ErrorDisplayer.defaultProps = {
  icon: "close-circle-o",
  message: 'An error occured.',
}

ErrorDisplayer.propTypes = {
  icon: PropTypes.string,
  message: PropTypes.string,
}

export default ErrorDisplayer
