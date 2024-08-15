import React from "react";
import AdminPanel from "../module/Admin/AdminPanel";
import Navbar from "../module/Navbar";
import Footer from "../module/Footer";

export default function AdminPage() {
  return (
    <>
      <div className="container-fluid">
        <Navbar />
        <div className="container-fluid mt-3  p-0">
          <div className="row">
            <div className="col-md-3">
              <AdminPanel />
            </div>
            <div className="col-md-9"></div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
