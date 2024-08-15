import React from "react";
import video from "../video/hotel.mp4";
import { Link } from "react-router-dom";
export default function Carousel() {
  return (
    <div>
      <div
        className="container-fluid"
        id="videodiv"
        style={{ height: "90vh", width: "100%" }}
      >
        <div
          className="overlay"
          style={{
            position: "absolute",
            top: "auto",
            width: "100%",
            height: "90vh",
            backgroundColor: "rgba(0,0,0,.4)",
          }}
        ></div>
        <div
          className="d-flex justify-content-center align-items-center text-light wow animate__animated animate__backInUp"
          style={{
            animationDuration:"2s",
            width: "100%",
            height: "90vh",
            position: "absolute",
            flexDirection: "column",
            zIndex:"6"
          }}
        >
          <h1 className="text-light ">MOST WELCOME TO OUR HOTEL</h1>
          <h3 className="text-light">
            Checkout the booking section for best rooms
          </h3>
          <Link to="/AllProduct" className="pe-auto">
            <button className="btn btn-light text-dark">BOOKING HERE</button>
          </Link>
        </div>
        <video
          src={video}
          autoPlay
          loop
          muted
          style={{ height: "90vh", width: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
}
