import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Button } from 'antd'

import './style.css'

class CreateWithName extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.title,
    }
    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.saveChange = this.saveChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ title: nextProps.title })
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    })
  }

  saveChange() {
    this.props.save(this.state.title)
  }


  render() {
    return (
      <div>
        <Input
          className="entityNameInput"
          value={this.state.title}
          onChange={this.onChangeTitle}
          onMouseDown={e => e.stopPropagation()}
        />
        <Button className="entityNameValidation" type="primary" onClick={this.saveChange}>Ok</Button>
        <Button onClick={this.props.cancel}>Cancel</Button>
      </div>
    )
  }
}


CreateWithName.propTypes = {
  title: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
}

export default CreateWithName
