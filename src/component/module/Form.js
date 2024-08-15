import React from 'react'
import "../css/registrationform.css";

export default function Form() {
  return (
    <div>
       <section className="container-fluid" id="form" style={{backgroundImage:"url(./images/king2.jpeg)"}}>
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
              <div
                className="card shadow-2-strong card-registration"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">
                    Registration Form
                  </h3>
                  <form>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div data-mdb-input-init className="form-outline">
                          <input
                            type="text"
                            id="firstName"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label" htmlFor="firstName">
                            First Name
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div data-mdb-input-init className="form-outline">
                          <input
                            type="text"
                            id="lastName"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label" htmlFor="lastName">
                            Last Name
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4 d-flex align-items-center">
                        <div
                          data-mdb-input-init
                          className="form-outline datepicker w-100"
                        >
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="birthdayDate"
                          />
                          <label htmlFor="birthdayDate" className="form-label">
                            DOB
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <h6 className="mb-2 pb-1">Gender: </h6>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="femaleGender"
                            value="option1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="femaleGender"
                          >
                            Female
                          </label>
                        </div>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="maleGender"
                            value="option2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="maleGender"
                          >
                            Male
                          </label>
                        </div>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="otherGender"
                            value="option3"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="otherGender"
                          >
                            Other
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4 pb-2">
                        <div data-mdb-input-init className="form-outline">
                          <input
                            type="email"
                            id="emailAddress"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label" htmlFor="emailAddress">
                            Email
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 pb-2">
                        <div data-mdb-input-init className="form-outline">
                          <input
                            type="tel"
                            id="phoneNumber"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label" htmlFor="phoneNumber">
                            Phone Number
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 pb-2">
                        <div data-mdb-input-init className="form-outline">
                          <input
                            type="number"
                            id="aadharnumber"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label" htmlFor="aadharnumber">
                            Aadhar Number
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 pb-2">
                      <input
                            type="text"
                            id="address"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label" htmlFor="address">
                        Address
                          </label>
                      </div>
                      <div className="col-md-6 mb-4 pb-2">
                      <input
                            type="text"
                            id="roomtype"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label" htmlFor="roomtype">
                            Room Type
                          </label>
                      </div>
                      <div className="col-md-6 mb-4 pb-2">
                      <input
                            type="text"
                            id="roomprice"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label" htmlFor="price">
                            Price
                          </label>
                      </div>
                    </div>
                    <div className="mt-4 pt-2">
                    <button className="btn btn-dark">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
