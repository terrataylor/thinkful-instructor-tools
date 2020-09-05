import React from "react";
import AttendanceTable from '../Tables/AttendanceTable';
import { CSVLink } from "react-csv";
import { Container, Row, Col } from 'reactstrap';
import ModalForm from '../Modals/Modal';
class Attendance extends React.Component {
    state = {
        students:[],
        attendenceRecord:[],
        chat:""
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.takeAttendance(this.state.chat);
    }

    takeAttendance(chat) {
       let attendanceArray=[];
        console.log(chat);
        chat = chat.toLowerCase();
        for(let i=0;i<this.state.students.length;i++){
            let student =  this.state.students[i];
            let name = `${student.fname.toLowerCase()} ${student.lname.toLowerCase()}`;
            if(name!==""){
                console.log(name);
                if(chat.includes(name)){
                    attendanceArray.push({id:student.id,name:name,present:"x"})
                } else{
                    attendanceArray.push({id:student.id,name:name,present:" "})
                }
            }
        }
        this.setState({attendenceRecord:attendanceArray});
        console.log(attendanceArray);
    }

    addItemToState = (student) => {
        this.setState(prevState => ({
            students: [...prevState.students, student]
        }))
    }


    addToDB = student => {
        fetch('https://instructor-tools-api.herokuapp.com/students', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fName: student.fName,
                lName: student.lName,
                email: student.email,
                asm: student.asm,
                location: student.location,
                slack: student.slack,
                paymentPlan: student.paymentPlan,
                cohort: student.cohort
            })
        }).then(response => response.json())
            .then(item => {
                this.getItems();
            })
            .catch(err => console.log(err))
    }

    getItems() {
        fetch('https://instructor-tools-api.herokuapp.com/students')
            .then(response => response.json())
            .then(students => {
                console.log(students);
                this.setState({ students })
            })
            .catch(err => console.log(err))
    }



    updateState = (student) => {
        console.log(student);
        const itemIndex = this.state.students.findIndex(data => data.id === student.id)
        const newArray = [
            // destructure all items from beginning to the indexed item
            ...this.state.students.slice(0, itemIndex),
            // add the updated item to the array
            student,
            // add the rest of the items to the array from the index after the replaced item
            ...this.state.students.slice(itemIndex + 1)
        ]
        this.setState({ students: newArray })
    }

    deleteItemFromState = (id) => {
        const updatedItems = this.state.students.filter(item => item.id !== id)
        this.setState({ students: updatedItems })
    }


    componentDidMount() {
       this.getItems();
    }

    componentWillUnmount() {

    }



    render() {
        console.log(this.state.attendenceRecord);
        return (
            <Container fluid className="App">
                <Row>
                    <Col>
                        <h2>Attendance</h2>
                        <form>
                            <div className="form-group">
                                <label>Paste Chat Here</label>
                                <textarea className="form-control" id="chat" rows="10" name="chat" onChange={this.handleChange} value={this.state.chat} />
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <button className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Scan Chat</button>
                                </div>
                            </div>
                        </form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1 style={{ margin: "20px 0" }}>Attendance</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <AttendanceTable students={this.state.attendenceRecord} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                      {this.state.attendenceRecord.length>0 &&  <CSVLink
                            filename={"attendance.csv"}
                            color="primary"
                            style={{ float: "left", marginRight: "10px" }}
                            className="btn btn-primary"
                            data={this.state.attendenceRecord}>
                            Download CSV
                      </CSVLink> }
                    </Col>
                </Row>
            </Container>);
    }
}

export default Attendance;
