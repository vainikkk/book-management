import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import LOGIN_IMAGE from "../assets/images/login.jpg";
import LOGO from "../logo.svg";

function Login() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState(localStorage.getItem("password") || "");
  const [checked, setChecked] = useState(false);

  const handleLogin = () => {
    if (checked) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    }
    if (email && password) {
      if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        console.log();
        alert("PLEASE ENTER VALID EMAIL");
      } else {
        setLoader(true);
        setTimeout(() => {
          setLoader(false);
          localStorage.setItem("token", "JWT TOKEN HERE");
          dispatch({ type: "LOGGED_IN", payload: "JWT TOKEN HERE" });
        }, 3000);
      }
    } else {
      alert("ENTER A VALUE");
    }
  };

  const handleReminder = (e) => {
    setChecked(!checked);
  };
  return (
    <div className="login-wrapper">
      <div className="container">
        <div className="card login-card">
          <div className="row no-gutters">
            <div className="col-md-5">
              <img src={LOGIN_IMAGE} alt="login" className="login-card-img" />
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <div className="brand-wrapper">
                  <img src={LOGO} alt="logo" className="logo" />
                </div>
                <p className="login-card-description">Sign into your account</p>
                <form action="#!">
                  <div className="form-group">
                    <label for="email" className="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      defaultValue={localStorage.getItem("email") || ""}
                      className="form-control"
                      placeholder="Email address"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label for="password" className="sr-only">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      defaultValue={localStorage.getItem("password") || ""}
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="***********"
                    />
                  </div>
                  {loader && (
                    <div className="text-center">
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  )}
                  <input
                    name="login"
                    id="login"
                    className="btn btn-block login-btn mb-4"
                    type="button"
                    value="Login"
                    onClick={handleLogin}
                  />
                  <input type="checkbox" name="reminder" value={checked} onChange={handleReminder} />
                  <label className="ml-2">Reminder</label>
                </form>
                <nav className="login-card-footer-nav">
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
