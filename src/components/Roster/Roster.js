import React from "react";
import { Container, Row, Col } from 'reactstrap';
import ModalForm from '../Modals/Modal';
import DataTable from '../Tables/DataTable';
import { CSVLink } from "react-csv";

class Roster extends React.Component {

    state = {
        students: [],
        studentList: '',
        cohort: '',
        orgname: ''
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.parseStudents(this.state.studentList);
    }

    parseStudents(students) {
        let studentsArr = students.replace(/\t/g, ",").split("\n");
        console.log(studentsArr);
        for (let i = 0; i < studentsArr.length; i++) {
            let arr = studentsArr[i].split(",");
            if(!arr[6]){
                console.log(arr,i);
            }
            let state = arr[6].replace(/;not started;/g, "");
            console.log(state);
            let studentObj = 
            {
                fname: arr[0],
                lname: arr[1],
                email: arr[2],
                asm: arr[3],
                location: `${arr[5]},${state}`,
                paymentplan: arr[8],
                slack: arr[10],
                cohort: this.state.cohort,
                githuborg: this.state.orgname
            };
            console.log(arr);
            this.addToDB(studentObj);
        }
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
            fname: student.fname,
            lname: student.lname,
            email: student.email,
            asm: student.asm,
            location: student.location,
            slack: student.slack,
            paymentplan: student.paymentplan,
            cohort: student.cohort,
            githuborg: student.githuborg
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
                //console.log(students);
                students.sort(function(a, b) { 
                    return a.id - b.id ;
                  });
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

    deleteAllStudents = () => {
        let confirmDelete = window.confirm('Delete all Students?')
        if (confirmDelete) {
            fetch('https://instructor-tools-api.herokuapp.com/', {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(item => {
                    this.getItems();
                })
                .catch(err => console.log(err))
        }
    }

        componentDidMount() {
            this.getItems();
        }

        componentWillUnmount() {

        }


        render() {
            return (
                <Container fluid className="App">
                    <Row>
                        <Col>
                            <h2>Roster</h2>
                        <form>
                                <div className="form-group">
                                    <label>Github Organization Name</label>
                                    <input type="text" className="form-control" id="orgname" name="orgname" placeholder="thinkful-ei-animal" onChange={this.handleChange} value={this.state.orgname} required/>
                                </div>
                                <div className="form-group">
                                    <label>Cohort Number</label>
                                    <input type="number" className="form-control" id="cohort" name="cohort" placeholder="45" onChange={this.handleChange} value={this.state.cohort} required />
                                </div>
                                <div className="form-group">
                                    <label>Paste Student List Here</label>
                                    <textarea className="form-control" id="studentList" rows="10" name="studentList" onChange={this.handleChange} value={this.state.studentList} />
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-10">
                                        <button className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Load Students</button>
                                    </div>
                                </div>
                            </form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1 style={{ margin: "20px 0" }}>Student Roster</h1>
                        </Col>
                        <Col><button className="btn btn-danger" onClick={this.deleteAllStudents.bind(this)}>Clear All</button></Col>
                    </Row>
                    <Row>
                        <Col>
                            <DataTable students={this.state.students} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {this.state.students.length>0 && <CSVLink
                                filename={"db.csv"}
                                color="primary"
                                style={{ float: "left", marginRight: "10px" }}
                                className="btn btn-primary"
                                data={this.state.students}>
                                Download CSV
                        </CSVLink>}
                            <ModalForm buttonLabel="Add Item" addItemToState={this.addItemToState} />
                        </Col>
                    </Row>
                </Container>

            );
        }
    }

    export default Roster;
