import React, {Component} from 'react';
import './Profile.css'
import Topbar from '../Topbar/Topbar'

class Profile extends Component{



    render(){
        return(
            <div className='profile'>
                <Topbar name='Profile'/>
                Profile view
            </div>
        )
    }
}



export default Profile;