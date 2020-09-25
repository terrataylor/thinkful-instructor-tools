import React from "react";
import { Row, Col,Container, Button, Form, TextArea, FormGroup, Label, Input } from 'reactstrap';
import apiUrl from '../../env';
class YamlGenerator extends React.Component {
    state = {
        students: []
    }

    componentDidMount() {
        this.getItems();
    }

    componentWillUnmount() {

    }

    generateYaml(e) {
        e.preventDefault();
        console.log("generating");
       /* for (let i = 0; i < nameList.length; i++) {
            let name = nameList[i].split(" ");
            if (name !== "") {
                let firstName = name[0];
                console.log(name, name[1]);
                let lastInitial = name[1].charAt(0).toUpperCase();
                console.log(this.checkIfDups(firstName, nameList))
                if (this.checkIfDups(firstName, nameList)) {
                    input[i] = `  - name: ${nameList[i]}\n   shortName: ${firstName}${lastInitial}\n`;
                } else {
                    input[i] = `  - name: ${nameList[i]}\n`;
                }
            }
        }*/
    }

    getItems() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(students => {
                console.log(students);
                this.setState({ students })
            })
            .catch(err => console.log(err))
    }

    checkIfDups(firstName, list) {

    }

    render() {
        return (
            <Container>
                <h2>YamlGenerator</h2>
                <Form onSubmit={this.generateYaml}>
                    <FormGroup>
                        <Label for="courseCode">Course Code</Label>
                        <select id="courseCode" class="form-control">
                            <option value="dev-301">dev-301</option>
                            <option value="data-301">data-301</option>
                            <option value="data_analytics-301">data_analytics-301</option>
                            <option value="digital_marketing-301">digital_marketing-301</option>
                            <option value="project_marketing-301">project_marketing-301</option>
                            <option value="ux-301">ux-301</option>
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <Label for="cohortNum">Cohort Number</Label>
                        <Input type="text" name="cohortNum" id="cohortNum" onChange={this.onChange} value={this.state.cohortNum === null ? '' : this.state.cohortNum} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="startDate">Start Date</Label>
                        <Input type="date" name="startDate" id="startDate" onChange={this.onChange} value={this.state.startDate === null ? '' : this.state.stateDate} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="workshopUrl">Workshop URL</Label>
                        <Input type="url" name="workshopUrl" id="workshopUrl" onChange={this.onChange} value={this.state.workshopUrl === null ? '' : this.state.workshopUrl} />
                    </FormGroup>
                    <FormGroup>
                    <Label for="timezone">Time Zone</Label>
                        <select id="timezone" class="form-control">
                            <option value="PST">PST</option>
                            <option value="MST">MST</option>
                            <option value="CST">CST</option>
                            <option value="EST">EST</option>
                        </select>
                        </FormGroup>
                        <FormGroup>
                        <Label for="breakWeeks">BreakWeeks</Label>
                        <Row>
                            <Col><Input type="text" name="cohortNum" id="cohortNum" onChange={this.onChange} value={this.state.cohortNum === null ? '' : this.state.cohortNum} />
                        </Col>
                            <Col><Input type="text" name="cohortNum" id="cohortNum" onChange={this.onChange} value={this.state.cohortNum === null ? '' : this.state.cohortNum} /></Col>
                        </Row>
                    </FormGroup>
                    
                    <FormGroup>
                        <Label for="studentList">Student List</Label>
                        <textarea class="form-control" type="text" name="studentList" id="studentList" onChange={this.onChange} value={this.state.cohortNum === null ? '' : this.state.cohortNum} />
                    </FormGroup>
                    
                    <Button>Submit</Button>
                </Form>

            </Container>);
    }
}

export default YamlGenerator;
