import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import AdminPanel from "./AdminPanel";
import jsPDF from "jspdf";
export default function Booked() {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchBookings();
    fetchRooms();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch(
        "https://guest-mangement-backend.onrender.com/app/all-bookings"
      );
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else {
        throw new Error("Failed to fetch bookings");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await fetch(
        "https://guest-mangement-backend.onrender.com/app/get-allrooms"
      );
      if (response.ok) {
        const data = await response.json();
        setRooms(data);
      } else {
        throw new Error("Failed to fetch rooms");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id, roomid, roomNumbers) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `https://guest-mangement-backend.onrender.com/app/delete-booking/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== id)
        );

        // Find the room associated with the deleted booking
        const roomToUpdate = rooms.find((room) => room._id === roomid);
        if (roomToUpdate) {
          // Update room status
          const updatedStatus = roomToUpdate.status + roomNumbers;

          // Update room status in the backend
          await fetch(
            `https://guest-mangement-backend.onrender.com/app/update-room-status/${roomid}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ status: updatedStatus }),
            }
          );

          // Update room status in the frontend
          setRooms((prevRooms) =>
            prevRooms.map((room) =>
              room._id === roomid ? { ...room, status: updatedStatus } : room
            )
          );

          console.log("Room status updated successfully");
        }
      } else {
        throw new Error("Failed to delete booking");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleInvoice = (booking) => {
    const doc = new jsPDF();

    // Add header
    doc.setFontSize(22);
    doc.text("Swostitech Solution", 105, 15, null, null, "center");
    // Add invoice details
    doc.setFontSize(12);
    doc.text("Invoice", 100, 30);
    doc.line(10, 32, 200, 32); // Horizontal line under "Invoice"

    // Customer details
    doc.text(`Name: ${booking.name}`, 10, 45);
    doc.text(`Aadhar: ${booking.aadhar}`, 10, 55);
    doc.text(`Address: ${booking.address}`, 10, 65);
    doc.text(`Email: ${booking.email}`, 10, 75);
    doc.text(`Mobile: ${booking.mobile}`, 10, 85);

    // Booking details
    doc.text(`Category: ${booking.category}`, 120, 45);
    doc.text(`Number of Rooms: ${booking.roomNumbers}`, 120, 55);
    doc.text(
      `Check-In: ${new Date(booking.checkinDate).toLocaleDateString()}`,
      120,
      65
    );
    doc.text(
      `Check-Out: ${new Date(booking.checkoutDate).toLocaleDateString()}`,
      120,
      75
    );

    // Summary section

    doc.line(10, 102, 200, 102); // Horizontal line under "Summary"
    doc.text("Subtotal:", 120, 115);
    doc.text("GST Tax:", 120, 125);
    doc.text(`Total: ${booking.price} INR`, 120, 135);

    // Footer
    doc.setFontSize(10);
    doc.text("Thank you for choosing our hotel!", 10, 280);

    // Save the PDF as a blob and download it
    doc.save("invoice.pdf");
  };

  return (
    <>
      <div className="container-fluid">
        <Navbar />
        <div className="container-fluid mt-3 p-0">
          <div className="row">
            <div className="col-md-3">
              <AdminPanel />
            </div>
            <div className="col-md-9">
              <h2>All Bookings</h2>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Name</th>
                      <th>Aadhar</th>
                      <th>Address</th>
                      <th>Date of Birth</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Number of Rooms</th>
                      <th>Check-In</th>
                      <th>Check-Out</th>
                      <th colSpan={2}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking, index) => (
                      <tr key={index}>
                        <td>{booking.category}</td>
                        <td>{booking.price}</td>
                        <td>{booking.name}</td>
                        <td>{booking.aadhar}</td>
                        <td>{booking.address}</td>
                        <td>{new Date(booking.dob).toLocaleDateString()}</td>
                        <td>{booking.email}</td>
                        <td>{booking.mobile}</td>
                        <td>{booking.roomNumbers}</td>
                        <td>
                          {new Date(booking.checkinDate).toLocaleDateString()}
                        </td>
                        <td>
                          {new Date(booking.checkoutDate).toLocaleDateString()}
                        </td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleInvoice(booking)}
                          >
                            Invoice
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() =>
                              handleDelete(
                                booking._id,
                                booking.roomid,
                                booking.roomNumbers
                              )
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
