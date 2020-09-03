import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    id: '',
    fName:'', lName:'', email:'', asm:'', location:'', slack:'', paymentPlan:'', cohort:'',githubOrg:''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:3000/crud', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fName: this.state.fName,
        lName: this.state.lName,
        email: this.state.email,
        asm: this.state.asm,
        location: this.state.location,
        slack: this.state.slack,
        paymentPlan: this.state.paymentPlan,
        cohort: this.state.cohort,
        githubOrg:this.state.githubOrg
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    console.log(this.state);
    fetch('http://localhost:3000/crud', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        fName: this.state.fName,
        lName: this.state.lName,
        email: this.state.email,
        asm: this.state.asm,
        location: this.state.location,
        slack: this.state.slack,
        paymentPlan: this.state.paymentPlan,
        cohort: this.state.cohort, 
        githubOrg:this.state.githubOrg
      })
    })
      .then(response => response.json())
      .then(item => {
            console.log(item)
        if(Array.isArray(item)) {
         
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    console.log(this.props.item)
    if(this.props.item){
      const { id, fName, lName, email, asm, location, slack, paymentPlan, cohort } = this.props.item
      this.setState({ id,fName, lName, email, asm, location, slack, paymentPlan, cohort })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="first">First Name</Label>
          <Input type="text" name="fName" id="first" onChange={this.onChange} value={this.state.fName === null ? '' : this.state.fName} />
        </FormGroup>
        <FormGroup>
          <Label for="last">Last Name</Label>
          <Input type="text" name="lName" id="last" onChange={this.onChange} value={this.state.lName === null ? '' : this.state.lName}  />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email}  />
        </FormGroup>
        <FormGroup>
          <Label for="phone">ASM</Label>
          <Input type="text" name="asm" id="phone" onChange={this.onChange} value={this.state.asm === null ? '' : this.state.asm}  placeholder="Suzy Smith" />
        </FormGroup>
        <FormGroup>
          <Label for="location">Location</Label>
          <Input type="text" name="location" id="location" onChange={this.onChange} value={this.state.location === null ? '' : this.state.location}  placeholder="City, State" />
        </FormGroup>
        <FormGroup>
          <Label for="hobby">Slack</Label>
          <Input type="text" name="slack" id="hobby" onChange={this.onChange} value={this.state.slack}  />
        </FormGroup>
        <FormGroup>
          <Label for="payment">Payment Type</Label>
          <Input type="text" name="paymentPlan" id="payment" onChange={this.onChange} value={this.state.paymentPlan}  />
        </FormGroup>
        <FormGroup>
          <Label for="cohort">Cohort</Label>
          <Input type="text" name="cohort" id="cohort" onChange={this.onChange} value={this.state.cohort}  />
        </FormGroup>
        <FormGroup>
          <Label for="cohort">Github Organization</Label>
          <Input type="text" name="githubOrg" id="githubOrg" onChange={this.onChange} value={this.state.githubOrg}  />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm;