import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import './style.css'

const Option = Select.Option

class ResponsibleSelect extends Component {
  constructor(props) {
    super(props)
    this.handleChangeResponsible = this.handleChangeResponsible.bind(this)
    this.state = {
      placeholder: 'Choose responsible...',
    }
  }



  handleChangeResponsible(value) {
    const memberId = value.substring(this.props.cardId.length)
    if (this.props.cardResponsible !== null && typeof this.props.cardResponsible.id !== 'undefined' && this.props.cardResponsible.id === memberId) {
      this.props.removeResponsibleFromCard(this.props.cardId)
    } else {
      this.props.addResponsibleToCard(this.props.cardId, memberId)
    }
    this.setState({
      placeholder: 'Choose responsible...'
    })
  }

  render() {
    return (
      <Select
        className="cardResponsible"
        placeholder={this.state.placeholder}
        onChange={this.handleChangeResponsible}
        tokenSeparators={[',']}
      >
        { this.props.allUsers.map(user => <Option key={this.props.cardId + user.id}>{ user.fullName }</Option>) }
      </Select>
    )
  }
}

ResponsibleSelect.propTypes = {
  cardId: PropTypes.string.isRequired,
  allUsers: PropTypes.array.isRequired,
  cardResponsible: PropTypes.object.isRequired,
  addResponsibleToCard: PropTypes.func.isRequired,
  removeResponsibleFromCard: PropTypes.func.isRequired,
}

export default ResponsibleSelect
