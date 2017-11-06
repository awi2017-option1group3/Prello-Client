import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'

class Users extends Component {

  columns = [{
    title: 'Initials',
    dataIndex: 'initials',
    key: 'initials',
  }, {
    title: 'Fullname',
    dataIndex: 'fullName',
    key: 'fullName',
  }]



  render() {
    return (
      <div>
        <Table dataSource={this.props.users} columns={this.columns} />
      </div>
    )
  }
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  getOneUser: PropTypes.func.isRequired,
}

export default Users
