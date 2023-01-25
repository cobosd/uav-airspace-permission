import "./css/register.css";

function Login() {
  return (
    <div className="container">
      <form id="form" className="form">
        <h2 className="register-heading">
          Login
        </h2>
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
        <button
          className="form-button"
          type="submit">
            Submit
        </button>
        <span className="register-account">
          Not a Member? &nbsp;<a href="/signup" className="already-account">Request an account</a>
        </span>
      </form>
    </div>
  );
};

export default Login;
