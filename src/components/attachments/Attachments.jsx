import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Tooltip } from 'antd'
import './style.css'


class Attachments extends Component {
  render() {
    return (
      <div>
        {this.props.attachments.map(attachment => (
          <div key={attachment.id}>
            <Tooltip title={attachment.name}>
              <a target="_blank" href={attachment.url}><Button type="primary" className="fileButton"><Icon type="file" />{attachment.name}</Button></a>
            </Tooltip>
            <Tooltip placement="rightTop" title={`Delete ${attachment.name} ?`}>
              <Button
                type="danger"
                onClick={() => { this.props.removeAttachment(this.props.cardId, attachment.id) }}
              ><Icon type="delete" /></Button>
            </Tooltip>
          </div>
        ))}
      </div>
    )
  }
}


Attachments.propTypes = {
  attachments: PropTypes.array.isRequired,
  cardId: PropTypes.string.isRequired,
  removeAttachment: PropTypes.func.isRequired,
}

export default Attachments
