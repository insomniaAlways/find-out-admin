import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { authenticateInitiate } from "../../store/actions/session.action";

const Login = (props) => {
  debugger;
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
      <div
        className="ui raised segment align-center"
        style={{ height: "auto", margin: "10vh", background: "lightgray" }}>
        <div className="ui raised segment" style={{ margin: "5vh" }}>
          <div className="ui two column grid">
            <div className="nine wide column">
              <img src="public/assets/icons/home.png" alt=""></img>
            </div>
            <div className="seven wide column ">
              <div className="ui equal width grid margin-no">
                <div className="row">
                  <div className="column center aligned ">
                    <a>Login</a>
                  </div>
                  <div className="column center aligned ">
                    <a onClick={handleRegister}>Register</a>
                  </div>
                </div>

                <div className="row" style={{ marginTop: "10vh" }}>
                  <div className="column">
                    <div className=" text-size-large text-color-black text-weight-medium margin-no">
                      <h3> Welcome to Login Page </h3>
                    </div>
                  </div>
                </div>

                <div className="row" style={{ marginTop: "2vh", paddingBottom: 0 }}>
                  <div className="column">
                    <div className=" text-size-medium text-color-black text-weight-medium margin-no">
                      Email address
                    </div>
                  </div>
                </div>

                <div className="row ">
                  <div className="twelve wide column ">
                    <div className="ui input focus" style={{ width: "100%" }}>
                      <input
                        type="text"
                        name="email"
                        onChange={updateState}
                        placeholder="Your email address..."
                      />
                    </div>
                  </div>
                </div>

                <div className="row" style={{ marginTop: "1vh", paddingBottom: 0 }}>
                  <div className="column">
                    <div className=" text-size-medium text-color-black text-weight-medium margin-no">
                      Password
                    </div>
                  </div>
                </div>

                <div className="row ">
                  <div className="twelve wide column ">
                    <div className="ui input focus" style={{ width: "100%" }}>
                      <input
                        type="text"
                        name="password"
                        onChange={updateState}
                        placeholder="Enter your Password"
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="five wide column"
                  style={{ paddingRight: "0%", width: "fit-content" }}>
                  <div className=" text-size-medium text-color-secondary text-weight-medium margin-no padding-no">
                    <a href="www.wikipedia.com">Forgot Password ? </a>
                  </div>
                </div>
                <div className="row " style={{ paddingBottom: 0 }}>
                  <div className="twelve wide column ">
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
    </>
  );
};

const mapStateToProps = (state) => {
  debugger;
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
