import React from "react";

class Roster extends React.Component {
    constructor(props) {
        super(props);
        this.state = { students: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    state = {

    }

    handleChange(event) {
        console.log(event.target)
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
        this.parseStudents(this.state.students);
    }

    parseStudents(students){
        let studentRecords = [];
        let studentsArr = students.replace(/\t/g, ",").split("\n");
        console.log(studentsArr);
        for(let i =0; i < studentsArr.length;i++){
            let arr = studentsArr[i].split(",");
            studentRecords.push({
                fName:arr[0],
                lName:arr[1],
                email:arr[2],
                asm: arr[3],
                location: `${arr[5]},${arr[6].trim().replace(/;not started;/g,"")}`,
                paymentPlan:arr[8]
             });
            
            //let studentobj =
        }
        console.log(studentRecords)

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }


    render() {
        return (
            <div className="container">
                Roster
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    </div>
                    <div className="form-group">
                        <label>Example textarea</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="10" name="students" onChange={this.handleChange} value={this.state.students} />
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <button type="submit" className="btn btn-primary">Sign in</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Roster;
