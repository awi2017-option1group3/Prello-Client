import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card as UICard } from 'antd'
import './style.css'

const BoardPreview = props => (
  <Link
    to={`/boards/${props.id}`}
    className="boardLink"
  >
    <UICard title={props.title} className="boardPreview">
      <p>This is a board description not implemented.</p>
    </UICard>
  </Link>
)

BoardPreview.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default BoardPreview
