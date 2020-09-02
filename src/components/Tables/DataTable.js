import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

class DataTable extends Component {

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
                        <td>{item.fName}</td>
                        <td>{item.lName}</td>
                        <td>{item.email}</td>
                        <td>{item.asm}</td>
                        <td>{item.location}</td>
                        <td>{item.slack}</td>
                        <td>{item.paymentPlan}</td>
                        <td>{item.cohort}</td>
                        <td>
                            <div style={{ width: "110px" }}>
                                <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState} />
                                {' '}
                                <Button color="danger" onClick={() => this.deleteItem(item.id)}>Del</Button>
                            </div>
                        </td>
                    </tr>
                )
            })
        }

        return (
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First</th>
                        <th>Last</th>
                        <th>Email</th>
                        <th>ASM</th>
                        <th>Location</th>
                        <th>Slack</th>
                        <th>Payment Type</th>
                        <th>Cohort</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </Table>
        )
    }
}

export default DataTable