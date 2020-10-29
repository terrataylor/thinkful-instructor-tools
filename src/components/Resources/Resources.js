import React from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, CardHeader } from 'reactstrap';
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
                                <CardTitle tag='h5'>Careers/Mentors/ASMs/Student's who can't put in a ticket</CardTitle>
                                <CardText>Emma Holland (@Emma Holland) Synchronous Programs Operations Manager</CardText>
                                <CardTitle tag='h5'>Interviews & TA Staffing</CardTitle>
                                <CardText>Derrick Foust (@Derrick Foust) Senior Educator Success Manager</CardText>
                                <CardTitle tag='h5'>Syllabus Generation</CardTitle>
                                <CardText>Joe Turner (@Joe Turner) Lead Instructor</CardText>
                                <CardTitle tag='h5'>Curriculum updates</CardTitle>
                                <CardText>Rush Cosgrove & Daphne Isom</CardText>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>Curriculum Writing Resources</CardHeader>
                            <CardBody>
                                <p><a target="_blank" rel="noopener noreferrer" href="https://www.loom.com/share/16d0e8700eb346509ef79ea95a0ef7e0">How to begin your review</a></p>
                                <p><a target="_blank" rel="noopener noreferrer" href="https://www.loom.com/share/6e309058a8354c50b758905df94d768e">How to submit a review via PR or issue</a></p>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <CardHeader>Useful Links</CardHeader>
                            <CardBody>
                                <CardText>
                                    <p><a target="_blank" rel="noopener noreferrer" href="https://app.asana.com/">Asana (Keep track of Todos)</a></p>
                                    <p><a target="_blank" rel="noopener noreferrer" href="https://chegg-portal1.sharepoint.com/default.aspx">Chegg Company Calendar</a></p>
                                    <p><a target="_blank" rel="noopener noreferrer" href="https://thinkful-ed.github.io/ei-cohort-start-checklist/">Cohort Launch Checklist1 (EI)</a></p>
                                    <p><a target="_blank" rel="noopener noreferrer" href="https://docs.google.com/document/d/129sZIHXy6HepYzxIeELAyU59L7RxaUNaqg9OtACYGLc/edit#">Cohort Launch Checklist2 (EI)</a></p>
                                    <p><a target="_blank" rel="noopener noreferrer" href="https://docs.google.com/spreadsheets/d/1p0mXIIIC68RCw4UgXLt3Z-ZsyY2eHM3XRlEqXv6ikX8/edit?ts=5ef21b21#gid=168336559">Cohort Staffing</a></p>
                                    <p><a target="_blank" rel="noopener noreferrer" href="https://github.com/Thinkful-Ed/full_time_career_path">Thinkful Github (Yamls, Syllabi & Master Syllabi)</a></p>
                                    <p><a target="_blank" rel="noopener noreferrer" href="https://chegg.sharepoint.com/sites/GOComm/Shared%20Documents/Forms/AllItems.aspx?originalPath=aHR0cHM6Ly9jaGVnZy5zaGFyZXBvaW50LmNvbS86Zjovcy9HT0NvbW0vRWxIa3hpdmJUODFObUV5OWo4RTVidmdCTnNTWENOX09Lcms4ZTFOLWFJOHEwZz9ydGltZT1vWFFQWHRsRjJFZw&id=%2Fsites%2FGOComm%2FShared%20Documents%2FThinkful%20Accessible%20Comms%2FZoom%20Webinar%20Documentations%2FZoomWebinars-CreatingZoomWebinars%2Epdf&parent=%2Fsites%2FGOComm%2FShared%20Documents%2FThinkful%20Accessible%20Comms%2FZoom%20Webinar%20Documentations">How to Create a Zoom Webinar</a></p>
                                    <p><a target="_blank" rel="noopener noreferrer" href="https://lark.thinkful.com/students/">Lark (see student dashboards/enrollment status)</a></p>
                                    <p><a target="_blank" rel="noopener noreferrer" href="https://docs.google.com/spreadsheets/d/1_4sUKlpGaqynWpVW-DTE97RocVj2N0fmqWThkH_rT_s/edit#gid=0">Instructor Peer Review Sheet</a></p>
                                    <p><a target="_blank" rel="noopener noreferrer" href="https://docs.google.com/document/d/1I3qjTxLL1ONiK6v-ZAAOYScLLIDiTdRohY0wbpyglWw/edit#heading=h.xqnu31mn5s8b">Instructor Peer Review Instructions</a></p>
                                    <p><a target="_blank" rel="noopener noreferrer" href="https://chegg-my.sharepoint.com/:x:/p/emma/EVfx_RaoHJ5Gh0bqFEfogOMBd3G7MwjOeqfg-s0GxUt2qQ?e=QS567v">Student Roster</a></p>
                                    <p><a target="_blank" rel="noopener noreferrer" href="https://github.com/Thinkful-Ed/ei-shopping-list-solutions">Shopping List Starter Repo (EI)</a></p>
                                    <p><a target="_blank" rel="noopener noreferrer" href="https://thinkful.slides.com/users/sign_in">Slides</a></p>
                                    <p><a target="_blank" rel="noopener noreferrer" href="https://chegg-my.sharepoint.com/:f:/p/tauhida/EgpyabZsgy5Mhz8yuIBwc4IBahNn7lrwA366oyVmQ4NOlQ?e=CeunqK">Student Health Docs</a></p>
                                    <p><a target="_blank" rel="noopener noreferrer" href="https://lark.thinkful.com/courses/43/tickets/">Student Tickets (EI)</a></p>
                                    <p><a target="_blank" rel="noopener noreferrer" href="https://ftgen-trigger.herokuapp.com/">Syllabus Generator</a></p>
                                    <p><a target="_blank" rel="noopener noreferrer" href="https://dashboard.thinkful.com/">Thinkful Courses Dashboard (Information about courses, modules, grading ruberics and checkpoints)</a></p>
                                    <p><a target="_blank" rel="noopener noreferrer" href="https://chegg.atlassian.net/wiki/spaces/TFPED/pages/386075112/CMS+Content+Reader">Thinkful PED</a></p>
                                    <p><a target="_blank" rel="noopener noreferrer" href="https://github.com/Thinkful-Ed/ei-sample-bookmarks-app">Thinkful Bookmarks App</a></p>


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

                                <Player
                                    playsInline
                                    // poster="/assets/poster.png"
                                    src={rubericVideo}
                                />

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
                                    <a href="https://accounts.thinkful.com/admin/unimpersonate"> Unimpersonate</a></p>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>);
    }
}

export default Resources;
