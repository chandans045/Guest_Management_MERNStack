import React from "react";
import { Link } from "react-router-dom";
export default function Poster() {
  return (
    <div>
      <div
        className="container-fluid mb-5"
        style={{
          backgroundImage: "url(./images/posterbgimg.jpg)",
          height: "100%",
          width: "100%",
        }}
      >
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3 justify-content-center">
          <div className="col-md-3 text-center" style={{ marginTop: "15%" }}>
            <div
              className="wow animate__animated animate__slideInLeft"
              style={{
                animationDuration: "2s",
                marginBottom: " 26%",
                filter: "drop-shadow(0 50px 20px #0009)",
              }}
            >
              <h3 className="fw-bold">MOST WLCOME TO OUR HOTEL</h3>
              <h5>I wish you have a good day</h5>
              <button type="button" className="btn btn-sm bg-dark">
                <Link to="/AllProduct" className="text-decoration-none text-light">
                  Book Now
                </Link>
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <img
              src="./images/posterimg.png"
              id="posterimg"
              alt=""
              className="wow animate__animated animate__slideInRight"
              style={{
                animationDuration: "2s",
                width: "100%",
                height: " auto",
                filter: "drop-shadow(0 50px 20px #0009)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
