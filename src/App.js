import React, { Component } from 'react';
import { auth } from './_firebase/';

import { Switch, Route, Redirect} from 'react-router-dom';
import {BottomSpinner} from './components/_generic-components/spinners';

// Pages with navbar
import SchedPage from './components/pages/schedule-pages/schedule-dash/schedule-dash.component'
import PastSchedDash from './components/pages/schedule-pages/past-schedules-page/past-schedules-page.component';
import LoginPage from './components/pages/login-page/login-page.component';

import { 
  MainDash,
  ManageSchedules
} from './components/pages';

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


class App extends Component {
  state={
    user: false,
    generating: false
  }

  componentDidMount(){
    auth().onAuthStateChanged(
      (user)=>{
        this.setState({ user });
    })
  }


  handleBottomSpinner=(status)=>{
    this.setState({generating: status})
  }
  signOut=()=>{
    auth().signOut();
  }

  render() {

    if(!this.state.user){
      return (
        <LoginPage />
      )
    }

    const PreloadDataSelect = (routerProps)=>{
      return <DataSelectPage 
      {...routerProps}
      handleBottomSpinner={this.handleBottomSpinner}
      />
    }

    const RedirectToHome = ()=>(<Redirect to="dashboard"/>)
    return (
      <div className="App">
        {/* <button
        onClick={()=>{ console.log(JSON.stringify(createFakeMember(10))) }}
        >Create Member</button> */}
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
          <Route path="/select-data" render={PreloadDataSelect} />

          <Route path="/manage-schedules" component={ManageSchedules} />
          <Route path="/schedule-data" render={PreloadDataSelect} />
          <Route path="/dashboard" component={MainDash} />
          <Route component={RedirectToHome } />
        </Switch>
      </div>
    );
  }
}

export default App;
