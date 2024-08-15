import React from "react";
import "../css/particularroom.css";
export default function OnlyDoubleRoom() {
  return (
    <div>
      <section style={{ backgroundColor: "#eee" }}>
        <h2 className="pt-4">
          {" "}
          <img src="./images/roomtype.png" alt="" />
          Double Rooms <img src="./images/roomtype.png" alt="" />
        </h2>
        <div className="container py-5">
          <div className="row justify-content-center mb-3" id="doubleroom1">
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
                          src="./images/double2.jpeg"
                          alt=""
                          className="w-100"
                          id="doubleroomimg1"
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
                        <button className="btn btn-dark btn-sm" type="button">
                          BOOK NOW
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center mb-3" id="doubleroom2">
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
                          src="./images/double3.jpeg"
                          alt=""
                          className="w-100"
                          id="doubleroomimg2"
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
                        <button className="btn btn-dark btn-sm" type="button">
                          BOOK NOW
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center mb-3" id="doubleroom3">
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
                          src="./images/double4.jpg"
                          alt=""
                          className="w-100"
                          id="doubleroomimg3"
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
                        <button className="btn btn-dark btn-sm" type="button">
                          BOOK NOW
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
