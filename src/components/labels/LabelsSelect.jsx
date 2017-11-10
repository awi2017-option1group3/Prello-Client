import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd' // A graphical card component is used to display a list
import './style.css'

const Option = Select.Option

class Labels extends Component {
  constructor(props) {
    super(props)
    this.handleChangeLabels = this.handleChangeLabels.bind(this)
  }

  handleChangeLabels(value) {
    const labelId = value.substring(this.props.cardId.length)
    if (this.props.cardLabels.map(element => element.id).includes(labelId) === true) {
      this.props.removeLabelInCard(this.props.cardId, labelId)
    } else {
      this.props.addLabelInCard(this.props.cardId, labelId)
    }
  }

  render() {
    return (
      <Select
        // mode="tags"
        style={{ width: '100%' }}
        placeholder="Select labels..."
        // onSelect={this.selectLabels}
        // onDeselect={this.unselectLabels}
        onChange={this.handleChangeLabels}
        // defaultValue={''}
        // value={this.props.card.labels.map(label => this.props.id + label.id)}
        tokenSeparators={[',']}
      >
        {this.props.boardLabels.map(label => <Option key={this.props.cardId + label.id} style={{ backgroundColor: label.color}} className="optionLabel">{label.name}</Option>)}
      </Select>
    )
  }
}

Labels.propTypes = {
  cardId: PropTypes.string.isRequired,
  cardLabels: PropTypes.array.isRequired,
  boardLabels: PropTypes.array.isRequired,
  removeLabelInCard: PropTypes.func.isRequired,
  addLabelInCard: PropTypes.func.isRequired,
}

export default Labels
