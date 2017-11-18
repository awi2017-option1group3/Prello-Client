import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TaskLists from '../../components/taskLists/TaskLists'
import { getAllTasksListsInCard, addTaskListInCard, removeTaskListInCard,
  addTaskInTaskList, removeTaskInTaskList,
  updateTaskListTitle, updateTaskDone, updateTaskTitle } from './actions'


class TaskListsContainer extends Component {
  componentWillMount() {
    this.props.getAllTasksListsInCard(this.props.cardId)
  }

  render() {
    return (
      <TaskLists {...this.props} />
    )
  }
}

TaskListsContainer.propTypes = {
  cardId: PropTypes.string.isRequired,
  getAllTasksListsInCard: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  cardTaskLists: state.cardTasks.data,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllTasksListsInCard,
  addTaskListInCard,
  removeTaskListInCard,
  addTaskInTaskList,
  removeTaskInTaskList,
  updateTaskListTitle,
  updateTaskDone,
  updateTaskTitle,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskListsContainer)
