import React, { useState } from "react";
import { NavLink } from "react-router-dom";
export default function Navbar() {
  const closeOffcanvas = () => {
    document.getElementById("closebutton").click();
  };
  const [view, setView] = useState(true);
  const openNavbar = () => {
    let value = localStorage.getItem("role");
    if (value === "1") {
      setView(false);
    } else {
      setView(true);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("role");
      window.location.href = "/";
    }
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg  text-light shadow "
        style={{ backgroundColor: "#1c2331" }}
      >
        <div className="container-fluid">
          <button
            className="btn btn-light "
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-expanded="false"
            aria-controls="offcanvasExample"
            onClick={openNavbar}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <div>
            <div className="d-flex">
              <div id="logoutim"></div>
              <div className="d-flex ">
                <NavLink
                  to="/Home"
                  className="nav-item nav-link text-light me-5"
                >
                  Home
                </NavLink>

                <NavLink
                  to="/AllProduct"
                  className=" me-5 nav-item nav-link text-light"
                >
                  Booking
                </NavLink>

                {view && (
                  <NavLink
                    to="/AdminPage"
                    className="nav-item nav-link me-5 text-light"
                  >
                    Admin Panel
                  </NavLink>
                )}
                {view && (
                  <NavLink
                    to="/CustomerHistory"
                    className="nav-item nav-link me-5 text-light"
                  >
                    Customer History
                  </NavLink>
                )}
                <NavLink
                  to=""
                  className=" text-light text-decoration-none me-3"
                  onClick={handleLogout}
                >
                  <i className="fa-solid fa-right-from-bracket me-1"></i>
                  Logout
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-start text-light position-absolute"
        style={{ width: "18%", backgroundColor: "#1c2331" }}
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div
          id="closebtn"
          className="d-flex justify-content-end align-item-end me-2 mt-2"
        >
          <button
            type="button"
            className="btn-close text-reset bg-light"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            id="closebutton"
          ></button>
        </div>
        <div
          id="homebtn"
          className="d-flex justify-content-start align-item-start ms-2 mt-3"
        >
          <NavLink
            to="/Home"
            className="nav-item nav-link text-light"
            onClick={closeOffcanvas}
          >
            Home
          </NavLink>
        </div>
        <div className="d-flex justify-content-start align-item-start ms-2 mt-3">
          <NavLink
            to="/AllProduct"
            className="nav-item nav-link text-light"
            onClick={closeOffcanvas}
          >
            Booking
          </NavLink>
        </div>
        <div className="d-flex justify-content-start align-item-start ms-2 mt-3">
          <NavLink
            to="/SingleRoom"
            className="nav-item nav-link text-lightme-2"
            onClick={closeOffcanvas}
          >
            Single Rooms
          </NavLink>
        </div>
        <div className="d-flex justify-content-start align-item-start ms-2 mt-3">
          <NavLink
            to="/DoubleRoom"
            className="nav-item nav-link text-lightme-2"
            onClick={closeOffcanvas}
          >
            Double Rooms
          </NavLink>
        </div>
        <div className="d-flex justify-content-start align-item-start ms-2 mt-3">
          <NavLink
            to="/KingRoom"
            className="nav-item nav-link text-lightme-2"
            onClick={closeOffcanvas}
          >
            King Rooms
          </NavLink>
        </div>
        <div className="d-flex justify-content-start align-item-start ms-2 mt-3">
          <NavLink
            to="/QueenRoom"
            className="nav-item nav-link text-lightme-2"
            onClick={closeOffcanvas}
          >
            Queen Rooms
          </NavLink>
        </div>
        {view && (
          <div className="d-flex justify-content-start align-item-start ms-2 mt-3">
            <NavLink
              to="/AdminPage"
              className="nav-item nav-link text-light"
              onClick={closeOffcanvas}
            >
              Admin Panel
            </NavLink>
          </div>
        )}
        {view && (
          <div className="d-flex justify-content-start align-item-start ms-2 mt-3">
            <NavLink
              to="/CustomerHistory"
              className="nav-item nav-link text-light"
              onClick={closeOffcanvas}
            >
              Customer History
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
