import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { useState } from 'react';
import UserPool from '../UserPool';
import "./css/register.css";

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const attributeList = [];
    attributeList.push(
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      })
    );
    console.log(`username: ${username}`);
    console.log(`password: ${password}`);
    console.log(`attributeList: ${attributeList}`);
    UserPool.signUp(username, password, attributeList, null, (err, data) => {
      if (err) {
        console.log(err);
        alert("Couldn't sign up");
      } else {
        console.log(data);
        alert('User Added Successfully');
      }
    });
  };

  return (
    <div className="container">
      <form id="form" className="form">
        <h2 className="register-heading">Register With Us</h2>
        <div className="form-control">
          <label
            className="form-label"
            htmlFor="username">
              Username
          </label>
          <input
            id="username"
            className="form-input"
            type="text"
            placeholder="Enter username"
            value={username.toLowerCase().trim()}
            onChange={(e) => setUsername(e.target.value)} />
          <small>Error message</small>
        </div>
        <div className="form-control">
          <label
            className="form-label"
            htmlFor="email">
              Email
          </label>
          <input
            id="email"
            className="form-input"
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <small>Error message</small>
        </div>
        <div className="form-control">
          <label
            className="form-label"
            htmlFor="password">
              Password
          </label>
          <input
            className="form-input"
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
          <small>Error message</small>
        </div>
        <div className="form-control">
          <label
            className="form-label"
            htmlFor="password2">
              Confirm Password
          </label>
          <input
            className="form-input"
            type="password"
            id="password2"
            placeholder="Enter password again"
          />
          <small>Error message</small>
        </div>
        <button
          className="form-button"
          type="submit"
          onClick={onSubmit}>
            Submit
        </button>
        <a href="/login" className="register-account already-account">Already have an account?</a>
      </form>
    </div>
  );
};

export default Signup;
