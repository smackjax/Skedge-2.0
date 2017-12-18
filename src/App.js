import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// Data Pages
import {
  MembersPage,
  GroupsPage,
  TasksPage,
  DataSelectPage,
  DaysPage
} from './data-page-components/_data-pages/';


// App-wide styles 
import 'sanitize.css/sanitize.css';
import './_generic-styles.style.css';
import './_colors.style.css';

class App extends Component {
  render() {
    return (
      <div className="App">

        <Switch>
          <Route path="/members" component={MembersPage}/>
          <Route path="/groups" component={GroupsPage}/>
          <Route path="/tasks" component={TasksPage}/>
          <Route path="/days" component={DaysPage} />
          <Route component={DataSelectPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
