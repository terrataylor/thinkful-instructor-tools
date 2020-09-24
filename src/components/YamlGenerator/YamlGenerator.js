import React from "react";
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';
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
                        <Label for="first">First Name</Label>
                        <Input type="text" name="fname" id="first" onChange={this.onChange} value={this.state.fname === null ? '' : this.state.fname} />
                    </FormGroup>
                    <FormGroup>
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>

            </Container>);
    }
}

export default YamlGenerator;
