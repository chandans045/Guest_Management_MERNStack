import React from "react";
import { Link } from "react-router-dom";
import "../css/product.css";
export default function ProductSec() {
  return (
    <div>
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row justify-content-center mb-3" id="roomsec1">
            <div
              className="col-md-12 col-xl-10  wow animate__animated animate__backInUp"
              style={{ animationDuration: "2s" }}
            >
              <div className="card shadow-0 border rounded-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                      <div className="bg-image hover-zoom ripple rounded ripple-surface overflow-hidden ">
                        <img
                          src="./images/single.jpeg"
                          alt=""
                          className="w-100"
                          id="roomsecimg1"
                        />

                        <div className="hover-overlay">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(253, 253, 253, 0.15)",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6 col-xl-6">
                      <h5>Description</h5>
                      <p>
                        A single room has one single bed for single occupancy.
                        An additional bed (called an extra bed) may be added to
                        this room at the request of a guest and charged
                        accordingly.
                      </p>
                    </div>
                    <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                      <div className="">
                        <h5>Single Room</h5>
                        <h3 className="">Rs:10.00</h3>
                      </div>
                      <h6 className="text-success">Available</h6>
                      <div className="d-flex flex-column mt-4">
                        <Link to="/RegistrationForm">
                          <button
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-dark btn-sm"
                            type="button"
                          >
                            BOOK NOW
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center mb-3" id="roomsec2">
            <div
              className="col-md-12 col-xl-10  wow animate__animated animate__backInUp"
              style={{ animationDuration: "2s" }}
            >
              <div className="card shadow-0 border rounded-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                      <div className="bg-image hover-zoom ripple rounded ripple-surface overflow-hidden ">
                        <img
                          src="./images/double.jpg"
                          alt=""
                          className="w-100"
                          id="roomsecimg2"
                        />

                        <div className="hover-overlay">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(253, 253, 253, 0.15)",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6 col-xl-6">
                      <h5>Description</h5>
                      <p>
                        A double room has one double bed for double occupancy.
                        An extra bed may be added to this room at the request of
                        a guest and charged accordingly. The size of the double
                        bed is generally 4.5 feet by 6 feet.
                      </p>
                    </div>
                    <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                      <div className="">
                        <h5>Double Room</h5>
                        <h3 className="">Rs:10.00</h3>
                      </div>
                      <h6 className="text-success">Available</h6>
                      <div className="d-flex flex-column mt-4">
                        <Link to="/RegistrationForm">
                          <button
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-dark btn-sm"
                            type="button"
                          >
                            BOOK NOW
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center" id="roomsec3">
            <div
              className="col-md-12 col-xl-10  wow animate__animated animate__backInUp"
              style={{ animationDuration: "2s" }}
            >
              <div className="card shadow-0 border rounded-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                      <div className="bg-image hover-zoom ripple rounded ripple-surface overflow-hidden ">
                        <img
                          src="./images/king.jpeg"
                          alt=""
                          className="w-100"
                          id="roomsecimg3"
                        />

                        <div className="hover-overlay">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(253, 253, 253, 0.15)",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6 col-xl-6">
                      <h5>Description</h5>
                      <p>
                        A king room has a king-size bed. The size of the bed is
                        6 feet by 6 feet. An extra bed may be added to this room
                        at the request of a guest and charged accordingly.
                      </p>
                    </div>
                    <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                      <div className="">
                        <h5>King Room</h5>
                        <h3 className="">Rs:10.00</h3>
                      </div>
                      <h6 className="text-success">Available</h6>
                      <div className="d-flex flex-column mt-4">
                        <Link to="/RegistrationForm">
                          <button
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-dark btn-sm"
                            type="button"
                          >
                            BOOK NOW
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid mt-5">
            <Link to="/AllProduct">
              <button
                className="btn btn-dark text-light wow animate__animated animate__backInUp "
                style={{ animationDuration: "2s" }}
              >
                View All
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
