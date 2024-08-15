import React, { useState } from "react";
import "../css/SignUp.css";
import { Link, useNavigate } from "react-router-dom";
export default function GuestSignUp() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobileNumber: "",
    game: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.firstname.trim() === "") {
      alert("First Name is required");
      return;
    }

    if (formData.lastname.trim() === "") {
      alert("Last Name is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Email is invalid");
      return;
    }

    if (
      !/(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(formData.password)
    ) {
      alert(
        "Password must contain at least 8 characters, one uppercase letter, one number, and one special character"
      );
      return;
    }
    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      alert("Please enter a valid mobile number.");
      return;
    }

    if (formData.game.trim() === "") {
      alert("game Name is required");
      return;
    }

    try {
      const response = await fetch(
        "https://guest-mangement-backend.onrender.com/app/guest-send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("signup successfully");
        alert("signup successfull");
        localStorage.setItem("role", 1);
        navigate("/Home");
        // Optionally, you can reset the form after successful submission
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          mobileNumber: "",
          game: "",
        });
      } else {
        console.error("Failed to signup");
      }
    } catch (error) {
      console.error("Error signup:", error);
    }
  };

  return (
    <div>
      <div
        className="container-fluid px-4 py-5 px-md-5 text-center text-lg-start"
        id="signupimg"
        style={{ backgroundImage: "url(./images/signup.jpeg)" }}
      >
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: "10" }}>
            <h1 className=" fw-bold ls-tight" style={{ color: "#4682b4" }}>
              Are you ready for fun <br />{" "}
            </h1>
            <h3 style={{ color: "#4682b4" }} className="heading3">
              SignUp first then enjoy your day
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
                  {/* Your existing form content */}
                  {/* Name inputs */}
                  <div className="row">
                    <div className="container align-item-center d-flex  justify-content-start">
                      <h4 style={{ color: "#4682b4" }}>GUEST SIGNUP</h4>
                    </div>
                    <div className="col-md-6 justify-content-start mb-4">
                      <div data-mdb-input-init className="form-outline">
                        <label className="d-block">First Name:</label>
                        <input
                          type="text"
                          name="firstname"
                          className="form-control"
                          value={formData.firstname}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 justify-content-end mb-4">
                      <div data-mdb-input-init className="form-outline">
                        <label className="d-block">Last Name:</label>
                        <input
                          type="text"
                          name="lastname"
                          className="form-control"
                          value={formData.lastname}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email input */}
                  <div className="form-outline mb-4">
                    <label className="d-block">Email:</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Password input */}
                  <div className="form-outline mb-4">
                    <label className="d-block">Password:</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Mobile Number input */}
                  <div className="form-outline mb-4">
                    <label className="d-block">Mobile Number:</label>
                    <input
                      type="text"
                      name="mobileNumber"
                      className="form-control"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Alternative Mobile Number input */}
                  <div className="form-outline mb-4">
                    <label className="d-block">
                      What is your favorite game?
                    </label>
                    <input
                      type="text"
                      name="game"
                      className="form-control"
                      value={formData.game}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Submit button */}
                  <div className="justify-content-center">
                    <button
                      id="signupbtn"
                      type="submit"
                      className="btn btn-block mb-4"
                      onClick={handleSubmit}
                    >
                      SignUp
                    </button>
                    <p>
                      If you already signed up,{" "}
                      <Link
                        style={{ textDecoration: "none", color: "#4682b4" }}
                        to="/GuestLogin"
                      >
                        Login here
                      </Link>
                    </p>
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
