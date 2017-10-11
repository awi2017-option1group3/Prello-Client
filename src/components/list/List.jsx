import React from 'react'
import PropTypes from 'prop-types'
import { Card as UIList } from 'antd' // A graphical card component is used to display a list
import './style.css'

const List = props => (
  <UIList className="list" title={props.title} bordered={false}>Rank : {props.rank} <br /> Cards</UIList>
)

List.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
}

export default List
