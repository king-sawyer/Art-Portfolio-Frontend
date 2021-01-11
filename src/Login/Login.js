import React from "react";
import authApiService from "../services/auth-api-service";
import TokenService from "../services/token-service";
import Admin from "./Admin/Admin";
import "./Login.css";

class Login extends React.Component {
  state = {
    error: null,
    loggedIn: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { userName, password } = e.target;
    const user = { userName: userName.value, password: password.value };
    this.setState({ error: null });
    authApiService
      .loginUser(user)
      .then((loginResponse) => {
        TokenService.saveAuthToken(loginResponse.authToken);
        this.setState({ loggedIn: true });
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render(props) {
    return (
      <div className="loginDiv">
        {!TokenService.hasAuthToken() && (
          <>
            <h3>Log in:</h3>
            <form className="loginForm" onSubmit={this.handleSubmit}>
              <label>
                Username:
                <input
                  required
                  type="text"
                  placeholder="Username"
                  defaultValue="default"
                  name="userName"
                />
              </label>
              <br />
              <label>
                Password:
                <input
                  required
                  type="password"
                  placeholder="Password"
                  defaultValue="Defaultpassword1"
                  name="password"
                />
              </label>
              <button type="submit">Submit</button>
            </form>
            {this.state.error && (
              <div>
                <p> Username or password is incorrect. Please try again.</p>
              </div>
            )}
          </>
        )}
        {TokenService.hasAuthToken() && (
          <>
            {" "}
            <form>
              <label>
                {" "}
                <input
                  type="button"
                  value="Log-out"
                  onClick={(e) => {
                    TokenService.clearAuthToken();
                    this.props.history.push("/");
                  }}
                />
              </label>
            </form>
            <Admin products={this.props.products} />
          </>
        )}
      </div>
    );
  }
}

export default Login;
