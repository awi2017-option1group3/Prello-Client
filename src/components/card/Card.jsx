import React from 'react'
import PropTypes from 'prop-types'
import { Card as UICard } from 'antd'
import './style.css'

const Card = props => (
  <UICard className="card" title={props.title} />
)

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default Card
