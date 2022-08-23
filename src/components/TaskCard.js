import React from 'react';
// import TextField from 'textfield';
import axios from 'axios';
import './taskCard.css';

class TaskCard extends React.Component {

    state = {
        task: this.props.card.task,
        completed: this.props.card.completed,
        edit: false,
        // taskPH: '', // task place holder
    }

    onEdit = (props) => {
        this.setState({ edit: true })
    }

    // For editing a task
    handleSubmit=(event) => {
        this.setState({ edit: false })

        // event.preventDefault()
        console.log('Button id: ' + event.currentTarget.id + '...')
        const url = 'http://localhost:8080/edit/' + this.props.card.id
        const newTask = this.state.task
        console.log('Handling submit with: ' + newTask + '...')

        axios.put(url, { 
                task: newTask
        })
        .then(res => {
            if(res.ok) { console.log('Task edit successful') }
            window.location.reload()
        })
        .catch(err => console.log(err))
    }

    onDelete = (event) => {
        const url = 'http://localhost:8080/delete/' + this.props.card.id
        axios.delete(url)
        .then(res => {
            if(res.ok) { console.log('Deletion successful') }
            window.location.reload()
        })
    }

    // updates task value
    onChange = (event) => {
        this.setState({ task: event.target.value })
    }

    // if complete or incomplete button is clicked
    onComplete = (event) => {
        event.preventDefault()
        const url = 'http://localhost:8080/edit/' + this.props.card.id
        const updateCompletion = this.props.card.completed? (false):(true)

        axios.put(url, { 
                completed: updateCompletion
        })
        .then(res => {
            if(res.ok) { console.log('Task edit successful') }
            window.location.reload()
        })
        .catch(err => console.log(err))
    }

    render() {
        if(this.state.edit){
            return(
                <div className='container container-fluid taskCard'>
                    <div className='row'>
                        <form onSubmit={this.handleSubmit} style={{width: '100%'}}>
                            <input className='textSubmission' type="text" defaultValue={this.props.card.task} onChange={this.onChange}></input>
                        
                            <input type="submit" style={{backgroundColor: '#446ccf', color: 'white', border: '0.5px'}}/>
                        </form>
                    </div>
                </div>
            )
        }
        else {
            return(
                <div className='container container-fluid taskCard'>
                    {/* <button onClick={this.onComplete}>Incomplete</button> */}
                    <div className='row'>
                        <div className='col-md'>
                        <span>{ this.props.card.completed? (<p className='taskValue' style={{ textDecoration:'line-through', color: 'grey'}}>{ this.props.card.task }</p>) : (<p className='taskValue'>{ this.props.card.task }</p>) }</span>
                        </div>
                        <div className='col-'>
                            { this.props.card.completed? (<div><button className='incompleteButton' onClick={this.onComplete}>Incomplete</button></div>) : (<button className='completeButton' onClick={this.onComplete}>Completed</button>) }
                        </div>
                        <div className='col-'>
                            <button className='editButton' onClick={this.onEdit}>edit</button>
                        </div>
                        <div className='col-'>
                            <button className='deleteButton' onClick={this.onDelete}>delete</button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default TaskCard;