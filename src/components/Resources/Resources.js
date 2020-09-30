import React from "react";
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Card, CardBody, CardTitle, CardText, CardHeader } from 'reactstrap';
import apiUrl from '../../env';
import "../../../node_modules/video-react/dist/video-react.css"; // import css
import { Player } from 'video-react';
import rubericVideo from '../../resources/view_a_ruberic(admins).mp4';
class Resources extends React.Component {
    state = {
        students: []
    }

    componentDidMount() {
        this.getItems();
    }


    generateYaml(e) {
        e.preventDefault();
        console.log("generating");

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


    render() {
        return (
            <Container>
                <h2>Helpful Instructor Resources</h2>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>Points of Contact</CardHeader>
                            <CardBody>
                                <CardTitle tag='h5'>Careers</CardTitle>
                                <CardText>Emma Holland (@Emma Holland) Synchronous Programs Operations Manager</CardText>
                                <CardTitle tag='h5'>Interviews</CardTitle>
                                <CardText>Derrick Foust (@Derrick Foust) Senior Educator Success Manager</CardText>
                                <CardTitle tag='h5'>TA Staffing</CardTitle>
                                <CardText>Kelly Kawa (@Kelly Kawa) Senior Educator Experience Manager</CardText>
                                <CardTitle tag='h5'>Syllabus Generation</CardTitle>
                                <CardText>Joe Turner (@Joe Turner) Lead Instructor</CardText>
                            </CardBody>
                        </Card>

                    </Col>
                    <Col>
                        <Card>
                            <CardHeader>Useful Links</CardHeader>
                            <CardBody>
                                <CardText>
                                    <div><a target="_blank" href="https://docs.google.com/spreadsheets/d/1SLQIdtcTj6qNUxcZeHdfMe4C7yHqGglxyIxnJ8HjtCU/edit?ts=5ef21b9d#gid=955836459">Student Roster</a></div>
                                    <div><a target="_blank" href="https://ftgen-trigger.herokuapp.com/">Syllabus Generator</a></div>
                                    <div><a target="_blank" href="https://docs.google.com/spreadsheets/d/1p0mXIIIC68RCw4UgXLt3Z-ZsyY2eHM3XRlEqXv6ikX8/edit?ts=5ef21b21#gid=168336559">Cohort Staffing</a></div>
                                    <div><a target="_blank" href="https://thinkful-ed.github.io/ei-cohort-start-checklist/">Cohort Launch Checklist1 (EI)</a></div>
                                    <div><a target="_blank" href="https://docs.google.com/document/d/129sZIHXy6HepYzxIeELAyU59L7RxaUNaqg9OtACYGLc/edit#">Cohort Launch Checklist2 (EI)</a></div>
                                    <div><a target="_blank" href="https://github.com/Thinkful-Ed/ei-shopping-list-solutions">Shopping List Starter Repo (EI)</a></div>
                                    <div><a target="_blank" href="https://thinkful.slides.com/users/sign_in">Slides</a></div>
                                    <div><a target="_blank" href="https://chegg-my.sharepoint.com/:f:/p/tauhida/EgpyabZsgy5Mhz8yuIBwc4IBahNn7lrwA366oyVmQ4NOlQ?e=CeunqK">Student Health Docs</a></div>

                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>Grading Ruberics</CardHeader>
                            <CardBody>
                                <CardTitle tag='h5'>How to View a Ruberic</CardTitle>
                                <CardText>
                                    <Player
                                        playsInline
                                        // poster="/assets/poster.png"
                                        src={rubericVideo}
                                    />
                                </CardText>
                            </CardBody>
                        </Card>

                    </Col>
                    <Col>
                        <Card>
                            <CardHeader>How to Impersonate a Student</CardHeader>
                            <CardBody>
                                <CardTitle tag='h5'>Impersonate a student to see checkpoint submissions</CardTitle>
                                <CardText>(find student email from their dashboard) <p>How to impersonate a student: <a href="https://accounts.thinkful.com/admin/impersonate/student_email">Impersonate</a></p>
                                    <p>Make sure you unimpersonate after you are done
                                    <a href="https://accounts.thinkful.com/admin/unimpersonate">Unimpersonate</a></p>
                                </CardText>
                            </CardBody>
                        </Card>
                      </Col>
                </Row>
            </Container>);
    }
}

export default Resources;
