import React, { Component } from 'react';
import store from './_redux/redux-store';
import {connect} from 'react-redux';
import {saveState, loadState} from './_localData/localData';

import Data_Acts from './_redux/actions/data.actions';
import { Switch, Route } from 'react-router-dom';

import {BottomSpinner} from './_spinners/';

// Pages with navbar
import SchedPage from './schedule-page/schedule-page.component'
import PastSchedDash from './schedule-pages/past-schedules-page/past-schedules-page.component';
import SettingsPage from './settings-page/settings-page.component';

// Data Pages
import {
  MembersPage,
  GroupsPage,
  TasksPage,
  DataSelectPage,
  DaysPage
} from './data-page-components/pages/';

// App-wide styles 
import 'sanitize.css/sanitize.css';
import './_generic-styles.style.css';
import './_colors.style.css';
import { genNewSched } from './brains/sched-api';

// Testing purposes
store.subscribe(()=>{
  saveState(store.getState());
})


const dateChange=(newVal)=>{
  console.log("Date change val: ", newVal);
}


class App extends Component {
  state={
    generating: false
  }

  componentWillMount(){
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
