// src/PasswordResetForm.js
import React, { useState } from 'react';
import './style.css'; // Ensure the path to your CSS file is correct
import logo from './logo.svg'; // Importing logo192.png

const PasswordResetForm = () => {
    const [isSignUp, setIsSignUp] = useState(true);

    return (
        <div className="container" style={{ backgroundImage: `linear-gradient(rgba(0,0,50,0.8), rgba(0,0,50,0.8)), url(${logo.svg})` }}>
            <div className="form-box">
                <h1 id="title">{isSignUp ? "Sign Up" : "Sign In"}</h1>
                <form>
                    {isSignUp && (
                        <div className="input-field" id="nameField">
                            {/* Replace <i> tags with FontAwesomeIcon component if you have installed FontAwesome */}
                            <input type="text" placeholder="Name" />
                        </div>
                    )}
                    <div className="input-field">
                        <input type="email" placeholder="Email" />
                    </div>
                    <div className="input-field">
                        <input type="password" placeholder="Password" />
                    </div>
                    <p>Lost password <a href="#">Click Here!</a></p>
                    <div className="btn-field">
                        <button type="button" onClick={() => setIsSignUp(true)}>Sign Up</button>
                        <button type="button" onClick={() => setIsSignUp(false)}>Sign In</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PasswordResetForm;
