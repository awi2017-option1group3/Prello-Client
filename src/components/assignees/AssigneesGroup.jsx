import React from 'react'
import PropTypes from 'prop-types'

import Assignees from './Assignees'
import AssigneesSelect from './AssigneesSelect'
import ResponsibleSelect from './ResponsibleSelect'
import './style.css'

const AssigneesGroup = props => (
  <div className="cardAssigneesGroup">
    {props.displayAssignees ? (
      <Assignees {...props} cardId={props.card.id} maxDisplayedAssignees={3} />
    ) : (
      null
    )}
    {props.displaySelectAssignees ? (
      <AssigneesSelect {...props} />
    ) : (
      null
    )}
    {props.displaySelectResponsible ? (
      <ResponsibleSelect {...props} />
    ) : (
      null
    )}
  </div>
)

AssigneesGroup.defaultProps = {
  displaySelectResponsible: false,
}

AssigneesGroup.propTypes = {
  card: PropTypes.object.isRequired,
  displayAssignees: PropTypes.bool.isRequired,
  displaySelectAssignees: PropTypes.bool.isRequired,
  displaySelectResponsible: PropTypes.bool,
}

export default AssigneesGroup
