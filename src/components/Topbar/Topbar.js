import React, { Component } from 'react';
import './Topbar.css'
import homelogo from '../assets/home.png';
import searchlogo from '../assets/search.png';
import { Link } from 'react-router-dom';

class Topbar extends Component {
    constructor(props){
        super(props);
            this.state={
                location: ''
            
        }
    }

    componentDidMount(){
        this.setState({
            location: this.props.name
        })
    }


    render() {
        return (
            <div className='topbar'>

                <div className='nav-left'>
                    <div className='nav-text'>Helo</div>
                    <Link to='/dashboard'><img className='icon' src={homelogo} alt='home logo' /></Link>
                    <Link to='/search'><img className='icon' src={searchlogo} alt='search icon' /></Link>
                </div>

                <div className='nav-mid'>
                    <div className='nav-text'>{this.state.location}</div>
                </div>

                <div className='nav-right'>
                    <a className='nav-logout' href={process.env.REACT_APP_LOGOUT}><div>Logout</div></a>
                </div>

            </div>
        )
    }
}

export default Topbar;