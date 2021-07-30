import React from "react";
import {
  Row,
  Col,
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import apiUrl from "../../env";
import avoidExample from "../../resources/avoid-example.png";
class YamlGenerator extends React.Component {
  state = {
    students: [],
    courseCode: "dev-301",
    cohortNum: 46,
    startDate: "",
    workshopUrl: "https://rebrand.ly/ei46workshop",
    timeZone: "EST",
    breakWeek1: 6,
    breakWeek2: 11,
    studentList: ` `,
    rewriteInputPath: true,
    slackHandles: "",
    organization:''
  };

  componentDidMount() {
    this.getItems();
  }
  getItems() {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((students) => {
        let slackHandles = students.map((student) => student.slack);
        this.setState({ slackHandles: slackHandles.join(" ") });
        /*  students.sort(function(a, b) { 
                    return a.id - b.id ;
                  });
                this.setState({ students })*/
      })
      .catch((err) => console.log(err));
  }

  componentWillUnmount() {}
  onChange = (e) => {
    console.log(e);
    if (e.target.name === "rewriteInputPath") {
      this.setState({ [e.target.name]: e.target.checked });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  generateYaml = (e) => {
    console.log(this.state.startDate);
    e.preventDefault();
    let students = this.state.studentList
      .trim()
      .replace("	", " ")
      .split("\n")
      .sort();
    var nameList = students.map(function (item) {
      return item.trim();
    });
    let output = [];
    for (let i = 0; i < nameList.length; i++) {
      let name = nameList[i].split("	");
      console.log(nameList[i], name, name.length);
      if (name.length === 1) {
        name = name[0].split(" ");
      }
      if (name.length > 1) {
        let firstName = name[0];
        let lastName = name[1];
        let lastInitial = lastName[0];
        if (this.checkIfDups(firstName, nameList)) {
          output[
            i
          ] = `  - name: ${firstName} ${lastName}\n     shortName: ${firstName}${lastInitial}\n`;
        } else {
          output[i] = `  - name: ${firstName} ${lastName}\n`;
        }
      }
    }
    console.log(output);
    this.setState({ students: output });
  };

  checkIfDups(firstName, list) {
    let counter = 0;
    console.log(firstName, list);
    if (list) {
      for (let i = 0; i < list.length; i++) {
        let fname = list[i];
        if (fname.includes(firstName)) {
          counter++;
        }
      }
    }
    return counter > 1;
  }

  render() {
    return (
      <Container>
        <h2>YamlGenerator</h2>
        <Form onSubmit={this.generateYaml}>
          <FormGroup>
            <Label for="courseCode">Course Code</Label>
            <select
              id="courseCode"
              className="form-control"
              onChange={this.onChange}
              defaultValue="dev-301"
            >
              <option value="dev-301">dev-301</option>
              <option value="data-301">data-301</option>
              <option value="data_analytics-301">data_analytics-301</option>
              <option value="digital_marketing-301">
                digital_marketing-301
              </option>
              <option value="project_marketing-301">
                project_marketing-301
              </option>
              <option value="ux-301">ux-301</option>
            </select>
          </FormGroup>
          <FormGroup>
            <Label for="cohortNum">Cohort Number</Label>
            <Input
              type="text"
              name="cohortNum"
              id="cohortNum"
              onChange={this.onChange}
              defaultValue="46"
            />
          </FormGroup>
          <FormGroup>
            <Label for="organization">Organization</Label>
            <Input
              type="text"
              name="organization"
              id="organization"
              onChange={this.onChange}
              defaultValue="monkeys"
            />
          </FormGroup>
          <FormGroup>
            <Label for="startDate">Start Date</Label>
            <Input
              type="date"
              name="startDate"
              id="startDate"
              onChange={this.onChange}
              value={this.state.startDate}
            />
          </FormGroup>
          <FormGroup>
            <Label for="workshopUrl">Workshop URL</Label>
            <Input
              type="url"
              name="workshopUrl"
              id="workshopUrl"
              onChange={this.onChange}
              value={this.state.workshopUrl}
            />
          </FormGroup>
          <FormGroup>
            <Label for="timezone">Time Zone</Label>
            <select
              id="timezone"
              name="timezone"
              className="form-control"
              onChange={this.onChange}
              value={this.state.timeZone}
            >
              <option value="PST">PST</option>
              <option value="MST">MST</option>
              <option value="CST">CST</option>
              <option value="EST">EST</option>
            </select>
          </FormGroup>
          <FormGroup>
            <Label for="breakWeeks">BreakWeeks</Label>
            <Row>
              <Col md="2">
                <Input
                  type="text"
                  name="breakWeek1"
                  id="breakWeek1"
                  onChange={this.onChange}
                  value={
                    this.state.breakWeek1 === null ? "" : this.state.breakWeek1
                  }
                />
              </Col>
              <Col md="2">
                <Input
                  type="text"
                  name="breakWeek2"
                  id="breakWeek2"
                  onChange={this.onChange}
                  value={
                    this.state.breakWeek2 === null ? "" : this.state.breakWeek2
                  }
                />
              </Col>
            </Row>
          </FormGroup>

          <FormGroup>
            <Label for="studentList">Student List</Label>
            <textarea
              className="form-control"
              type="text"
              name="studentList"
              id="studentList"
              onChange={this.onChange}
              value={
                this.state.studentList === null ? "" : this.state.studentList
              }
            />
          </FormGroup>
          <FormGroup>
            <Label>Flags</Label>
            <Row>
              <Col md="4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rewriteInputPath"
                    name="rewriteInputPath"
                    onChange={this.onChange}
                    value={this.state.rewriteInputPath}
                  />
                  <Label className="form-check-label" for="rewriteInputPath">
                    rewriteInputPath
                  </Label>
                </div>
              </Col>
            </Row>
          </FormGroup>
          <Button>Submit</Button>
        </Form>

        <Row>
          <Col>
            <div className="yaml">
              <div>courseCode: {this.state.courseCode}</div>
              <div>cohortNumber: {this.state.cohortNum}</div>
              <div>
                students:{" "}
                <div className="students-yaml">{this.state.students}</div>
              </div>
              <div></div>
              {/*this.state.rewriteInputPath === true && (
                <div>
                  flags:
                  <div>&nbsp;&nbsp;rewriteInputPath:</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;from: master-syllabus</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;to: master-syllabus-groups</div>
                </div>
              )*/}
              <div>oddStudent: solo</div>
              <div>startDate: {this.state.startDate}</div>
              <div>workshopUrl: {this.state.workshopUrl}</div>
              <div>timezone: ET</div>
              <div>breakWeeks:</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;- {this.state.breakWeek1}</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;- {this.state.breakWeek2}</div>

              <div className="slackReminders">
                <div>
                  <strong># Slack /remind command for morning Workshop</strong>
                </div>
                <div>
                  # /remind #ei-{this.state.startDate} "It's time for our
                  morning workshop: {this.state.workshopUrl}{" "}" at 10AM {this.state.timeZone} every
                  weekday.
                </div>
                <div>
                  <strong># Slack /remind command for Lunch</strong>
                </div>
                <div>
                  # /remind #ei-{this.state.startDate} "Lunch Time!{" "}" at 12:45PM {this.state.timeZone}{" "}
                  every weekday.
                </div>
                <div>
                  <strong>
                    # Slack /remind command for afternoon Workshop
                  </strong>
                </div>
                <div>
                  # /remind #ei-{this.state.startDate} "It's time for our
                  afternoon workshop: {this.state.workshopUrl}{" "}" at 1:30PM {this.state.timeZone}{" "}
                  every weekday.
                </div>
                <div>
                  <strong># Slack /remind command for end of TA session</strong>
                </div>
                <div>
                  # /remind #ei-{this.state.startDate} "TA support is
                  available until 5:30 PM Eastern. Please submit tickets at
                  least 15 minutes before EOD" at 5PM{" "}
                  {this.state.timeZone} every weekday.
                </div>
              </div>
              <div className="welcome">
                <p>Hello and welcome to Engineering Immersion!</p>
                <p>
                  I will be your instructor for the first 6 weeks of your
                  program. The first week of your syllabus has now been posted,
                  and you may find it by looking at your student dashboards.
                  Please pay special attention to all items posted on Sunday's
                  dashboard, including opening and reading the absence form
                  which contains details of Thinkful's absence policy throughout
                  your course.  Also, please read through the document about working in teams:
                  https://rebrand.ly/group-work-protocol .  You can also find this and other helpful links 
                  in the "Hover here for helpful links!" section at the top of this slack channel.
                  
                </p>
                <p>
                  Please accept your invitations to join your cohort's Github
                  Organization at https://github.com/thinkful-ei-{this.state.organization}. I will
                  post coding examples here that we discuss in class. If you
                  don't see your invite, it may be in your spam folder. You can
                  also directly accept your invitation at
                  https://github.com/thinkful-ei-{this.state.organization}. If you cannot locate your
                  invite or are unable to join the organization - please respond
                  to this message by sending me your Github handle.
                </p>
                <p>
                  Also, please register for our course zoom session here:
                  {this.state.workshopUrl} You need to register with your first name,
                   last name and email address to be able to attend class.
                  You only need to register once.
                </p>
                <p>I look forward to meeting you all on Monday!</p>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>
              How to use avoid keyword to make sure students who have requested
              not to be paired with other students aren't paired.
            </h5>
            <img src={avoidExample} alt="example of avoid function" />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default YamlGenerator;
