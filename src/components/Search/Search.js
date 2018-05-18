import React, {Component} from 'react';
import './Search.css'
import Topbar from '../Topbar/Topbar'

class Search extends Component{



    render(){
        return(
            <div className='search'>
                <Topbar name='Search'/>
                Search view
            </div>
        )
    }
}



export default Search;