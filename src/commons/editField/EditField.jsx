import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'

class EditField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: null,
      text: this.props.text,
    }
    this.onChangeText = this.onChangeText.bind(this)
  }

  onChangeText(e) {
    this.setState({ text: e.target.value })
  }

  toggleEditing() {
    this.setState({ editing: this.props.id })
  }

  saveChange() {
    this.props.saveChange(this.state.text)
    this.setState({ editing: null })
  }

  renderItemOrEditField() {
    if (this.state.editing === this.props.id) {
      return (
        <Input
          value={this.state.text}
          onPressEnter={() => { this.saveChange() }}
          onBlur={() => { this.saveChange() }}
          onChange={this.onChangeText}
          onMouseDown={e => e.stopPropagation()}
        />
      )
    } 
    return (
      <p onClick={this.toggleEditing.bind(this, this.props.id)}>
        {this.state.text}
      </p>
    )
  }

  render() {
    return this.renderItemOrEditField()
  }
}

EditField.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  saveChange: PropTypes.func.isRequired,

}
export default EditField
