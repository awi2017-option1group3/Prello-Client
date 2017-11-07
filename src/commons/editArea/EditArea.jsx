import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'
import ReactMarkdown from 'react-markdown'
import './style.css'

const { TextArea } = Input

class EditArea extends Component {
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

  componentWillReceiveProps(nextProps){ 
    this.setState({text: nextProps.text}) 
  } 

  renderItemOrEditField() {
    if (this.state.editing) {
      return (
        <TextArea
          value={this.state.text}
          onChange={this.onChangeText}
          onBlur={this.saveChange}
          onMouseDown={e => e.stopPropagation()}
          autoFocus
        />
      )
    }

    return this.state.text === '' ? (
      <div onClick={this.enableEditing}>
        <span className="hintEdit">{this.props.hint}</span>
      </div>
    ) : (
      <div onClick={this.enableEditing}> 
        <ReactMarkdown source={this.state.text} escapeHtml /> 
      </div>
    )
  }

  render() {
    return this.renderItemOrEditField()
  }
}

EditArea.defaultProps = {
  hint: 'Click here to edit.',
}

EditArea.propTypes = {
  text: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired,
  hint: PropTypes.string,
} 
 
export default EditArea
