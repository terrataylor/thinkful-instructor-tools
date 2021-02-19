import React from "react";
import AttendanceTable from '../Tables/AttendanceTable';
import { CSVLink } from "react-csv";
import { Container, Row, Col} from 'reactstrap';
import apiUrl from '../../env';
//import * as moment from 'moment';
class Attendance extends React.Component {
    state = {
        students: [],
        attendenceRecord: [],
        chat: "",
        absences:[]
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.takeAttendance(this.state.chat);
    }

    takeAttendance(chat) {
        let attendanceArray = [];
        console.log(chat);
        chat = chat.toLowerCase();
        let notificationArr = [];
        this.state.students.sort(function (a, b) {
            return a.fname - b.fname;
        });
        for (let i = 0; i < this.state.students.length; i++) {
            let student = this.state.students[i];
             let fname = student.fname.toLowerCase();
             let lname = student.lname.toLowerCase();
             let name = `${fname} ${lname}`;
           let preferredname= student.preferredname !== undefined ? student.preferredname :"";
           let attendance = this.compareToChat(chat,name,preferredname)
            if (name !== "") {
                if (attendance) {
                    attendanceArray.push({ id: student.id, name: name, present: "x" })
                } else {
                    attendanceArray.push({ id: student.id, name: name, present: " " });
                    notificationArr.push(student);
                }
            }
        }
        this.setState({ attendenceRecord: attendanceArray,absences:notificationArr });
    }

    compareToChat=(chat,...studentNames)=>{
        let chatlines = chat.split('\n');
        let nameFound = false;
        chatlines.forEach(line=>{
            for(let i=0; i<studentNames.length; i++){
                
             if(studentNames[i]){
                let studentName = studentNames[i].trim();
                if(line.includes(studentName)){
                   nameFound= true;
                }
            }
            }

        })
       return nameFound;
    }

    addItemToState = (student) => {
        this.setState(prevState => ({
            students: [...prevState.students, student]
        }))
    }

    generateNotifications = (students)=>{
        console.log(students)
    }

    addToDB = student => {
        fetch(apiUrl, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fname: student.fname,
                lname: student.lname,
                email: student.email,
                asm: student.asm,
                location: student.location,
                slack: student.slack,
                paymentplan: student.paymentplan,
                cohort: student.cohort
            })
        }).then(response => response.json())
            .then(item => {
                this.getItems();
            })
            .catch(err => console.log(err))
    }

    getItems() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(students => {
                students.sort((a, b)=> {
                    let fa = a.fname.toLowerCase(),
                    fb = b.fname.toLowerCase();
            
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
                });
               // console.log(students)
                this.setState({ students })
            })
            .catch(err => console.log(err))
    }



    updateState = (student) => {
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
        let absences = '';
        let students='';
        if (this.state.absences.length > 0) {
            absences = this.state.absences.map((item,idx) => {
              //  console.log(item)
                let staffStatement = `@${item.asm} ${item.fname} ${item.lname} was absent from session today. I have asked them to submit an absence request.`;
                return (
                   <div key={idx}>{staffStatement}</div>
                )
            })
            students = this.state.absences.map((item,idx) => {
              //  console.log(item)
                let studentStatement = `${item.slack} Please submit an absence request for today's session. http://bit.ly/AbsenceRequests`;
                return (
                   <div key={idx}>{studentStatement}</div>
                )
            })
        }
        
        return (
            <Container className="App">
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
                        <h5 style={{ margin: "20px 0" }}>Absence Notifications</h5>
                        <div><strong>For Staff Slack Channel</strong></div>
                        {absences}
                        <div><strong>For Student Slack Channel</strong></div>
                        {students}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h5 style={{ margin: "20px 0" }}>Attendance</h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <AttendanceTable students={this.state.attendenceRecord} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.state.attendenceRecord.length > 0 && <CSVLink
                            filename={"attendance.csv"}
                            color="primary"
                            style={{ float: "left", marginRight: "10px" }}
                            className="btn btn-primary"
                            data={this.state.attendenceRecord}>
                            Download CSV
                      </CSVLink>}
                    </Col>
                </Row>
            </Container>);
    }
}

export default Attendance;
