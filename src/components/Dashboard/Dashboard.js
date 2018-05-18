import React, { Component } from 'react';
import './Dashboard.css'
import Topbar from '../Topbar/Topbar'
import { connect } from 'react-redux';
import { getUser, getFriendByCategory, getfriends, addFriend } from '../../redux/reducer';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.sortByCategory = this.sortByCategory.bind(this);
    }


    componentDidMount() {
        this.props.getUser()
        this.props.getfriends()
    }
     handleClick(id){
        this.props.addFriend(id)
    }

    sortByCategory() {
        let category = this.refs.selectedCategory.value;
        console.log('category selected', category)
        this.props.getFriendByCategory(category, this.props.userData)
    }

    render() {

        console.log(`userData in dash: `, this.props.userData);
        console.log(`friendsData:`, this.props.friendsData)

        let friends = this.props.friendsData.map((f, i) => {
            return(
                <div className="friend_card" key={i} >
                    <img src={f.img} alt="friend pic"/>
                    <h5>{f.user_name} {f.lastName}</h5>
                    <button>Add Friend</button>
                </div>
            )
        })
        return (
            <div className='dashboard'>
                <Topbar name='Dashboard' />

                <div className='dash-content'>

                    <div className='dash-profile'>

                        <div className='dash-image-container'>
                            <img className='avatar' src={this.props.userData.img} alt='user pic'></img>
                        </div>

                        <div className='profile-btn-container'>
                            <div className='profile-name'>{this.props.userData.user_name}</div>
                            <Link to='/profile'><div className='edit-profile-btn'>Edit Profile</div></Link>
                        </div>
                    </div>

                    <div className='onboarding'>
                        <p>Welcome to Helo! Find recommended friends based</p>
                        <p>on your similarities, and even search for them by name. The more you</p>
                        <p>update your profile, the better recommendations we can make!</p>
                    </div>

                    <div className='filter-area'>

                        <div className='top'>
                            <div className='top-left'>
                                <div className='left-text'>Recommended Friends</div>
                            </div>
                            <div className='top-right'>
                                <div>Sort by:</div>

                                <select className='recommend-select' ref='selectedCategory'
                                    value='' onChange={this.sortByCategory}>
                                    <option value='' disabled>-Select-</option>
                                    {/* <option value="first">First Name</option> */}
                                    {/* <option value="last">Last Name</option> */}
                                    <option value="user_name">First Name</option>
                                    <option value="lastName">Last Name</option>
                                    <option value="gender">Gender</option>
                                    <option value="hobby">Hobby</option>
                                    <option value="h_color">Hair Color</option>
                                    <option value="e_color">Eye Color</option>
                                    <option value="birthday">Birthday</option>
                                </select>
                            </div>
                        </div>

                        {this.props.friendsData ?
                        <div className='recommened-list'>{friends}</div>
                        :
                        <div className='recommened-list'>No Recommendations</div>
                        }
                        
                    </div>

                </div>




            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userData: state.user,
        friendsData: state.friends
    }
}

export default connect(mapStateToProps, { getUser, getFriendByCategory, getfriends, addFriend })(Dashboard);