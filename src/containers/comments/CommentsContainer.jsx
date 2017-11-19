import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getAllCommentsInCard, addComment } from './actions'
import Comments from '../../components/comments/Comments'

class CommentsContainer extends Component {
  componentWillMount() {
    this.props.getAllCommentsInCard(this.props.card.id)
  }

  render() {
    return this.props.card && this.props.user ? (
      <Comments {...this.props} />
    ) : (null)
  }
}

CommentsContainer.defaultProps = {
  user: null,
}

CommentsContainer.propTypes = {
  card: PropTypes.object.isRequired,
  user: PropTypes.object,
  getAllCommentsInCard: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  comments: state.cardComments.data,
  user: state.user.infos,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllCommentsInCard,
  addComment,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentsContainer)
