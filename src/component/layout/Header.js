import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    render(){
        return(
        <div className="text-center pt-5 pb-0">
            <h1 style={{fontWeight: '100', color: '#233443'}}>Your<span style={{fontWeight: '500'}}>Story</span></h1>
            <p className="text-secondary">A place to share your story's and confessions</p>
        </div>
        )
    }
};

export default Header;