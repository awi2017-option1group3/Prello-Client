import { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { cleanState as cleanUserState, getAllLabelsForBoard } from './actions'

class LabelsContainer extends Component {
  componentWillMount() {
    this.props.cleanUserState()
  }
}

LabelsContainer.propTypes = {
  cleanUserState: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  labels: state.data,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  cleanUserState,
  getAllLabelsForBoard,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LabelsContainer)
