import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

class AttendanceTable extends Component {

    deleteItem = id => {
        let confirmDelete = window.confirm('Delete item forever?')
        if (confirmDelete) {
            fetch('http://localhost:3000/crud', {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            })
                .then(response => response.json())
                .then(item => {
                    this.props.deleteItemFromState(id)
                })
                .catch(err => console.log(err))
        }

    }

    render() {
        let items = (<tr><td>No Items</td></tr>);
        if (this.props.students.length > 0) {
            items = this.props.students.map(item => {
                return (
                    <tr key={item.id}>
                        <th scope="row">{item.id}</th>
                        <td>{item.name}</td>
                        <td>{item.present}</td>
                    </tr>
                )
            })
        }

        return (
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Present</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </Table>
        )
    }
}

export default AttendanceTable;