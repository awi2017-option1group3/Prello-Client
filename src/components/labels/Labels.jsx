import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tag } from 'antd'
import './style.css'

class Labels extends Component {
  render() {
    return (
      <div>
        {this.props.cardLabels.map(label => (
          <Tag color={label.color} key={`label-display-${(this.props.cardId + label.id)}`} className="cardLabel">
            {label.name}
          </Tag>
        ))}
      </div>
    )
  }
}

Labels.propTypes = {
  cardId: PropTypes.string.isRequired,
  cardLabels: PropTypes.array.isRequired,
}

export default Labels
