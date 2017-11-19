import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Card as UICard, Checkbox, Dropdown, Icon, Menu, Progress, Popconfirm } from 'antd'
import { Grid, Row, Col } from 'react-flexbox-grid'

import EditField from '../../commons/editField/EditField'
import CreateWithName from '../../commons/createWithName/CreateWithName'
import './style.css'

class TaskLists extends Component {
  constructor(props) {
    super(props)
    this.onCheck = this.onCheck.bind(this)
    this.addTask = this.addTask.bind(this)
    this.addTaskList = this.addTaskList.bind(this)
    this.saveTask = this.saveTask.bind(this)
    this.saveTaskList = this.saveTaskList.bind(this)
    this.onCancel = this.onCancel.bind(this)
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

  renderTaskText(task) {
    return (
      <div>
        <EditField
          text={task.done ? (<del>{task.title}</del>) : task.title}
          save={newTaskText => this.props.updateTaskTitle(task.id, newTaskText)}
          hint="No name yet, add one !"
        />
      </div>
    )
  }

  renderTaskDelete(taskListId, taskId, taskTitle) {
    return (
      <Popconfirm
        title={`Do you really want to remove the task ${taskTitle}?`}
        placement="right"
        onConfirm={() => this.props.removeTaskInTaskList(taskId, taskListId)}
        okText="Yes"
        cancelText="No"
      >
        <Button
          size="small"
          icon="close"
        />
      </Popconfirm>
    )
  }

  renderMenu(taskListTitle, taskListId) {
    return (
      <Menu>
        <Menu.Item>
          <Popconfirm
            title={`Do you really want to delete the tasks list named ${taskListTitle} ?`}
            placement="right"
            onConfirm={() => this.props.removeTaskListInCard(this.props.cardId, taskListId)}
            okText="Yes"
            cancelText="No"
          >
            <a><Icon type="delete" /> Delete</a>
          </Popconfirm>
        </Menu.Item>
      </Menu>
    )
  }

  renderDropdown(taskListTitle, taskListId) {
    return (
      <Dropdown overlay={this.renderMenu(taskListTitle, taskListId)}>
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
        <div className="tasklistsCompleted">
          {this.renderTaskListsCompleted()}
        </div>
        <Grid fluid>
          <Row>
            {tasklists.map(tasklist =>
              (
                <Col xs={12} sm={6} md={4} lg={3} key={tasklist.id}>
                  <UICard
                    className="tasklist"
                    title={this.renderHeader(tasklist.title, tasklist.id)}
                    extra={this.renderDropdown(tasklist.title, tasklist.id)}
                    key={`tasklist-${tasklist.id}`}
                  >
                    { typeof tasklist.tasks !== 'undefined' && tasklist.tasks.length > 0 ?
                      (
                        tasklist.tasks.map(task =>
                          (
                            <div key={`tasklist-${tasklist.id}-task-${task.id}`} className="taskInTasklist">
                              <div>
                                <Checkbox
                                  onChange={this.onCheck}
                                  checked={task.done}
                                  key={`task-${task.id}`}
                                  value={task.id}
                                  label={task.title}
                                />
                              </div>
                              {this.renderTaskText(task)}
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
                          size="small"
                        >Add task</Button>)}
                    </div>
                  </UICard>
                </Col>
              ))}
          </Row>
        </Grid>

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
              size="small"
              type="dashed"
            >Add task list</Button>)}
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
