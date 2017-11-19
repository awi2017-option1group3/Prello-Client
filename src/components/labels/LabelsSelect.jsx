import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Select, Tag } from 'antd'
import './style.css'

const Option = Select.Option

class LabelsSelect extends Component {
  constructor(props) {
    super(props)
    this.handleChangeLabels = this.handleChangeLabels.bind(this)
    this.state = {
      value: 'Labels',
    }
  }

  handleChangeLabels(value) {
    const labelId = value.substring(this.props.cardId.length)
    if (this.props.cardLabels.map(element => element.id).includes(labelId) === true) {
      this.props.removeLabelInCard(this.props.cardId, labelId)
    } else {
      this.props.addLabelInCard(this.props.cardId, labelId)
    }
    this.setState({
      value: 'Labels',
    })
  }

  render() {
    return (
      <Select
        className="selectLabels"
        placeholder="Labels"
        value={this.state.value}
        onChange={this.handleChangeLabels}
        tokenSeparators={[',']}
      >
        {this.props.boardLabels.map(label => (
          <Option
            key={this.props.cardId + label.id}
          >
            <Tag color={label.color} key={`label-select-${(this.props.cardId + label.id)}`}>
              {label.name}
            </Tag>
          </Option>
        ))}
      </Select>
    )
  }
}

LabelsSelect.propTypes = {
  cardId: PropTypes.string.isRequired,
  cardLabels: PropTypes.array.isRequired,
  boardLabels: PropTypes.array.isRequired,
  removeLabelInCard: PropTypes.func.isRequired,
  addLabelInCard: PropTypes.func.isRequired,
}

export default LabelsSelect
