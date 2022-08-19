import React from 'react';


class TaskCard extends React.Component {

    state = {
        task: 'default',
        completed: false
    }

    render() {
        return(
            <div className='container container-fluid'>

                <button>Completed</button>
                <h3>{ this.props.card.task }</h3>
                <button>Delete</button>
                
            </div>
        )
    }
}

export default TaskCard;