import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Popconfirm, Tooltip } from 'antd'

import './style.css'

const Attachments = props => (
  <div>
    {props.attachments.map(attachment => (
      <div key={attachment.id}>
        <Tooltip title={attachment.name}>
          <a target="_blank" href={attachment.url}><Button className="fileButton"><Icon type="file" className="icon" />{attachment.name}</Button></a>
        </Tooltip>
        <Popconfirm
          title="Do you really want to delete this attachment ?"
          placement="right"
          onConfirm={() => { props.removeAttachment(props.cardId, attachment.id) }}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger" >
            <Icon type="delete" />
          </Button>
        </Popconfirm>
      </div>
    ))}
  </div>
)

Attachments.propTypes = {
  attachments: PropTypes.array.isRequired,
  cardId: PropTypes.string.isRequired,
  removeAttachment: PropTypes.func.isRequired,
}

export default Attachments
