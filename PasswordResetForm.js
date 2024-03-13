import React, { useState } from 'react';
import './style.css'; // Ensure the path to your CSS file is correct
import logo from './logo.svg'; // Importing logo.svg

const PasswordResetForm = () => {
    const [formState, setFormState] = useState('signIn'); // Manage the form state
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState(''); // For displaying success or error messages

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Additional validation for new password and confirm new password match
        if (formState === 'lostPassword' && newPassword !== confirmNewPassword) {
            setMessage('Error: Passwords do not match.');
            return;
        }

        const formData = {
            email: email,
            newPassword: newPassword,
        };

        try {
            // Ensure the endpoint matches your production or development environment
            const response = await fetch('http://localhost:3000/updatePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Password updated successfully');
                setMessage('Password updated successfully.'); // Display a success message
                // Clear the form fields after successful update
                setEmail('');
                setNewPassword('');
                setConfirmNewPassword('');
            } else {
                console.error('Failed to update password');
                setMessage('Failed to update password.'); // Display an error message
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage(`Error: ${error.toString()}`); // Display an error message
        }
    };

    const handleLostPasswordClick = () => {
        setFormState('lostPassword');
    };

    return (
        <div className="container" style={{ backgroundImage: `linear-gradient(rgba(0,0,50,0.8), rgba(0,0,50,0.8)), url(${logo})` }}>
            <div className="form-box">
                <h1 id="title">{formState === 'signUp' ? "Sign Up" : formState === 'signIn' ? "Sign In" : "Lost Password"}</h1>
                <form onSubmit={handleSubmit}>
                    {formState !== 'signIn' && (
                        <div className="input-field" id="nameField">
                            <input type="text" placeholder="Name" />
                        </div>
                    )}
                    <div className="input-field">
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-field">
                        <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    {formState === 'lostPassword' && (
                        <div className="input-field">
                            <input type="password" placeholder="Confirm New Password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                        </div>
                    )}
                    <p>Lost password? <button type="button" onClick={handleLostPasswordClick} style={{border: 'none', background: 'none', color: '#3c00a0', textDecoration: 'underline', cursor: 'pointer'}}>Click Here!</button></p>
                    <div className="btn-field">
                        {formState !== 'signIn' && (
                            <button type="button" onClick={() => setFormState('signIn')}>Sign In</button>
                        )}
                        {formState !== 'signUp' && (
                            <button type="button" onClick={() => setFormState('signUp')}>Sign Up</button>
                        )}
                        {formState !== 'lostPassword' && (
                            <button type="button" onClick={handleLostPasswordClick}>Lost Password</button>
                        )}
                    </div>
                    <div className="message">{message}</div>
                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default PasswordResetForm;
