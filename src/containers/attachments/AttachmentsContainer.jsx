import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getAllAttachmentsInCard, removeAttachmentInCard } from './actions'
import Attachments from '../../components/attachments/Attachments'

class AttachmentsContainer extends Component {
  componentWillMount() {
    this.props.getAllAttachmentsInCard(this.props.cardId)
  }

  render() {
    return (
      <Attachments {...this.props} />
    )
  }
}

AttachmentsContainer.propTypes = {
  cardId: PropTypes.string.isRequired,
  getAllAttachmentsInCard: PropTypes.func.isRequired,
  removeAttachmentInCard: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  attachments: state.cardAttachments.attachments,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllAttachmentsInCard,
  removeAttachmentInCard,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AttachmentsContainer)
