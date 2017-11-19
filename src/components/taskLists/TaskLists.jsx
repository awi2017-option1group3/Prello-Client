import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Card as UICard, Checkbox, Dropdown, Icon, Menu, Modal, Progress } from 'antd'
import './style.css'
import EditField from '../../commons/editField/EditField'
import CreateWithName from '../../commons/createWithName/CreateWithName'


class TaskLists extends Component {
  constructor(props) {
    super(props)
    this.onCheck = this.onCheck.bind(this)
    this.addTask = this.addTask.bind(this)
    this.addTaskList = this.addTaskList.bind(this)
    this.saveTask = this.saveTask.bind(this)
    this.saveTaskList = this.saveTaskList.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.renderTaskDelete = this.renderTaskDelete.bind(this)
    this.state = {
      addingTaskList: false,
      addingTask: false,
      title: '',
    }
  }

  onCheck(e) {
    this.props.updateTaskDone(e.target.value, e.target.checked)
  }

  onCancel() {
    this.setState({
      addingTaskList: false,
      addingTask: false,
    })
  }

  addTask(taskListId) {
    return (
      <div>
        <CreateWithName
          title="New Task"
          save={(newTitle) => {
            this.saveTask(taskListId, newTitle)
          }}
          cancel={this.onCancel}
        />
      </div>
    )
  }

  addTaskList(cardId) {
    return (
      <div>
        <CreateWithName
          title="New TaskList"
          save={(newTitle) => {
            this.saveTaskList(cardId, newTitle)
          }}
          cancel={this.onCancel}
        />
      </div>
    )
  }

  saveTask(taskListId, newTitle) {
    this.setState({
      addingTask: false,
      title: newTitle,
    })
    this.props.addTaskInTaskList(taskListId, newTitle)
  }

  saveTaskList(cardId, newTitle) {
    this.setState({
      addingTaskList: false,
      title: newTitle,
    })
    this.props.addTaskListInCard(cardId, newTitle)
  }

  deleteTask(taskListId, taskId, taskTitle) {
    return (
      <Modal
        title={'Delete'}
        message={`Are you sure to delete the task named : ${taskTitle} ?`}
        okText={'Delete'}
        cancelText={'Cancel'}
        handleOk={() => this.props.removeTaskInTaskList(taskId, taskListId)}
      />
    )
  }

  renderHeader(taskListTitle, taskListId) {
    return (
      <div className="taskListHeader">
        <EditField
          text={taskListTitle}
          save={() => this.props.updateTaskListTitle(taskListId, taskListTitle)}
          hint="No name yet, add one !"
        />
      </div>
    )
  }

  renderTaskText(taskId, taskText) {
    return (
      <div className="taskText">
        <EditField
          text={taskText}
          save={newTaskText => this.props.updateTaskTitle(taskId, newTaskText)}
          hint="No name yet, add one !"
        />
      </div>
    )
  }

  renderTaskDelete(taskListId, taskId, taskTitle) {
    return (
      <Button
        type="primary"
        icon="close"
        onClick={() => this.deleteTask(taskListId, taskId, taskTitle)}
      />
    )
  }


  renderMenu(taskListTitle, taskListId) {
    return (
      <Menu>
        <Menu.Item>
          <Modal
            title={'Delete'}
            message={`Are you sure to delete this taskList named : ${taskListTitle} ?`}
            okText={'Delete'}
            cancelText={'Cancel'}
            handleOk={() => this.props.removeTaskListInCard(taskListId)}
          />
        </Menu.Item>
      </Menu>
    )
  }

  renderDropdown() {
    return (
      <Dropdown overlay={this.renderMenu()}>
        <Button shape="circle">
          <Icon type="ellipsis" />
        </Button>
      </Dropdown>
    )
  }

  renderTaskListsCompleted() {
    if (this.props.cardTaskLists.length > 0) {
      const total = this.props.cardTaskLists
        .map(taskList => taskList.tasks.length)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      const done = this.props.cardTaskLists
        .map(taskList => taskList.tasks
          .map(task => (task.done ? 1 : 0))
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
        )
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      return (
        <Progress percent={Math.trunc((done / total) * 100)} />
      )
    }
    return (null)
  }

  render() {
    const tasklists = this.props.cardTaskLists
    return (
      <div>
        <div>
          {this.renderTaskListsCompleted()}
        </div>
        {tasklists.map(tasklist =>
          (<UICard
            title={this.renderHeader(tasklist.title, tasklist.id)}
            extra={this.renderDropdown()}
            className="tasklist"
            key={`tasklist-${tasklist.id}`}
          >
            { typeof tasklist.tasks !== 'undefined'
              && tasklist.tasks.length > 0 ?
              (
                tasklist.tasks.map(task =>
                  (
                    <div>
                      <Checkbox
                        onChange={this.onCheck}
                        checked={task.done}
                        key={`task-${task.id}`}
                        value={task.id}
                        label={task.title}
                      />
                      {this.renderTaskText(task.id, task.title)}
                      {this.renderTaskDelete(task.taskListId, task.id, task.title)}
                    </div>
                  ),
                )
              ) :
              (null)
            }
            <div className="addTaskBlock">
              {this.state.addingTask ? (
                this.addTask(tasklist.id)
              ) : (
                <Button
                  className="addTaskButton"
                  onClick={() => this.setState({
                    addingTask: true,
                  })}
                  icon="plus"
                  size="large"
                  type="primary"
                >New Task</Button>)}
            </div>
          </UICard>
          ))}
        <div className="addTaskListBlock">
          {this.state.addingTaskList ? (
            this.addTaskList(this.props.cardId)
          ) : (
            <Button
              className="addTaskListButton"
              onClick={() => this.setState({
                addingTaskList: true,
              })}
              icon="plus"
              size="large"
              type="primary"
            >New TaskList</Button>)}
        </div>
      </div>
    )
  }
}

TaskLists.propTypes = {
  cardId: PropTypes.string.isRequired,
  cardTaskLists: PropTypes.array.isRequired,
  removeTaskListInCard: PropTypes.func.isRequired,
  removeTaskInTaskList: PropTypes.func.isRequired,
  addTaskListInCard: PropTypes.func.isRequired,
  addTaskInTaskList: PropTypes.func.isRequired,
  updateTaskDone: PropTypes.func.isRequired,
  updateTaskListTitle: PropTypes.func.isRequired,
  updateTaskTitle: PropTypes.func.isRequired,
}

export default TaskLists
