import React from 'react';
import TaskCard from '../components/TaskCard';
import axios from 'axios';

class TaskList extends React.Component {
    state = {
        // tasks: [],
        listOfTasks: [], // typically use 1 array
        newTask: '',
        dataRetrievalError: false
    }

    async componentDidMount(){
        const url = "http://localhost:8080/"

        console.log('WINDOW START')
        try{
            await fetch(url)
            .then(res => res.json())
            .then(jsonData => {
                console.log(jsonData)
                this.setState({ listOfTasks: jsonData })
                console.log('*---- Request fulfilled ----*\n')
            }) 
            .catch(err => {
                console.log(err)
                this.setState({ dataRetrievalError: true }) // if unable to retrieve data, set error to true to display error message to users
            })
        } catch(err){
            console.log(err)
        }
    }

    reloadTask = (event) => {
        const url = 'http://localhost:8080/'
        fetch(url)
        .then(res => res.json())
        .then(jsonData => {
            console.log(jsonData)
            this.setState({ listOfTasks: jsonData })
            console.log('*---- Request fulfilled ----*\n')
        }) 
        .catch(err => console.log(err))
    }

    handleCreateTask = (event) => {
        event.preventDefault()
        const url = "http://localhost:8080/"
        axios.post(url, {
            task: this.state.newTask
        })
        .then(() =>{
            document.getElementById('newTask').value = '' // when a user submits a value, the text value will 'reset'
            this.reloadTask() //window.location.reload() // bad when data is large. Instead call api and update state
        })
        .catch(err => console.log(err))
    }

    onChange = (event) => {
        this.setState({ newTask: event.target.value })
    }

    render() {
        if(this.state.dataRetrievalError){
            return (
                <div>
                    <br/>
                    <h3>Failed to retrieve tasks</h3>
                </div>
            )
        }
        else{
            return(
                <div>
                    <br/>
                    <form onSubmit={this.handleCreateTask}>
                        <input id='newTask' type='text' placeholder="What needs to get done?" onChange={ this.onChange }
                            style={{height: '45px', width:'70%', marginRight:'20px'}}></input>

                        <input type='submit'/>
                    </form>
                    <br/>

                    {this.state.listOfTasks.map((task) => {
                        console.log(task);
                        return (<TaskCard card={task} key={task.id} updateTasks={this.reloadTask.bind(this)}/>)
                    })}

                </div>
            )
        }
    }
}

export default TaskList;