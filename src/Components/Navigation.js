import React from 'react';
import '../Styles/navigation.scss';

export default function Navigation() {
    return (
        <nav className='navigation'>
            <div className='logo'>
                <img 
                    alt="nr_beta_logo" 
                    src="https://noterouter-staging.firebaseapp.com/static/media/logo.b10c9223.png"
                />
            </div>
        </nav>
    )
}