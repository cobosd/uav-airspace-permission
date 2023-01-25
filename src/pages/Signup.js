import "./css/register.css";

function Signup() {
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
            placeholder="Enter username" />
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
            placeholder="Enter email" />
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
            placeholder="Enter password" />
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
          type="submit">
            Submit
        </button>
        <a href="/login" className="register-account already-account">Already have an account?</a>
      </form>
    </div>
  );
};

export default Signup;
