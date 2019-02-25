import { Component } from "react";
import Layout from "../components/layout";
import service from "../utils/service"
class Login extends Component {
  static getInitialProps({ req }) {
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

    const apiUrl = process.browser
      ? `${protocol}://${window.location.host}/api/login`
      : `${protocol}://${req.headers.host}/api/login`;

    return { apiUrl };
  }

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      error: ""
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const username = this.state.username;
    const password = this.state.password;
    const url = this.props.apiUrl;

    service({url, username, password});
  }

  render() {
    return (
      <Layout>
        <div className="login">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="username">Логин</label>

            <input
              type="text"
              id="username"
              name="username"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />

            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />

            <button type="submit">Login</button>

            <p className={`error ${this.state.error && "show"}`}>
              {this.state.error && `Error: ${this.state.error}`}
            </p>
          </form>
        </div>
        <style jsx>{`
          .login {
            max-width: 340px;
            margin: 0 auto;
            padding: 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          form {
            display: flex;
            flex-flow: column;
          }

          label {
            font-weight: 600;
          }

          input {
            padding: 8px;
            margin: 0.3rem 0 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          .error {
            margin: 0.5rem 0 0;
            display: none;
            color: brown;
          }

          .error.show {
            display: block;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Login;
