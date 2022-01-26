import React from 'react';
import Darkmodebtn from '../DarkModeBtn/DarkModeBtn';
import './Header.scss'

const Header = () => {

    return (
        <div className='Header'>
            <h1>Pokédex</h1>
            <Darkmodebtn />
        </div>
    );
}

export default Header;
