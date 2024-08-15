import React from "react";
import "../css/Room.css";
import { Link } from "react-router-dom";
export default function Rooms() {
  return (
    <div>
      <div
        className="container-fluid mt-5 mb-3 d-flex justify-content-center"
        id="roomtype"
      >
        <h2>
          {" "}
          <img src="./images/roomtype.png" alt="" />
          ROOM TYPES
          <img src="./images/roomtype.png" alt="" />
        </h2>
      </div>

      <div className="container-fluid mt-2 mb-5">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 justify-content-center">
          <div className="col-md-3 wow animate__animated animate__backInUp" style={{animationDuration:"2s"}}>
            {" "}
            <Link to="/SingleRoom">
              <div
                className="card shadow-sm "
                style={{ borderRadius: " 4%" }}
                id="singleimg"
              >
                <img
                  src="./images/single.jpeg"
                  alt="sorry"
                  style={{ borderRadius: " 4%" }}
                />

                <p
                  className="card-text  position-absolute text-light fw-bold"
                  style={{ top: "85%", fontSize: "20px" }}
                >
                  S I N G L E
                </p>
              </div>
            </Link>
          </div>
          <div className="col-md-3 wow animate__animated animate__backInDown" style={{animationDuration:"2s"}}>
            <Link to="/DoubleRoom">
              <div
                className="card shadow-sm "
                style={{ borderRadius: " 4%" }}
                id="doubleimg"
              >
                <img
                  src="./images/double.jpg"
                  alt="sorry"
                  style={{ borderRadius: " 4%" }}
                />
                <p
                  className="card-text  position-absolute text-light fw-bold"
                  style={{ top: "85%", fontSize: "20px" }}
                >
                  D O U B L E
                </p>
              </div>
            </Link>
          </div>
          <div className="col-md-3 wow animate__animated animate__backInUp" style={{animationDuration:"2s"}}>
            <Link to="/KingRoom">
              <div
                className="card shadow-sm "
                style={{ borderRadius: " 4%" }}
                id="kingimg"
              >
                <img
                  src="./images/king.jpeg"
                  alt="sorry"
                  style={{ borderRadius: " 4%" }}
                />
                <p
                  className="card-text  position-absolute text-light fw-bold"
                  style={{ top: "85%", fontSize: "20px" }}
                >
                  K I N G
                </p>
              </div>
            </Link>
          </div>
          <div className="col-md-3 wow animate__animated animate__backInDown" style={{animationDuration:"2s"}}>
            <Link to="/QueenRoom">
              <div
                className="card shadow-sm "
                style={{ borderRadius: " 4%" }}
                id="queenimg"
              >
                <img
                  src="./images/queen.jpeg"
                  alt="sorry"
                  style={{ borderRadius: " 4%" }}
                />
                <p
                  className="card-text  position-absolute text-light fw-bold"
                  style={{ top: "85%", fontSize: "20px" }}
                >
                  Q U E E N
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
