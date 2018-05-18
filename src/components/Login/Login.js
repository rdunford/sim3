import React, { Component } from 'react';
import './Login.css'
import logo from '../assets/logo.png'

class Login extends Component {
    render() {
        return (
            <div className='login'>
                <div className='login-content'>
                    <div className='login-top'>
                        <img className='login-logo' src={logo} alt='logo' />
                        <div className='login-text'>Helo</div>
                    </div>
                    <div className='login-btn-container'>
                        <a href={process.env.REACT_APP_LOGIN}><div className='login-btn'>Login / Register</div></a>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;