import React from 'react';
import TaskList from './pages/TaskList';

class App extends React.Component {
  render() {
    return (
      <div className="App container">
        <header className="App-header"></header>
        
        <TaskList/>

      </div>
    );
  }
}

export default App;
