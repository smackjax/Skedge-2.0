import React from 'react';

import { createAccountOrSignIn } from '../api';
import './login-page.style.css';


class LoginPage extends React.Component {
    state={
        isNewAccount: false,
        errorMsg: "",
        loading: false,

        email: "",
        displayName: "",
        password: "",
        passwordConfirm: ""
    }

    // Form Handlers
    handleEmail=(e)=>{
        const val = e.target.value;
        this.setState({ email: val });
    }
    handleDisplayName=(e)=>{
        const val = e.target.value;
        this.setState({ displayName: val });
    }
    handlePassword=(e)=>{
        const val = e.target.value;
        this.setState({ password: val });
    }
    handlePasswordConfirm=(e)=>{
        const val = e.target.value;
        this.setState({ passwordConfirm: val });
    }


    // Meta Handlers
    setErrorMsg=(errorMsg)=>{
        this.setState({
            errorMsg
        });
    }
    setLoading=(loading)=>{
        this.setState({
            loading
        })
    }
    changeSignInType=(e)=>{
        e.preventDefault();
        const isNewAccount = !this.state.isNewAccount;
        this.setState({
            isNewAccount
        })
    }

    // Handles sign in for both new and existing
    signIn=(e)=>{
        // Catch form submission
        e.preventDefault();

        const {
            isNewAccount, 
            email, 
            displayName, 
            password, 
            passwordConfirm
        } = this.state;

        if(isNewAccount && (password !== passwordConfirm)){
            return this.setErrorMsg("Passwords must match");
        }

        if(isNewAccount && !displayName.trim()){
            return this.setErrorMsg("Must have a display name");
        }

        // Returns a promise that catches it's own errors,
        // and sets error messages based on their code
        this.setLoading(true);
        createAccountOrSignIn(
            isNewAccount, 
            email, 
            password, 
            displayName, 
            this.setErrorMsg
        )
        .then(always=>{
            this.setLoading(false)
        })
    }

    render(){
        return (
        <div className="login-page">
            <div className="logo"
            >
            </div>

            {this.state.errorMsg && (
                <div className="error-message">
                    {this.state.errorMsg}                
                </div>
            )}

            <form onSubmit={this.signIn}>
                <input type="text" 
                placeholder="email"
                onChange={this.handleEmail}
                value={this.state.email}
                required
                />
                { this.state.isNewAccount && (
                    <input type="text" 
                    placeholder="Display Name"
                    onChange={this.handleDisplayName}
                    value={this.state.displayName}
                    required={this.state.isNewAccount}
                    />
                )}

                <input type="password" 
                placeholder="Password"
                onChange={this.handlePassword}
                value={this.state.password}
                required
                />

                { this.state.isNewAccount && (
                    <input type="password" 
                    placeholder="Confirm Password"
                    onChange={this.handlePasswordConfirm}
                    value={this.state.passwordConfirm}
                    required={this.state.isNewAccount}
                    />
                )}

                <button 
                type="submit">
                    Submit
                </button>
                
                <button
                onClick={this.changeSignInType}
                >
                {this.state.isNewAccount ? "Already have an account" : "New account"}
                </button>

            </form>
            <hr />

            <button className="sign-in-with-google">
                Sign in with google
            </button>

        </div>
        )
    }
}

export default LoginPage;