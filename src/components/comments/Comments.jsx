import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Alert, Button, Input, Tooltip } from 'antd'

import './style.css'

const { TextArea } = Input

class Comments extends Component {
  constructor(props) {
    super(props)
    this.add = this.add.bind(this)
    this.handleNewCommentContentChange = this.handleNewCommentContentChange.bind(this)
    this.state = {
      newCommentContent: '',
    }
  }

  add() {
    this.props.addComment(this.props.card.id, this.state.newCommentContent, this.props.user.id)
    this.setState({
      newCommentContent: '',
    })
  }

  handleNewCommentContentChange(event) {
    this.setState({
      newCommentContent: event.target.value,
    })
  }

  renderNewComment() {
    return (
      <div className="newComment">
        <TextArea
          className="newCommentContent"
          placeholder="Write a comment..."
          value={this.state.newCommentContent}
          onChange={this.handleNewCommentContentChange}
          autosize
        />
        <div className="newCommentSubmit">
          <Tooltip title="send" placement="top">
            <Button shape="circle" icon="message" onClick={this.add} />
          </Tooltip>
        </div>
        <div className="commentAvatar">
          <span>{this.props.user.initials.toUpperCase()}</span>
        </div>
      </div>
    )
  }

  renderComments() {
    return this.props.comments.sort((a, b) => moment(a.date).isBefore(b.date)).map(comment => this.renderComment(comment))
  }

  renderComment(comment) {
    return this.props.user.id === comment.user.id ? (
      this.renderOwnComment(comment)
    ) : (
      this.renderOthersComment(comment)
    )
  }

  renderOthersComment(comment) {
    return (
      <div key={`cardComment-${comment.id}`} className="comment">
        <Tooltip title={comment.user.fullName} placement="right">
          <div className={`commentAvatar ${this.props.card.responsible === comment.user.id ? 'responsible' : ''}`}>
            <span>{comment.user.initials.toUpperCase()}</span>
          </div>
        </Tooltip>
        <Alert
          type="info"
          className={`commentContent right ${this.props.card.responsible === comment.user.id ? '' : 'basic'}`}
          message={comment.content}
          description={moment(comment.date).format('MMMM Do YYYY, h:mm:ss a')}
        />
      </div>
    )
  }

  renderOwnComment(comment) {
    return (
      <div key={`cardComment-${comment.id}`} className="comment">
        <Alert
          className="commentContent left basic"
          message={comment.content}
          description={moment(comment.date).format('MMMM Do YYYY, h:mm:ss a')}
        />
        <Tooltip title={`${comment.user.fullName} (you)`} placement="left">
          <div className="commentAvatar">
            <span>{comment.user.initials.toUpperCase()}</span>
          </div>
        </Tooltip>
      </div>
    )
  }

  render() {
    return (
      <div>
        { this.renderNewComment() }
        { this.renderComments() }
      </div>
    )
  }
}

Comments.propTypes = {
  card: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
}

export default Comments
