import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { authenticateInitiate } from "../../store/actions/session.action";
//import pic from "../../../public/assests/images/open.jpeg";

const Login = (props) => {
  const { triggerLogin, history, session } = props;
  const [state, setState] = useState({ email: "", password: "" });

  const updateState = (event) => {
    const { target } = event;
    const { name, value } = target;
    setState((preValue) => {
      return {
        ...preValue,
        [name]: value
      };
    });
  };

  const handleLogin = () => {
    const { email, password } = state;
    if (email !== "" && password !== "") {
      triggerLogin(state);
    } else {
      alert("Please enter both email and password");
    }
  };

  const handleRegister = () => {
    history.push("/register");
  };

  useEffect(() => {
    if (session.isAuthenticated) {
      history.push("/dashboard");
    }
  }, [session.isAuthenticated, history]);

  return (
    <>
      <div className="ui grid container" style={{ margin: "7vh" }}>
        <div
          className="ui raised segment align-center fit-content"
          style={{ background: "lightgray", width: "100%", padding: "4vh", height: "fit-content" }}>
          <div
            className="ui raised segment login-segment"
            style={{ height: "100%", width: "100%" }}>
            <div className="ui two column  grid">
              <div className="nine wide computer only column">
                <img src="" />
              </div>
              <div className=" seven wide computer sixteen wide mobile column">
                <div class=" ui  grid ">
                  <div class="doubling four column row">
                    <div class="left floated column">
                      <div
                        className="cursor-pointer text-color-positive"
                        style={{ marginLeft: "3vh" }}>
                        Login
                      </div>
                    </div>
                    <div class="right floated column">
                      <div
                        className="cursor-pointer text-color-positive"
                        style={{ marginRight: "3vh" }}
                        onClick={handleRegister}>
                        Register
                      </div>
                    </div>
                  </div>
                  <div className="doubling two column row" style={{ marginTop: "10vh" }}>
                    <div className="column">
                      <div className=" text-size-large text-color-black text-weight-medium margin-no">
                        <h3> Welcome to Login Page </h3>
                      </div>
                    </div>
                  </div>
                  <div className="doubling two column row" style={{ marginTop: "2vh" }}>
                    <div className="column">
                      <div className=" text-size-medium text-color-black text-weight-medium margin-no">
                        Email address
                      </div>
                    </div>
                  </div>

                  <div className=" doubling two column row">
                    <div className="ten wide column">
                      <div className="ui input focus" style={{ width: "100%" }}>
                        <input
                          type="email"
                          name="email"
                          onChange={updateState}
                          placeholder="Your email address..."
                        />
                      </div>
                    </div>
                  </div>
                  <div className="doubling two column row" style={{ marginTop: "2vh" }}>
                    <div className="column">
                      <div className=" text-size-medium text-color-black text-weight-medium margin-no">
                        Password
                      </div>
                    </div>
                  </div>
                  <div className=" doubling two column row">
                    <div className=" ten wide column">
                      <div className="ui input focus" style={{ width: "100%" }}>
                        <input
                          type="password"
                          name="password"
                          onChange={updateState}
                          placeholder="Enter your Password"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="doubling two column row">
                    <div className="column">
                      <div className=" text-size-medium text-color-secondary text-weight-medium margin-no padding-no">
                        <a href="www.wikipedia.com">Forgot Password? </a>
                      </div>
                    </div>
                  </div>
                  <div className="doubling two column row">
                    <div className="ten wide column">
                      <button
                        className="ui button"
                        style={{ width: "100%", marginBottom: "5vh" }}
                        onClick={handleLogin}>
                        LOGIN
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    session: state.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    triggerLogin: (props) => {
      dispatch(authenticateInitiate(props));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
