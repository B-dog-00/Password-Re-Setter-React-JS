// src/PasswordResetForm.js
import React, { useState } from 'react';
import './style.css'; // Ensure the path to your CSS file is correct
import logo from './logo.svg'; // Importing logo192.png

const PasswordResetForm = () => {
    const [isSignUp, setIsSignUp] = useState(true);
    const [isLostPassword, setIsLostPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState(''); // For displaying success or error messages

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formState === 'lostPassword' && newPassword !== confirmPassword) {
            setMessage('Error: Passwords do not match.');
            return;
        }
        const formData = {
            email: email,
            newPassword: newPassword,
        };

        try {
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
                // Handle successful password update (e.g., clear the form fields)
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
        setIsSignUp(false);
        setIsLostPassword(true);
    };

    return (
        <div className="container">
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
                    <input type="password" placeholder="Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                {formState === 'lostPassword' && (
                    <div className="input-field">
                        <input type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                )}
                {formState === 'lostPassword' && (
                    <p className="message-success">Please enter your new password.</p>
                )}
                <div className="btn-field">
                    {formState !== 'signIn' && (
                        <button type="button" onClick={() => setFormState('signIn')}>Sign In</button>
                    )}
                    {formState !== 'signUp' && (
                        <button type="button" onClick={() => setFormState('signUp')}>Sign Up</button>
                    )}
                    {formState !== 'lostPassword' && (
                        <button type="button" onClick={() => setFormState('lostPassword')}>Lost Password</button>
                    )}
                </div>
                <div className="message-success">{message}</div>
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    </div>
);
};

export default PasswordResetForm;
