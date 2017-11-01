import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import './style.css'

const ErrorDisplayer = props => (
  <div className="errorDisplayer">
    <Icon type={props.icon} />
    <p>{props.message}</p>
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
