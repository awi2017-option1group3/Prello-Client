import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Button } from 'antd'
import './style.css'

class Attachments extends Component {
  render() {
    return this.props.attachments !== undefined ? (
      <div>
        {this.props.attachments.map(attachment => (
          <Card
            key={attachment.id}
            style={{ width: 240 }}
            bodyStyle={{ padding: 0 }}
            extra={<Button
              type="danger"
              icon="delete"
              size="small"
              onClick={() => { this.props.removeAttachmentInCard(this.props.cardId, attachment.id) }}
            />
            }
          >
            <div className="custom-image">
              <img alt="example" width="100%" src={attachment.icon} />
            </div>
            <div className="custom-card">
              <a href={attachment.url} target="_blank"><h3>{attachment.name}</h3></a>
              <p>Last modification: {attachment.lastEditedTime}</p>
              <p>Description: {attachment.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    ) : (null)
  }
}


Attachments.propTypes = {
  attachments: PropTypes.array.isRequired,
  cardId: PropTypes.string.isRequired,
  removeAttachmentInCard: PropTypes.func.isRequired,
}

export default Attachments
