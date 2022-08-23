import React from 'react';
import TaskList from './pages/TaskList';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App container container-fluid">
        <header className="App-header">To-Do List</header>
        <TaskList/>

      </div>
    );
  }
}

export default App;
