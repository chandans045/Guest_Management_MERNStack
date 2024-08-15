import React, { useState } from "react";
import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Password validation regex (at least 6 characters)
    const passwordRegex = /(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;

    // Validation logic
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!passwordRegex.test(password)) {
      alert(
        "Password must contain at least 8 characters, one uppercase letter, one number, and one special character"
      );
      return;
    }

    try {
      // Fetch email and password data from database
      // Fetch email and password data from database
      const response = await fetch(
        "https://guest-mangement-backend.onrender.com/app/receive"
      );

      if (response.ok) {
        const users = await response.json();
        const user = users.find(
          (user) => user.email === email && user.password === password
        );
        if (user) {
          // Redirect to Home.js if email and password match
          navigate("/Home");
        } else {
          // Show alert if email and password don't match
          alert("Invalid email or password. Please sign up first.");
        }
      } else {
        alert("Failed to fetch data from the server.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const game = e.target.elements.game.value;
    const newPassword = e.target.elements.newpassword.value;
    const retypeNewPassword = e.target.elements.retypenewpassword.value;
    const passwordRegex = /(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (game === "") {
      alert("enter game name");
      return;
    }
    if (!passwordRegex.test(newPassword)) {
      alert(
        "Password must contain at least 8 characters, one uppercase letter, one number, and one special character"
      );
      return;
    }
    // Check if the new password and re-typed new password match
    if (newPassword !== retypeNewPassword) {
      alert("New password and re-typed new password must match.");
      return;
    }

    try {
      // Fetch user data based on email and game ID
      const response = await fetch(
        `https://guest-mangement-backend.onrender.com/app/receive`
      );
      if (response.ok) {
        const userData = await response.json();
        const user = userData.find(
          (user) => user.email === email && user.game === game
        );
        if (user) {
          // User exists with the entered email and game
          alert("Email and game match found!");
          // Call the API to update the password
          const updateResponse = await fetch(
            `https://guest-mangement-backend.onrender.com/app/updatesingle/${email}/${game}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ password: newPassword }),
            }
          );
          if (updateResponse.ok) {
            alert("Password updated successfully!");
            closemodal1();
          } else {
            alert("Failed to update password.");
          }
        } else {
          // No user found with the entered email and game
          alert("Email and game match not found.");
        }
      } else {
        alert("Failed to fetch data from the server.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  const closemodal1 = () => {
    let a = document.getElementById("closebtn1");
    a.click();
  };

  return (
    <div>
      <div
        className="container-fluid px-4 py-5 px-md-5 text-center text-lg-start"
        id="loginimg"
        style={{ backgroundImage: "url(./images/login.jpeg)" }}
      >
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: "10" }}>
            <h1 className=" fw-bold ls-tight" style={{ color: "#00ACC1" }}>
              Welcome to our resort <br />{" "}
            </h1>
            <h3 style={{ color: "#00ACC1" }} className="heading3">
              Login and enjoy your day
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
                <form onSubmit={handleSubmit}>
                  <div className="container-fluid align-item-center d-flex justify-content-start p-0">
                    <h4 style={{ color: "#00ACC1" }}>EMPLOYEE LOGIN</h4>
                  </div>

                  {/* email input */}
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form3Example3">
                      Email address
                    </label>
                  </div>
                  {/* password input */}
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form3Example4">
                      Password
                    </label>
                  </div>

                  {/* Submit button */}
                  <div className="justify-content-center">
                    <button
                      type="submit"
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-block mb-4"
                      id="loginbtn"
                    >
                      Login
                    </button>
                  </div>
                  <Link
                    style={{ textDecoration: "none", color: "#00ACC1" }}
                    to="/"
                    data-bs-toggle="modal"
                    data-bs-target="#loginmodal"
                  >
                    <p>Forgot password</p>
                  </Link>
                  <p>
                    Are you already
                    <Link
                      style={{ textDecoration: "none", color: "#00ACC1" }}
                      to="/SignUp"
                    >
                      {" "}
                      Register
                    </Link>{" "}
                    ??
                  </p>
                  <p>
                    Guest{" "}
                    <Link
                      style={{ textDecoration: "none", color: "#00ACC1" }}
                      to="/GuestLogin"
                    >
                      {" "}
                      Login
                    </Link>{" "}
                    Here.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade "
        id="loginmodal"
        tabIndex="-1"
        aria-labelledby="loginmodalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="row d-flex ">
              <div className="col-6 d-flex justify-content-start ">
                <h5 id="exampleModalLabel" className="ms-4 mt-2">
                  Reset
                </h5>
              </div>
              <div className="col-6 justify-content-end d-flex">
                <button
                  type="button"
                  className="btn-close me-4 mt-2"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  id="closebtn"
                ></button>
              </div>
            </div>
            <form onSubmit={handleModalSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email address"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="game"
                    name="game"
                    placeholder="Favorite game"
                  />
                </div>{" "}
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="newpassword"
                    name="newpassword"
                    placeholder="Enter new password"
                  />
                </div>{" "}
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="retypenewpassword"
                    name="retypenewpassword"
                    placeholder="Re-type new password"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn" id="loginmodal1btn">
                  Submit
                </button>
                <button
                  type="button"
                  id="closebtn1"
                  className="btn"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
