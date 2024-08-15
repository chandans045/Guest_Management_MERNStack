import React from "react";
import "../css/Login.css";
import { Link } from "react-router-dom";
export default function AdminLogin() {
  return (
    <div>
      <div
        className="container-fluid px-4 py-5 px-md-5 text-center text-lg-start vh-100 "
        id="loginimg"
        style={{ backgroundImage: "url(./images/login.jpeg)" }}
      >
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: "10" }}>
            <h1 className=" fw-bold ls-tight" style={{ color: "#00ACC1" }}>
            Admin can login here only <br />{" "}
            </h1>
            <h3 style={{ color: "#00ACC1" }} className="heading3">
            Enter valid email password and login
            </h3>
          </div>

          <div
            className="col-lg-6 mb-5 mb-lg-0 position-relative"
            id="inputdiv"
          >
            <div
              id="radius-shape-1"
              className="position-absolute rounded-circle shadow-5-strong"
            ></div>
            <div
              id="radius-shape-2"
              className="position-absolute shadow-5-strong"
            ></div>

            <div className="card bg-glass mt-4">
              <div className="card-body px-4 py-5 px-md-5">
                <form>
                  <div className="container align-item-center d-flex justify-content-between">
                    <Link to="/" className="text-decoration-none"><h4 style={{ color: "#6c757d" }}>USER LOGIN</h4></Link>
                    <h4 style={{ color: "#00ACC1" }}>ADMIN LOGIN</h4>
                  </div>

                  {/* email input */}
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="form3Example3">
                      Email address
                    </label>
                  </div>
                  {/* //password input */}
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="form3Example4">
                      Password
                    </label>
                  </div>

                  {/* //Submit button */}
                  <div className="justify-content-center">
                    <button
                      type="submit"
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-block mb-4"
                      id="loginbtn"
                    >
                      <Link
                        to="/AdminPage"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Login
                      </Link>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
