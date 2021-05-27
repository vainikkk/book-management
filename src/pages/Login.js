import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import LOGIN_IMAGE from "../assets/images/login.jpg";
import LOGO from "../logo.svg";

function Login() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) {
      setLoader(true);
      setTimeout(() => {
        setLoader(false);
        localStorage.setItem("token", "JWT TOKEN HERE");
        dispatch({ type: "LOGGED_IN", payload: "JWT TOKEN HERE" });
      }, 3000);
    }
  };
  return (
    <div className="login-wrapper">
      <div class="container">
        <div class="card login-card">
          <div class="row no-gutters">
            <div class="col-md-5">
              <img src={LOGIN_IMAGE} alt="login" class="login-card-img" />
            </div>
            <div class="col-md-7">
              <div class="card-body">
                <div class="brand-wrapper">
                  <img src={LOGO} alt="logo" class="logo" />
                </div>
                <p class="login-card-description">Sign into your account</p>
                <form action="#!">
                  <div class="form-group">
                    <label for="email" class="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      class="form-control"
                      placeholder="Email address"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div class="form-group mb-4">
                    <label for="password" class="sr-only">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      class="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="***********"
                    />
                  </div>
                  {loader && (
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  )}
                  <input
                    name="login"
                    id="login"
                    class="btn btn-block login-btn mb-4"
                    type="button"
                    value="Login"
                    onClick={handleLogin}
                  />
                </form>
                <nav class="login-card-footer-nav">
                  <a href="#!">Terms of use.</a>
                  <a href="#!">Privacy policy</a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
