import React from 'react'
import PropTypes from 'prop-types'

import Labels from './Labels'
import LabelsSelect from './LabelsSelect'
import './style.css'

const LabelsGroup = props => (
  <div className="cardLabelsGroup">
    {props.displayLabels ? (
      <Labels {...props} />
    ) : (
      null
    )}
    {props.displaySelect ? (
      <LabelsSelect {...props} />
    ) : (
      null
    )}
  </div>
)

LabelsGroup.propTypes = {
  cardId: PropTypes.string.isRequired,
  displayLabels: PropTypes.bool.isRequired,
  displaySelect: PropTypes.bool.isRequired,
}

export default LabelsGroup
