import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'
import './style.css'

class EditField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      text: this.props.text,
    }
    this.onChangeText = this.onChangeText.bind(this)
    this.enableEditing = this.enableEditing.bind(this)
    this.saveChange = this.saveChange.bind(this)
  }

  componentWillReceiveProps(nextProps){
    this.setState({text: nextProps.text})
  }

  onChangeText(e) {
    this.setState({
      text: e.target.value,
    })
  }

  enableEditing() {
    this.setState({
      editing: true,
    })
  }

  saveChange() {
    this.setState({
      editing: false,
    })
    this.props.save(this.state.text)
  }

  renderItemOrEditField() {
    if (this.state.editing) {
      return (
        <Input
          value={this.state.text}
          onChange={this.onChangeText}
          onPressEnter={this.saveChange}
          onBlur={this.saveChange}
          onMouseDown={e => e.stopPropagation()}
          autoFocus
        />
      )
    }
    return this.state.text === "" ? (
      <div {...this.props.dragHandleProps} onClick={this.enableEditing}>
        <span class="hintEdit">{this.props.hint}</span>
      </div>
    ) : (
      <div {...this.props.dragHandleProps} onClick={this.enableEditing}>
        {this.state.text}
      </div>
    )
  }

  render() {
    return this.renderItemOrEditField()
  }
}

EditField.defaultProps = {
  dragHandleProps: null,
  hint: "Click here to edit.",
}

EditField.propTypes = {
  text: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired,
  dragHandleProps: PropTypes.object,
  hint: PropTypes.string,
}

export default EditField
