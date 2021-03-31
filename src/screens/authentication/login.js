import React, { Fragment, useState } from "react";

const Login = () => {
  return (
    <>
      <div
        className="ui raised segment align-center"
        style={{ height: "auto", margin: "8vh", background: "lightgray" }}>
        <div className="ui raised segment" style={{ margin: "5vh" }}>
          <div className="ui two column grid">
            <div className="nine wide column">
              <img src="public/assets/icons/home.png"></img>
            </div>
            <div className="seven wide column ">
              <div className="ui equal width grid margin-no">
                <div className="row">
                  <div className="column center aligned ">Login</div>
                  <div className="column center aligned ">Register</div>
                  <div className="column center aligned">Other</div>
                </div>

                <div className="row" style={{ marginTop: "10vh" }}>
                  <div className="column">
                    <div className=" text-size-large text-color-black text-weight-medium margin-no">
                      Welcome to Login Page
                    </div>
                  </div>
                </div>

                <div className="row padding-no">
                  <div
                    className="five wide column"
                    style={{ paddingRight: "0%", width: "fit-content" }}>
                    <div className=" text-size-medium text-color-black text-weight-medium margin-no padding-no">
                      Forgot Password ?
                    </div>
                  </div>

                  <div className="two wide column padding-no margin-no">
                    <div className=" text-size-medium text-color-positive text-weight-medium margin-no">
                      Click here
                    </div>
                  </div>
                </div>

                <div className="row" style={{ marginTop: "5vh", paddingBottom: 0 }}>
                  <div className="column">
                    <div className=" text-size-medium text-color-black text-weight-medium margin-no">
                      Email address
                    </div>
                  </div>
                </div>

                <div className="row ">
                  <div className="twelve wide column ">
                    <div className="ui input focus" style={{ width: "100%" }}>
                      <input type="text" placeholder="Your email address..." />
                    </div>
                  </div>
                </div>

                <div className="row " style={{ paddingBottom: 0 }}>
                  <div className="twelve wide column ">
                    <button className="ui button" style={{ width: "100%" }}>
                      LOGIN
                    </button>
                  </div>
                </div>

                <div className="row">
                  <div className="four wide column ">
                    <div className="ui divider"></div>
                  </div>
                  <div className="four wide column center aligned middle aligned ">
                    <div className=" text-size-small text-color-gray text-weight-medium margin-no">
                      Or Sign in with
                    </div>
                  </div>
                  <div className="four wide column ">
                    <div className="ui divider"></div>
                  </div>
                </div>

                <div className="row ">
                  <div className="twelve wide column ">
                    <button className="ui active button" style={{ width: "100%" }}>
                      <i className="google icon"></i>
                      Google
                    </button>
                  </div>
                </div>

                <div className="row " style={{ marginTop: "15vh" }}>
                  <div className="one wide column ">
                    <i className="facebook icon"></i>
                  </div>

                  <div className="one wide column ">
                    <i className="instagram icon"></i>
                  </div>

                  <div className="one wide column ">
                    <i className="linkedin icon"></i>
                  </div>

                  <div className="one wide column ">
                    <i className="twitter icon"></i>
                  </div>

                  <div className="one wide column ">
                    <i className="youtube icon"></i>
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

export default Login;
