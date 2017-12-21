import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// Pages with navbar
import SchedPage from './schedule-page/schedule-page.component'

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

const dateChange=(newVal)=>{
  console.log("Date change val: ", newVal);
}

class App extends Component {
  state={
    test: false
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/schedule" component={SchedPage}/>
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
