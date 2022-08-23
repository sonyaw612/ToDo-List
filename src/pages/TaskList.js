import React from 'react';
import TaskCard from '../components/TaskCard';
import axios from 'axios';

class TaskList extends React.Component {
    state = {
        tasks: [],
        listOfTasks: [],
        newTask: ''
    }

    async componentDidMount(){
        const url = "http://localhost:8080/"

        console.log('CALL ONCE')
        try{
            await fetch(url)
            .then(res => res.json())
            .then(jsonData => {
                console.log(jsonData)
                this.setState({ tasks: jsonData })
                for(let i in this.state.tasks){
                    console.log(this.state.tasks[i]);
                    this.state.listOfTasks = this.state.listOfTasks.concat(<TaskCard card = {this.state.tasks[i]} key={this.state.tasks[i].id}/>)
                }
                console.log('*---- Request fulfilled ----*\n')

                // this.state.listOfTasks = this._sortTasks(this.state.listOfTasks.slice())
                // this.state.listOfTasks = this.state.listOfTasks.sort(function(task1, task2) {
                //     let bool1 = task1.completed
                //     let bool2 = task2.completed
                //     if(bool1 === bool2) return 0
                //     else if(bool1 > bool2) return 1
                //     else return -1
                // })
            })
        } catch(err){
            console.log(err)
        }
    }

    _sortTasks(data) {
        // var sortedTasks = data.sort(fuction(task1, task2) => {
            // const task1Bool = (task1.completed);

            // return {task1.completed} - {task2.completed};
        // })
    }

    handleCreateTask = (event) => {
        event.preventDefault()
        const url = "http://localhost:8080/create"
        console.log('hello')
        axios.post(url, {
            task: this.state.newTask
        })
        .then(() =>{
            window.location.reload()
        })
        .catch(err => console.log(err))
    }

    onChange = (event) => {
        this.setState({ newTask: event.target.value })
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleCreateTask}>
                    <input id='newTask' type='text' placeholder="What needs to get done?" onChange={ this.onChange }
                        style={{height: '45px', width:'70%', marginRight:'20px'}}></input>

                    <input type='submit'/>
                </form>
                <br/> <br/>

                {this.state.listOfTasks}
            </div>
        )
    }
}

export default TaskList;