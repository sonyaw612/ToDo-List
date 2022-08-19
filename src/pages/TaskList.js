import React from 'react';
import TaskCard from '../components/TaskCard';

class TaskList extends React.Component {
    state = {
        tasks: [],
        listOfTasks: [],
    }

    async componentDidMount(){
        const url = "http://localhost:8080/";
        try{
            fetch(url)
            .then(res => res.json())
            .then(jsonData => {
                console.log(jsonData)
                this.setState({ tasks: jsonData })
                for(let i in this.state.tasks){
                    console.log(this.state.tasks[i]);
                    this.state.listOfTasks = this.state.listOfTasks.concat(<TaskCard card = {this.state.tasks[i]}/>)
                }
                console.log('*---- Request fulfilled ----*\n');
            })
        } catch(err){
            console.log(err)
        }
    } 

    render() {
        return(
            <div>
                {this.state.listOfTasks}
                {/* <h1>{this.state.listOfTasks.length}</h1> */}
            </div>
        )
    }
}

export default TaskList;