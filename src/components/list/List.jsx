import React from 'react'
import PropTypes from 'prop-types'
import { Card as UIList } from 'antd' // A graphical card component is used to display a list
import CardsContainer from '../../containers/cards/CardsContainer'
import './style.css'

const List = props => (
  <UIList className="list" title={props.title} bordered={false}>
    <CardsContainer listId={props.id} />
  </UIList>
)

List.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default List
