import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from './_firebase/';

import { Switch, Route, Redirect} from 'react-router-dom';
import {BottomSpinner} from './components/_generic-components/spinners';

import { 
  loadAppState, 
  changeConnectedStatus,
  updateFollowedSchedules
} from './components/api';

import { FullScreenSpinner } from './components/_generic-components/spinners';

// Pages with navbar
import LoginPage from './components/pages/login-page/login-page.component';

import { 
  MainDash,
  ManageSchedules,
  ViewDateRange,
  ViewFollowedSchedule,
  SettingsPage,
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
    generating: false,
    loading: true,
    connected: true,
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(
      (user)=>{
        this.setState({ 
          user
        },
        ()=>{
          if(user){
            // Dispatches action to 
            // retrieve app state if user is signed in
            this.props.dispatch( loadAppState() )
            .catch(err=>{
              console.log("Error loading data in main app. That's bad. ", err);
              // TODO Sign out, clear all data, prompt for retry
            })
            .then(success=>{
              this.handleFullscreenSpinner(false);
              // Only initializes if there is a user.
              this.listenToConnection();
            })
          } else {
            // Stop spinner
            this.handleFullscreenSpinner(false);
          }
        }
      );
    })
  }

  // Keeps app in sync with connection status
  listenToConnection=()=>{
    firebase.database().ref('.info/connected')
    .on('value', (snapshot)=> {
      const connected = snapshot.val();

      // If online, check for updated schedules
      if(connected){
        this.props.dispatch(
          updateFollowedSchedules()
        )
      }

      // Update App component state and Redux
      this.setState(
        { connected },
        ()=>{
          this.props.dispatch(
            changeConnectedStatus( connected ) 
          )
        }
      )
    });
  }

  handleBottomSpinner=(status)=>{
    this.setState({generating: status})
  }

  handleFullscreenSpinner=(loading)=>{
    this.setState({
      loading
    })
  }


  render() {
    // TODO I don't like this. 
    // It calls getState each time, need to look into how much it slows down the app
    const currentState = this.props.getState();
    const activeSchedId = currentState.meta.activeSchedId;
    const userType = currentState.meta.userType;

    if(this.state.loading){
      return (
        <FullScreenSpinner />
      )
    }

    if(!this.state.user){
      return (
        <LoginPage />
      )
    }

    if(
      !activeSchedId && !this.state.connected){
      return (
        <div
        style={{
          padding: "20px",
          margin: "50px auto",
          maxWidth: "300px"
        }}
        className="action-btn bg-sched"
        >
          <h3
          style={{
            textAlign: "center",
            margin: "15px",
            color: "#fff"
          }}
          >
            Sorry!
          </h3>
          
          <h3
          style={{
            textAlign: "center",
            margin: "15px",
            paddingBottom: "5px",
            borderBottom: "4px dashed #fff",
            color: "#fff"
          }}
          >
            Please go online
          </h3>

          <p
          style={{
            textAlign: "justify",
            margin: "10px",
            color: "#fff"
          }}
          >To use this app offline, please go online and choose an active schedule.</p>

        </div>
      )
    }
    

    if(!activeSchedId && userType === "creator"){
      return <ManageSchedules />
    }
    

    const PreloadDataSelect = (routerProps)=>{
      return <DataSelectPage 
      {...routerProps}
      handleBottomSpinner={this.handleBottomSpinner}
      />
    }

    const RedirectToHome = ()=>(<Redirect to="/dashboard"/>)
    

    return (
      <div className="App">
        {this.state.generating && (
          <BottomSpinner /> 
        )}

        <Switch>
          <Route path="/members" component={MembersPage}/>
          <Route path="/groups" component={GroupsPage}/>
          <Route path="/tasks" component={TasksPage}/>
          <Route path="/days" component={DaysPage} />
          <Route path="/select-data" render={PreloadDataSelect} />

          <Route path="/manage-schedules" component={ManageSchedules} />
          <Route path="/schedule-data" render={PreloadDataSelect} />

          <Route path="/date-range/:dateRangeId" component={ViewDateRange} />
          <Route path="/followed-schedule/:followedSchedId" component={ViewFollowedSchedule} />

          <Route path="/dashboard" component={MainDash} />
          <Route path="/settings" component={SettingsPage} />
          <Route component={RedirectToHome } />
        </Switch>
      </div>
    );
  }
}

App.propTypes={
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired
}

export default App;
