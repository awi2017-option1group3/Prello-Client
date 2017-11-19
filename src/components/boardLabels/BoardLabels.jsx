import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Input, Tag, Select, Popconfirm } from 'antd'

import './style.css'

const Option = Select.Option

class BoardLabels extends Component {
  constructor(props) {
    super(props)
    this.add = this.add.bind(this)
    this.deleteLabel = this.deleteLabel.bind(this)
    this.reset = this.reset.bind(this)
    this.newLabelNameChange = this.newLabelNameChange.bind(this)
    this.newLabelColorChange = this.newLabelColorChange.bind(this)
    this.state = {
      newLabelName: '',
      newLabelColor: 'Choose a color',
    }
  }

  add() {
    if (this.state.newLabelName === '') {
      this.setState({
        newLabelName: "Can't be empty",
      })
    } else if (this.state.newLabelColor === 'Choose a color') {
      this.setState({
        newLabelColor: 'You must choose !',
      })
    } else {
      this.props.addLabelToBoard(this.props.boardId, this.state.newLabelName, this.state.newLabelColor)
      this.setState({
        newLabelName: '',
        newLabelColor: 'Choose a color',
      })
    }
  }

  reset() {
    this.setState({
      newLabelName: '',
      newLabelColor: 'Choose a color',
    })
  }

  deleteLabel(label) {
    this.props.removeLabelFromBoard(this.props.boardId, label.id)
  }

  newLabelNameChange(event) {
    this.setState({
      newLabelName: event.target.value,
    })
  }

  newLabelColorChange(value) {
    this.setState({
      newLabelColor: value,
    })
  }

  renderLabels() {
    return this.props.labels.sort((a, b) => a.name > b.name).map(label => this.renderLabel(label))
  }

  renderLabel(label) {
    return (
      <div className="boardLabel" key={`board-label-${(this.props.boardId + label.id)}`}>
        <Tag color={label.color}>
          {label.name}
        </Tag>
        {this.renderLabelOptions(label)}
      </div>
    )
  }

  renderLabelOptions(label) {
    return (
      <div className="boardLabelOptions">
        <Popconfirm
          title="Do you really want to delete this label ?"
          placement="right"
          onConfirm={() => this.deleteLabel(label)}
          okText="Yes"
          cancelText="No"
        >
          <Button size="small" icon="delete" />
        </Popconfirm>
      </div>
    )
  }

  renderCreateLabel() {
    return (
      <div className="newBoardLabelBlock">
        <Input
          className="newBoardLabelName"
          size="small"
          placeholder="Text"
          value={this.state.newLabelName}
          onChange={this.newLabelNameChange}
        />
        <Select
          className="newBoardLabelColor"
          placeholder="Choose a color"
          notFoundContent="Choose a color"
          size="small"
          value={this.state.newLabelColor}
          onSelect={this.newLabelColorChange}
        >
          <Option value="pink">Pink</Option>
          <Option value="red">Red</Option>
          <Option value="orange">Orange</Option>
          <Option value="green">Green</Option>
          <Option value="cyan">Cyan</Option>
          <Option value="blue">Blue</Option>
          <Option value="purple">Purple</Option>
        </Select>
        <Button size="small" icon="plus" onClick={this.add}>Add</Button>
        <Button size="small" icon="reload" onClick={this.reset}>Clear</Button>
      </div>
    )
  }

  render() {
    return (
      <div className="boardLabelsModal">
        {this.renderLabels()}
        {this.renderCreateLabel()}
      </div>
    )
  }
}

BoardLabels.propTypes = {
  boardId: PropTypes.string.isRequired,
  labels: PropTypes.array.isRequired,
  addLabelToBoard: PropTypes.func.isRequired,
  removeLabelFromBoard: PropTypes.func.isRequired,
}

export default BoardLabels
