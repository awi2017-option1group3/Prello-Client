import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Card as UICard, Checkbox, Dropdown, Icon, Menu, Modal } from 'antd'
import './style.css'
import EditField from '../../commons/editField/EditField'


class TaskLists extends Component {

  constructor(props) {
    super(props)
    this.onCheck = this.onCheck.bind(this)
  }

  onCheck(e) {
    this.props.updateTaskDone(e.target.value, e.target.checked)
  }


  /* {tasklist.tasks.map(task =>
              (
                <Checkbox
                  onChange={this.onCheck}
                  checked={task.done}
                  key={task.id}
                >
                  {task.title}
                </Checkbox>
              ),
            )}

            <CheckboxGroup
                  options={
                    tasklist.tasks.map(task => Object.assign({},
                      { label: task.title,
                        value: task.id,
                        selected: task.done,
                        key: `checkbox-${task.id}`,
                      }),
                    )
                  }
                  onChange={this.onCheck}
                />
  */

  renderHeader(taskListTitle, taskListId) {
    console.log('renderHeader')
    console.log(taskListTitle)
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

  render() {
    // debugger
    const tasklists = this.props.cardTaskLists
    console.log('RENDER')
    console.log(tasklists)
    return (
      <div>
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
                    <Checkbox
                      onChange={this.onCheck}
                      checked={task.done}
                      key={`task-${task.id}`}
                      value={task.id}
                      label={task.title}
                    >
                      {task.title}
                    </Checkbox>
                  ),
                )
              ) :
              (null)
            }
          </UICard>
          ))}
      </div>
    )
  }
}

TaskLists.propTypes = {
  cardId: PropTypes.string.isRequired,
  cardTaskLists: PropTypes.array.isRequired,
  removeTaskListInCard: PropTypes.func.isRequired,
  updateTaskDone: PropTypes.func.isRequired,
  updateTaskListTitle: PropTypes.func.isRequired,
}

export default TaskLists
