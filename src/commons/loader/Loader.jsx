import React from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'antd'
import './style.css'

const Loader = props => (
  <div className="loader">
    <Spin tip={props.message} />
  </div>
)

Loader.defaultProps = {
  message: 'Please wait...',
}

Loader.propTypes = {
  message: PropTypes.string,
}

export default Loader
