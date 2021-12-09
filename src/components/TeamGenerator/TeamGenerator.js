import React from "react";
import { Container, Row, Col } from 'reactstrap';
import ModalForm from '../Modals/Modal';
import DataTable from '../Tables/DataTable';
import { CSVLink } from "react-csv";
import apiUrl from '../../env';

class TeamGenerator extends React.Component {

    state = {
        students: [],
        groups:[],
        discordUrl:''

    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.students)
        let firstNames = this.state.students.map(student=>{
            let names = student.fname.split(' ')
            return names[0];
        });
        
       this.shuffle(firstNames);
        let numOfTeams=Math.ceil(firstNames.length/5);
       let groups=this.createGroups(firstNames, numOfTeams);
        let lastGroup =groups[groups.length-1];
        if(lastGroup.length==1){
            groups[groups.length-2].push(...lastGroup);
            groups.pop();
        }
        this.setState({groups});
    }
    createGroups(arr, numGroups) {
        const perGroup = Math.ceil(arr.length / numGroups);
        return new Array(numGroups)
          .fill('')
          .map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup));
      }

    shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }
    componentDidMount(){
        fetch(apiUrl)
        .then(response => response.json())
        .then(students =>this.setState({ students }))
        .catch(err => console.log("Error:",err))
    }

   

    render() {
        let items = (<div>No Items</div>);
        if (this.state.groups.length > 0) {
            items = this.state.groups.map((item,index) => {
                return (
                    <div key={item.id}>* Team {index+1} - {item.join('/')}</div>
                )
            })
        }
              return (
            <Container className="App">
                <Row>
                    <Col>
                        <h2>Team Generator</h2>
                        <form>
                            <div className="form-group">
                                <label>Discord Url</label>
                                <input type="text" className="form-control" id="discordUrl"  name="discordUrl" onChange={this.handleChange} value={this.state.discordUrl} />
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <button className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Generate Teams</button>
                                </div>
                            </div>
                        </form>
                    </Col>
                </Row>
                <Row>
                   
                    <Col>
                    <div>### Teams for this week</div>
                    <div>Join the appropriate team voice channel on your designated [Discord Server]({this.state.discordUrl})</div>
                        {items}
                    </Col>
                </Row>
            </Container>

        );
    }
}

export default TeamGenerator;
