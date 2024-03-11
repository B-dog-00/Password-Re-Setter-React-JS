import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Assuming you've moved your `style.css` to `src/index.css`
import PasswordResetForm from './PasswordResetForm'; // Adjust the import path based on your file structure

ReactDOM.render(
  <React.StrictMode>
    <PasswordResetForm />
  </React.StrictMode>,
  document.getElementById('root')
);
