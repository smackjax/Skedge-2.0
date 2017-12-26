import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import {BottomSpinner} from './components/_generic-components/spinners';

// Pages with navbar
import SchedPage from './components/pages/schedule-pages/schedule-dash/schedule-dash.component'
import PastSchedDash from './components/pages/schedule-pages/past-schedules-page/past-schedules-page.component';
import SettingsPage from './components/pages/settings-page/settings-page.component';

// Data Pages
import {
  MembersPage,
  GroupsPage,
  TasksPage,
  DataSelectPage,
  DaysPage
} from './components/pages/data-page-components/pages/';

// App-wide styles 
import 'sanitize.css/sanitize.css';
import './app-styles/generic-styles.style.css';
import './app-styles/colors.style.css';


import{ FromToDatesWithLabel } from './components/_generic-components/inputs';

const testDateSelect = (e)=>{
  console.log(e);
}

class App extends Component {
  state={
    generating: false
  }

  handleBottomSpinner=(status)=>{
    this.setState({generating: status})
  }

  render() {
    const PreloadDataSelect = (routerProps)=>{
      return <DataSelectPage 
      {...routerProps}
      handleBottomSpinner={this.handleBottomSpinner}
      />
    }

    return (
      <div className="App">
        
        {this.state.generating && (
          <BottomSpinner /> 
        )}

        <Switch>
          <Route path="/schedule-dash" component={SchedPage}/>
          <Route path="/schedules" component={PastSchedDash}/>
          <Route path="/members" component={MembersPage}/>
          <Route path="/groups" component={GroupsPage}/>
          <Route path="/tasks" component={TasksPage}/>
          <Route path="/days" component={DaysPage} />
          <Route path="/settings" component={SettingsPage} />
          <Route render={PreloadDataSelect} />
        </Switch>
      </div>
    );
  }
}

export default App;
