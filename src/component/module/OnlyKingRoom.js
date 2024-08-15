import React from "react";
import "../css/particularroom.css";
export default function OnlyKingRoom() {
  return (
    <div>
      <section style={{ backgroundColor: "#eee" }}>
        <h2 className="pt-4">
          {" "}
          <img src="./images/roomtype.png" alt="" />
          King Rooms <img src="./images/roomtype.png" alt="" />
        </h2>
        <div className="container py-5">
          <div className="row justify-content-center" id="kingroom1">
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
                          src="./images/king2.jpeg"
                          alt=""
                          className="w-100"
                          id="kingroomimg1"
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
          <div className="row justify-content-center mb-3" id="kingroom2">
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
                          src="./images/king3.jpg"
                          alt=""
                          className="w-100"
                          id="allroomimg2"
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
