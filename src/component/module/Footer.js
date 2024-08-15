import React from "react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div>
      <div className="container-fluid p-0" style={{ marginTop: "53vh" }}>
        <footer
          className="text-center text-lg-start text-white"
          style={{ backgroundColor: "#1c2331" }}
        >
          <div
            className="text-center p-3 d-flex justify-content-center align-items-center"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              animationDuration: "2s",
            }}
          >
            <p
              className="wow animate__animated animate__backInUp "
              style={{ animationDuration: "2s" }}
            >
              © 2024 Copyright:
            </p>
            <Link className="text-white text-decoration-none " to="/">
              <p
                className="wow animate__animated animate__backInUp "
                style={{ animationDuration: "2s" }}
              >
                {" "}
                Swostitechnologies.com
              </p>
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
