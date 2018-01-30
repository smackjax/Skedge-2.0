import React from 'react';

import { createAccountOrSignIn, signInWithGoogle } from '../api';
import { icons, PageBackground} from '../generic-components';
import { logo } from '../../resources';
import './login-page.style.css';


class LoginPage extends React.Component {
    state={
        isNewAccount: false,
        errorMsg: '',
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
        const newAccount = this.state.isNewAccount;

        return (
        <div className="login-page">
            <PageBackground 
            color="#d8d7d7"
            />
            
            <div className="logo"
            >
                <img src={logo} alt="emmets-logo" />
            </div>

            {this.state.errorMsg && (
                <div 
                className="error-message-wrapper border-danger text-danger bg-light">
                    {this.state.errorMsg}                
                </div>
            )}

            <form 
            className="login-form"
            onSubmit={this.signIn}>
                <input type="text" 
                placeholder="email"
                onChange={this.handleEmail}
                value={this.state.email}
                required
                className="action-btn login-input"
                />
                { newAccount && (
                    <input type="text" 
                    placeholder="Display Name"
                    onChange={this.handleDisplayName}
                    value={this.state.displayName}
                    required={newAccount}
                    className="action-btn login-input"
                    />
                )}

                <input type="password" 
                placeholder="Password"
                onChange={this.handlePassword}
                value={this.state.password}
                required
                className="action-btn login-input"
                />

                { newAccount && (
                    <input type="password" 
                    placeholder="Confirm Password"
                    onChange={this.handlePasswordConfirm}
                    value={this.state.passwordConfirm}
                    required={newAccount}
                    className="action-btn login-input"
                    />
                )}

                <button 
                type="submit"
                className="action-btn bg-creator text-light login-btn"
                >
                    {newAccount ? (
                        <span>{icons.check} CREATE</span>
                    ) : (
                        <span>{icons.signIn} SIGN IN</span>
                    )}
                </button>
                
                <button
                className="text-creator border-creator switch-account-type-btn"
                onClick={this.changeSignInType}
                >
                    {newAccount ? "Have an account?" : "New account?"}
                </button>

            </form>

            <hr  className="login-form-divider border-creator"/>

            <button 
            onClick={signInWithGoogle}
            className="sign-in-with-google-btn action-btn">
                <div
                className="g-container"
                >
                    <i className="fa fa-google" />
                </div>
                <div
                className="text-container"
                >
                    SIGN IN WITH GOOGLE
                </div>
            </button>

        </div>
        )
    }
}

export default LoginPage;